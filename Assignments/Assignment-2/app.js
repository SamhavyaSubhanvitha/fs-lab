const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017"; 
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log(" Connected to MongoDB successfully.\n");

    const db = client.db("collegeDB");
    const students = db.collection("students");

    await students.deleteMany({});

    // 1. Insert documents
    console.log("--- 1. Inserting Student Records ---");
    const sampleStudents = [
      { rollNo: "23CM001", name: "Ravi Kumar", branch: "CSE-AIML", year: 3, marks: 85, email: "ravi@example.com" },
      { rollNo: "23CM002", name: "Sneha Reddy", branch: "CSE", year: 2, marks: 92, email: "sneha@example.com" },
      { rollNo: "23CM003", name: "Arjun Verma", branch: "ECE", year: 3, marks: 74, email: "arjun@example.com" },
      { rollNo: "23CM004", name: "Pooja Sharma", branch: "CSE-AIML", year: 4, marks: 45, email: "pooja@example.com" },
      { rollNo: "23CM005", name: "Vikram Das", branch: "IT", year: 2, marks: 68, email: "vikram@example.com" },
      { rollNo: "23CM006", name: "Ananya Patel", branch: "CSE", year: 3, marks: 88, email: "ananya@example.com" }
    ];
    await students.insertMany(sampleStudents);
    console.log("Inserted 6 students.\n");

    // 2. Display all students
    console.log("--- 2. All Students ---");
    console.table(await students.find().toArray());

    // 3. Display students in CSE-AIML
    console.log("--- 3. Students in CSE-AIML ---");
    console.table(await students.find({ branch: "CSE-AIML" }).toArray());

    // 4. Display students with marks > 75
    console.log("--- 4. Students with Marks > 75 ---");
    console.table(await students.find({ marks: { $gt: 75 } }).toArray());

    // 5. Search by rollNo
    console.log("--- 5. Search Student by Roll No (23CM001) ---");
    console.log(await students.findOne({ rollNo: "23CM001" }));

    // 6. Search condition: Year 3 & Marks >= 70
    console.log("\n--- 6. Year 3 Students with Marks >= 70 ---");
    console.table(await students.find({ year: 3, marks: { $gte: 70 } }).toArray());

    // 7. Update marks
    console.log("\n--- 7. Update Marks of 23CM001 to 95 ---");
    await students.updateOne({ rollNo: "23CM001" }, { $set: { marks: 95 } });
    console.log(await students.findOne({ rollNo: "23CM001" }));

    // 8. Update email and branch
    console.log("\n--- 8. Update Email and Branch of 23CM003 ---");
    await students.updateOne({ rollNo: "23CM003" }, { $set: { email: "arjun.new@example.com", branch: "CSE" } });
    console.log(await students.findOne({ rollNo: "23CM003" }));

    // 9. Delete student
    console.log("\n--- 9. Delete Student 23CM005 ---");
    await students.deleteOne({ rollNo: "23CM005" });
    console.log("Deleted. Remaining count:", await students.countDocuments());

    // 10. Descending order of marks
    console.log("\n--- 10. Students Sorted by Marks (Descending) ---");
    console.table(await students.find().sort({ marks: -1 }).toArray());

    // 11. Create index
    console.log("\n--- 11. Creating Index on rollNo ---");
    const indexResult = await students.createIndex({ rollNo: 1 }, { unique: true });
    console.log("Index created:", indexResult);

    // Real-Time Extension Queries
    console.log("\n================ REAL-TIME EXTENSION ================");
    console.log("\n Students Scoring > 80:");
    console.table(await students.find({ marks: { $gt: 80 } }).toArray());

    console.log("\n Students Scoring < 50:");
    console.table(await students.find({ marks: { $lt: 50 } }).toArray());

    console.log("\n Highest-Scoring Student:");
    const topStudent = await students.find().sort({ marks: -1 }).limit(1).toArray();
    console.table(topStudent);

  } finally {
    await client.close();
    console.log("\n Connection closed.");
  }
}

run().catch(console.dir);