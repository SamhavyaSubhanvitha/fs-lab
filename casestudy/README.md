# Student Management System (Full-Stack MERN Application)

A complete, production-ready Full-Stack MERN (MongoDB, Express.js, React, Node.js) web application built for university student administration, grade tracking, and department-wise analytics.

---

## Project Architecture

```text
student-management-system/
├── backend/
│   ├── package.json          
│   ├── server.js             
│   ├── .env.example          
│   ├── .env                  
│   └── .gitignore
├── frontend/
│   ├── package.json          
│   ├── vite.config.js        
│   ├── index.html            
│   ├── src/
│   │   ├── main.jsx          
│   │   ├── App.jsx           
│   │   └── style.css         
│   ├── .env.example          
│   ├── .env                  
│   └── .gitignore
└── README.md
```

---

## Quick Start Guide (Local Setup)

### Prerequisites
- Node.js (v18.x or later)
- MongoDB (Local community server running on port 27017 or a MongoDB Atlas connection URI)

### 1. Backend Setup
```bash
cd backend
npm install
npm start
```
- The backend server will start at: `http://localhost:5000`
- Test health check: `http://localhost:5000/api/health`

### 2. Frontend Setup
In a new terminal:
```bash
cd frontend
npm install
npm run dev
```
- The React application will start at: `http://localhost:5173`

---

## Cloud Deployment Guide

### 1. Database: MongoDB Atlas
1. Sign in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a free M0 Shared Cluster.
3. In **Database Access**, create a user with read and write privileges.
4. In **Network Access**, add IP `0.0.0.0/0` (allow access from anywhere) so Render can connect.
5. In **Database** > **Connect** > **Drivers**, copy the connection string:
   `mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority`

### 2. Backend: Render (Web Service)
1. Push your project or `backend` folder to a GitHub repository.
2. Sign in to [Render](https://render.com) and click **New Web Service**.
3. Connect your repository and configure:
   - **Root Directory**: `backend` (if in monorepo) or leave empty if repository root
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add **Environment Variables**:
   - `MONGODB_URI`: `<Your MongoDB Atlas connection string>`
   - `DB_NAME`: `student_management_db`
   - `FRONTEND_ORIGIN`: `https://<your-vercel-app>.vercel.app`
   - `NODE_ENV`: `production`
5. Click **Deploy Web Service** and copy the deployed URL (e.g., `https://student-api.onrender.com`).

### 3. Frontend: Vercel
1. Sign in to [Vercel](https://vercel.com) and click **Add New Project**.
2. Import your GitHub repository.
3. Configure the project:
   - **Root Directory**: `frontend`
   - **Framework Preset**: `Vite`
4. Under **Environment Variables**, add:
   - `VITE_API_URL`: `https://student-api.onrender.com` (Your Render backend URL)
5. Click **Deploy**. Vercel will provide your live URL (e.g., `https://student-management-system.vercel.app`).
6. Update the `FRONTEND_ORIGIN` variable in Render to match your Vercel URL.
