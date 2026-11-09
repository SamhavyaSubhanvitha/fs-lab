import { useEffect, useState } from "react";
import "./style.css";

const API = (import.meta.env.VITE_API_URL || "http://localhost:5000")
  .replace(/\/$/, "") + "/api";

const initialForm = {
  rollNo: "",
  name: "",
  department: "Computer Science",
  semester: 4,
  gpa: 8.5,
  email: "",
  status: "Active",
  feesPaid: 50000,
};

const DEPARTMENTS = [
  "Computer Science",
  "Information Technology",
  "Electronics & Communication",
  "Mechanical Engineering",
  "Civil Engineering",
  "Computer Science (Data Science)",
  "Computer Science (AIML)"
];

export default function App() {
  const [students, setStudents] = useState([]);
  const [summary, setSummary] = useState([]);
  const [stats, setStats] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDept, setFilterDept] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [activeTab, setActiveTab] = useState("directory");
  const [backendOnline, setBackendOnline] = useState(null);

  // Check backend 
  async function checkHealth() {
    try {
      const res = await fetch(`${API}/health`);
      if (res.ok) {
        setBackendOnline(true);
      } else {
        setBackendOnline(false);
      }
    } catch {
      setBackendOnline(false);
    }
  }

  // Load students from Express API
  async function loadStudents() {
    try {
      setLoading(true);
      let queryUrl = `${API}/students?`;
      if (filterDept !== "All") queryUrl += `department=${encodeURIComponent(filterDept)}&`;
      if (filterStatus !== "All") queryUrl += `status=${encodeURIComponent(filterStatus)}&`;
      if (searchTerm.trim()) queryUrl += `search=${encodeURIComponent(searchTerm.trim())}&`;

      const res = await fetch(queryUrl);
      if (!res.ok) throw new Error("Failed to fetch students from API");
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      showMessage(err.message, "error");
    } finally {
      setLoading(false);
    }
  }

  // Load department summary aggregation
  async function loadSummary() {
    try {
      const res = await fetch(`${API}/reports/department-summary`);
      if (res.ok) {
        const data = await res.json();
        setSummary(data);
      }
    } catch (err) {
      console.error("Aggregation report fetch error:", err);
    }
  }

  // Load metrics
  async function loadStats() {
    try {
      const res = await fetch(`${API}/reports/stats`);
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {
      console.error("Stats fetch error:", err);
    }
  }

  function reloadAllData() {
    loadStudents();
    loadSummary();
    loadStats();
    checkHealth();
  }

  useEffect(() => {
    reloadAllData();
  }, [filterDept, filterStatus, searchTerm]);

  function showMessage(text, type = "success") {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage({ text: "", type: "" });
    }, 4500);
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "semester" || name === "gpa" || name === "feesPaid"
          ? Number(value)
          : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const url = editingId ? `${API}/students/${editingId}` : `${API}/students`;
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Operation failed");
      }

      showMessage(
        editingId
          ? `Updated student: ${data.name} (${data.rollNo})`
          : `Added new student: ${data.name} (${data.rollNo})`,
        "success"
      );

      setForm(initialForm);
      setEditingId(null);
      reloadAllData();
    } catch (err) {
      showMessage(err.message, "error");
    }
  }

  function handleEdit(student) {
    setEditingId(student._id);
    setForm({
      rollNo: student.rollNo,
      name: student.name,
      department: student.department,
      semester: student.semester,
      gpa: student.gpa,
      email: student.email,
      status: student.status,
      feesPaid: student.feesPaid,
    });
    window.scrollTo({ top: 300, behavior: "smooth" });
  }

  function handleCancelEdit() {
    setEditingId(null);
    setForm(initialForm);
  }

  async function handleDelete(id, rollNo, name) {
    if (!window.confirm(`Are you sure you want to delete student ${name} (${rollNo})?`)) {
      return;
    }
    try {
      const res = await fetch(`${API}/students/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete student");

      showMessage(data.message || "Student deleted successfully", "success");
      reloadAllData();
    } catch (err) {
      showMessage(err.message, "error");
    }
  }

  return (
    <div className="app-wrapper">
      {/* Top Header */}
      <header className="navbar">
        <div className="navbar-container">
          <div className="brand">
            <div>
              <h1>Student Management System</h1>
            </div>
          </div>
          <div className="server-status">
            <span
              className={`status-pill ${backendOnline === true ? "online" : backendOnline === false ? "offline" : "checking"
                }`}
            >
              <span className="dot"></span>
              {backendOnline === true
                ? "API Connected (Port 5000)"
                : backendOnline === false
                  ? "API Disconnected"
                  : "Checking API..."}
            </span>
          </div>
        </div>
      </header>

      <main className="main-content">
        {/* Dashboard Cards */}
        <section className="stats-grid">
          <div className="stat-card">
            <span className="stat-label">Total Students</span>
            <span className="stat-value">{stats ? stats.totalStudents : students.length}</span>
            <span className="stat-desc">Enrolled in system</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Active Students</span>
            <span className="stat-value highlight-green">
              {stats ? stats.activeStudents : students.filter((s) => s.status === "Active").length}
            </span>
            <span className="stat-desc">Current academic term</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Average GPA</span>
            <span className="stat-value highlight-blue">
              {stats ? stats.averageGPA.toFixed(2) : "0.00"}
              <span className="stat-unit"> / 10.0</span>
            </span>
            <span className="stat-desc">Across all departments</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Total Fees Collected</span>
            <span className="stat-value highlight-amber">
              ₹ {stats ? stats.totalFeesCollected.toLocaleString("en-IN") : "0"}
            </span>
            <span className="stat-desc">Institution revenue</span>
          </div>
        </section>

        {/* Notification Banner */}
        {message.text && (
          <div className={`notification-banner ${message.type}`}>
            <span>{message.text}</span>
            <button onClick={() => setMessage({ text: "", type: "" })} className="close-btn">
              Close
            </button>
          </div>
        )}

        {/* Student Registration & Update Form */}
        <section className="card form-card">
          <div className="card-header">
            <h2>{editingId ? "Edit Student Record" : "Register New Student"}</h2>
            <p>
              {editingId
                ? `Modifying database document for student ID: ${editingId}`
                : "Fill out the fields below to insert a new document into MongoDB Atlas"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="student-form">
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="rollNo">Roll / Reg Number *</label>
                <input
                  id="rollNo"
                  name="rollNo"
                  type="text"
                  placeholder="e.g. 23CS101"
                  value={form.rollNo}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="e.g. Aditi Sharma"
                  value={form.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="department">Department *</label>
                <select
                  id="department"
                  name="department"
                  value={form.department}
                  onChange={handleInputChange}
                  required
                >
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="semester">Semester (1 - 8) *</label>
                <input
                  id="semester"
                  name="semester"
                  type="number"
                  min="1"
                  max="8"
                  value={form.semester}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="gpa">GPA (0.0 - 10.0) *</label>
                <input
                  id="gpa"
                  name="gpa"
                  type="number"
                  step="0.01"
                  min="0"
                  max="10"
                  value={form.gpa}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="student@college.edu"
                  value={form.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="status">Enrollment Status *</label>
                <select
                  id="status"
                  name="status"
                  value={form.status}
                  onChange={handleInputChange}
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Graduated">Graduated</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="feesPaid">Fees Paid (₹) *</label>
                <input
                  id="feesPaid"
                  name="feesPaid"
                  type="number"
                  min="0"
                  step="500"
                  value={form.feesPaid}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingId ? "Update Student" : "Add Student Record"}
              </button>
              {editingId && (
                <button type="button" onClick={handleCancelEdit} className="btn btn-secondary">
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </section>

        {/* View Switcher Tabs */}
        <div className="tabs-container">
          <button
            className={`tab-btn ${activeTab === "directory" ? "active" : ""}`}
            onClick={() => setActiveTab("directory")}
          >
            Student Directory ({students.length})
          </button>
          <button
            className={`tab-btn ${activeTab === "analytics" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("analytics");
              loadSummary();
            }}
          >
            Department Aggregation & Analytics
          </button>
        </div>

        {/* TAB 1: Student Directory & CRUD table */}
        {activeTab === "directory" && (
          <section className="card table-card">
            <div className="table-controls">
              <div className="search-box">
                <span className="search-icon">Search:</span>
                <input
                  type="text"
                  placeholder="Search by name, roll no, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="filters">
                <label>
                  Dept:
                  <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)}>
                    <option value="All">All Departments</option>
                    {DEPARTMENTS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Status:
                  <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                    <option value="All">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Graduated">Graduated</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </label>

                <button onClick={reloadAllData} className="btn btn-refresh" title="Refresh data">
                  Refresh
                </button>
              </div>
            </div>

            {loading ? (
              <div className="loading-state">Loading student records from MongoDB...</div>
            ) : students.length === 0 ? (
              <div className="empty-state">
                <p>No student documents found matching the filter criteria.</p>
                <p>Use the form above to add a new student record.</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Roll No</th>
                      <th>Student Name</th>
                      <th>Department</th>
                      <th>Sem</th>
                      <th>GPA</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Fees Paid</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((st) => (
                      <tr key={st._id}>
                        <td>
                          <span className="code-badge">{st.rollNo}</span>
                        </td>
                        <td className="font-semibold">{st.name}</td>
                        <td>{st.department}</td>
                        <td>Sem {st.semester}</td>
                        <td>
                          <span
                            className={`gpa-badge ${st.gpa >= 8.5 ? "gpa-high" : st.gpa >= 6.5 ? "gpa-mid" : "gpa-low"
                              }`}
                          >
                            {st.gpa.toFixed(2)}
                          </span>
                        </td>
                        <td className="text-muted">{st.email}</td>
                        <td>
                          <span
                            className={`status-chip ${st.status === "Active"
                                ? "status-active"
                                : st.status === "Graduated"
                                  ? "status-graduated"
                                  : "status-suspended"
                              }`}
                          >
                            {st.status}
                          </span>
                        </td>
                        <td className="text-right">₹ {Number(st.feesPaid).toLocaleString("en-IN")}</td>
                        <td>
                          <div className="actions-cell">
                            <button
                              onClick={() => handleEdit(st)}
                              className="btn btn-sm btn-edit"
                              title="Edit Record"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(st._id, st.rollNo, st.name)}
                              className="btn btn-sm btn-delete"
                              title="Delete Record"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {/* Department-wise Aggregation Summary */}
        {activeTab === "analytics" && (
          <section className="card table-card">
            <div className="card-header">
              <h2>MongoDB Department-wise Aggregation Report</h2>
              <p>
                Generated via <code>db.students.aggregate()</code> pipeline grouping by department,
                computing counts, average GPA, and total fees collected.
              </p>
            </div>

            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Department</th>
                    <th>Total Students</th>
                    <th>Active Students</th>
                    <th>Average GPA</th>
                    <th>Total Fees Collected</th>
                  </tr>
                </thead>
                <tbody>
                  {summary.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="empty-state">
                        No aggregation data available.
                      </td>
                    </tr>
                  ) : (
                    summary.map((item) => (
                      <tr key={item._id}>
                        <td className="font-semibold">{item._id}</td>
                        <td>
                          <span className="badge badge-primary">{item.studentCount}</span>
                        </td>
                        <td>{item.activeStudents}</td>
                        <td>
                          <span className="gpa-badge gpa-high">{item.avgGPA} / 10.0</span>
                        </td>
                        <td className="font-semibold">
                          ₹ {Number(item.totalFeesPaid).toLocaleString("en-IN")}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="aggregation-pipeline-box">
              <h3>MongoDB Aggregation Pipeline Executed:</h3>
              <pre>
                {`db.students.aggregate([
  {
    $group: {
      _id: "$department",
      studentCount: { $sum: 1 },
      avgGPA: { $avg: "$gpa" },
      totalFeesPaid: { $sum: "$feesPaid" },
      activeStudents: {
        $sum: { $cond: [{ $eq: ["$status", "Active"] }, 1, 0] }
      }
    }
  },
  {
    $project: {
      _id: 1,
      studentCount: 1,
      avgGPA: { $round: ["$avgGPA", 2] },
      totalFeesPaid: 1,
      activeStudents: 1
    }
  },
  { $sort: { studentCount: -1 } }
])`}
              </pre>
            </div>
          </section>
        )}
      </main>

      <footer className="footer">
        <p>
          Student Management System
        </p>
      </footer>
    </div>
  );
}
