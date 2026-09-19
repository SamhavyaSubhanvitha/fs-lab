/** Express.js Student Server Application
 * Endpoints: GET /, GET /students, GET /about, 404 Handler */
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
// 1. Built-in Middleware for JSON parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// 2. Custom Request Logging Middleware
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] Incoming Request: ${req.method} ${req.url}`);
    next(); // Pass control to the next middleware or route handler
});
// 3. In-Memory Student Database (5+ Students)
const students = [
    {
        id: 1,
        rollNo: "5",
        name: "N. Samhavya",
        branch: "CSM",
        cgpa: 9.35,
        email: "samhavya10@email.com"
    },
    {
        id: 2,
        rollNo: "6",
        name: "Prasuna",
        branch: "CSD",
        cgpa: 8.90,
        email: "prasuna@email.com"
    },
    {
        id: 3,
        rollNo: "7",
        name: "Priya Sharma",
        branch: "ECE",
        cgpa: 9.15,
        email: "priya.sharma@email.com"
    },
    {
        id: 4,
        rollNo: "8",
        name: "Rahul Singh",
        branch: "CSE",
        cgpa: 8.75,
        email: "rahul.singh@email.com"
    },
    {
        id: 5,
        rollNo: "9",
        name: "Anita",
        branch: "IT",
        cgpa: 9.02,
        email: "anita@email.com"
    }
];
// ROUTES
// Route 1: Root Route (/) - Server Index & API Documentation
app.get('/', (req, res) => {
    res.status(200).json({
        message: "Welcome to the Express.js Student Information Server API",
        status: "Operational",
        timestamp: new Date(),
        availableEndpoints: [
            { path: "/", method: "GET", description: "API status, root index, and endpoints directory" },
            { path: "/students", method: "GET", description: "Fetch all students or filter using ?branch=CSE query" },
            { path: "/about", method: "GET", description: "Application metadata, developer, and course information" }
        ],
        documentation: "Project-Based Learning (PBL) Demonstration for Full Stack Web Development"
    });
});
// Route 2: Students Route (/students) - Returns list of students with query support
app.get('/students', (req, res) => {
    const { branch } = req.query;
    let filteredStudents = [...students];
    // Filter by branch query parameter if provided
    if (branch) {
        filteredStudents = filteredStudents.filter(s => 
            s.branch.toLowerCase() === branch.toLowerCase()
        );
    }
    res.status(200).json({
        success: true,
        count: filteredStudents.length,
        students: filteredStudents
    });
});
// Route 3: About Route (/about) - Returns application info
app.get('/about', (req, res) => {
    res.status(200).json({
        application: "Student Registry & Academic Portal API",
        version: "1.0.0",
        author: "N. Samhavya",
        rollNo: "A24126552099",
        course: "Full Stack Web Development",
        courseCode: "23CM4121",
        curriculum: "Project-Based Learning (CO-2 Evaluation)",
        techStack: {
            runtime: "Node.js (v24.x)",
            framework: "Express.js (v4.x)",
            protocol: "HTTP/1.1 RESTful JSON",
            architecture: "MVC Middleware-Routing Pipeline"
        },
        description: "A lightweight, modular Express.js server providing student data management and metadata endpoints."
    });
});
// 4. Catch-All 404 Route Handler for undefined endpoints
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: "Resource Not Found",
        message: `The requested endpoint '${req.originalUrl}' does not exist on this server.`,
        suggestedEndpoints: ["/", "/students", "/about"]
    });
});
// 5. Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('[ERROR] Uncaught Server Exception:', err.stack);
    res.status(500).json({
        success: false,
        error: "Internal Server Error",
        message: err.message
    });
});
// 6. Start HTTP Listener
app.listen(PORT, () => {
    console.log(`=============================================================`);
    console.log(`   EXPRESS.JS STUDENT SERVER RUNNING ON PORT ${PORT}         `);
    console.log(`   Root URL   : http://localhost:${PORT}/                   `);
    console.log(`   Students   : http://localhost:${PORT}/students           `);
    console.log(`   About URL  : http://localhost:${PORT}/about              `);
    console.log(`=============================================================`);
});
