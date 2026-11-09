require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());

// Configure CORS for local development and deployed frontend (Vercel)
const allowedOrigins = (process.env.FRONTEND_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or Postman)
      if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes("*")) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive for academic testing across Vercel previews
    },
    credentials: true,
  })
);

// Define Student Schema
const studentSchema = new mongoose.Schema(
  {
    rollNo: {
      type: String,
      required: [true, "Roll number is required"],
      unique: true,
      trim: true,
      uppercase: true,
    },
    name: {
      type: String,
      required: [true, "Student name is required"],
      trim: true,
    },
    department: {
      type: String,
      required: [true, "Department is required"],
      trim: true,
    },
    semester: {
      type: Number,
      required: [true, "Semester is required"],
      min: [1, "Semester must be at least 1"],
      max: [8, "Semester cannot exceed 8"],
    },
    gpa: {
      type: Number,
      required: [true, "GPA is required"],
      min: [0, "GPA cannot be negative"],
      max: [10, "GPA cannot exceed 10.0"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
    },
    status: {
      type: String,
      enum: ["Active", "Graduated", "Suspended"],
      default: "Active",
    },
    feesPaid: {
      type: Number,
      required: [true, "Fees paid amount is required"],
      min: [0, "Fees paid cannot be negative"],
    },
  },
  { timestamps: true }
);

// Explicitly define Indexes
studentSchema.index({ rollNo: 1 }, { unique: true });
studentSchema.index({ department: 1 });
studentSchema.index({ status: 1 });

const Student = mongoose.model("Student", studentSchema);

// 1. Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Student Management API is running smoothly",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// 2. Read all students (with optional department/status filter)
app.get("/api/students", async (req, res) => {
  try {
    const { department, status, search } = req.query;
    const query = {};

    if (department && department !== "All") {
      query.department = department;
    }
    if (status && status !== "All") {
      query.status = status;
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { rollNo: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const students = await Student.find(query).sort({ rollNo: 1 });
    res.status(200).json(students);
  } catch (err) {
    console.error("Error retrieving students:", err);
    res.status(500).json({ message: "Unable to retrieve student records", error: err.message });
  }
});

// 3. Read single student by ID
app.get("/api/students/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student record not found" });
    }
    res.status(200).json(student);
  } catch (err) {
    res.status(400).json({ message: "Invalid student ID format", error: err.message });
  }
});

// 4. Create new student
app.post("/api/students", async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        message: `Student with Roll Number '${req.body.rollNo}' already exists.`,
      });
    }
    res.status(400).json({ message: err.message });
  }
});

// 5. Update student by ID
app.put("/api/students/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!student) {
      return res.status(404).json({ message: "Student record not found" });
    }
    res.status(200).json(student);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        message: `Duplicate key error: Roll Number '${req.body.rollNo}' is already taken.`,
      });
    }
    res.status(400).json({ message: err.message });
  }
});

// 6. Delete student by ID
app.delete("/api/students/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student record not found" });
    }
    res.status(200).json({
      message: `Student record for ${student.name} (${student.rollNo}) deleted successfully`,
    });
  } catch (err) {
    res.status(400).json({ message: "Failed to delete student", error: err.message });
  }
});

// 7. Aggregation: Department-wise summary
app.get("/api/reports/department-summary", async (req, res) => {
  try {
    const summary = await Student.aggregate([
      {
        $group: {
          _id: "$department",
          studentCount: { $sum: 1 },
          avgGPA: { $avg: "$gpa" },
          totalFeesPaid: { $sum: "$feesPaid" },
          activeStudents: {
            $sum: { $cond: [{ $eq: ["$status", "Active"] }, 1, 0] },
          },
        },
      },
      {
        $project: {
          _id: 1,
          studentCount: 1,
          avgGPA: { $round: ["$avgGPA", 2] },
          totalFeesPaid: 1,
          activeStudents: 1,
        },
      },
      { $sort: { studentCount: -1 } },
    ]);
    res.status(200).json(summary);
  } catch (err) {
    console.error("Aggregation error:", err);
    res.status(500).json({ message: "Unable to generate department summary", error: err.message });
  }
});

// 8. Overall Dashboard KPI Metrics
app.get("/api/reports/stats", async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const stats = await Student.aggregate([
      {
        $group: {
          _id: null,
          avgGPA: { $avg: "$gpa" },
          totalFees: { $sum: "$feesPaid" },
        },
      },
    ]);

    const activeCount = await Student.countDocuments({ status: "Active" });
    const departments = await Student.distinct("department");

    res.status(200).json({
      totalStudents,
      activeStudents: activeCount,
      departmentsCount: departments.length,
      averageGPA: stats[0] ? Number(stats[0].avgGPA.toFixed(2)) : 0,
      totalFeesCollected: stats[0] ? stats[0].totalFees : 0,
    });
  } catch (err) {
    res.status(500).json({ message: "Unable to calculate stats", error: err.message });
  }
});

// Start Server & Connect Database
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/student_management_db";
const DB_NAME = process.env.DB_NAME || "student_management_db";

async function startServer() {
  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: DB_NAME,
    });
    console.log(`[Database] Connected to MongoDB database: ${DB_NAME}`);
    app.listen(PORT, () => {
      console.log(`[Server] Express server running on port ${PORT}`);
      console.log(`[Server] Health check: http://localhost:${PORT}/api/health`);
    });
  } catch (err) {
    console.error("[Database] Connection failed:", err.message);
    process.exit(1);
  }
}

startServer();
