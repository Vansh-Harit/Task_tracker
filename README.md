# Emerald Task Tracker

A full-stack, premium Task Management application built with the MERN stack (MongoDB, Express, React, Node.js). 

This project features a sleek, emerald-green glassmorphism design system, smooth highly-performant animations powered by AnimeJS, and a robust centralized state management architecture for instantaneous user feedback.

##  Features

- **Full CRUD Operations**: Create, Read, Update, and Delete tasks.
- **Dynamic Filtering & Sorting**: Instantly filter tasks by status (Pending, In Progress, Completed) and sort by Creation or Due dates without network latency.
- **Global State Architecture**: Unidirectional data flow via a centralized `App.jsx` root state provider, ensuring the UI always reflects the current data in memory.
- **Premium Glassmorphism UI**: Custom CSS utilizing translucent layers, backdrop blurring, and curated color palettes for a state-of-the-art aesthetic.
- **Fluid Animations**: Staggered list reveals and smooth form transitions using AnimeJS.

##  Tech Stack

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite
- **Routing:** React Router DOM
- **Animations:** AnimeJS
- **Icons:** Lucide React

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose)
- **Security:** Configurable CORS limits for production deployment

##  Running Locally

To run this project locally, you will need two terminal windows.

### 1. Start the Backend
Navigate to the `backend` directory and start the Express server.
```bash
cd backend
npm install
npm run dev
```
*Note: Make sure you have created a `.env` file in the backend folder containing your `MONGO_URI` and `PORT`.*

### 2. Start the Frontend
In a new terminal window, navigate to the `frontend` directory and start the Vite development server.
```bash
cd frontend
npm install
npm run dev
```

The application will be accessible at `http://localhost:5173`.

##  Deployment
This application is configured and ready for production deployment:
- **Frontend** is optimized for Vercel (includes `vercel.json` for SPA routing).
- **Backend** is optimized for Railway (respects `PORT` and `CORS_ORIGIN` environment variables).
