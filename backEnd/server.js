import express from "express";
import dotenv from "dotenv";
import http from "http"; // For Socket.IO
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import { initializeSocket } from "./config/socket.js"; // Socket.IO config

// Routes import
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import paymentRoute from "./routes/paymentRoute.js";
import organizationRoute from "./routes/organizationRoute.js";
import eventRoute from "./routes/eventRoute.js";
import collegeRoutes from './routes/collegeRoutes.js';
import earlyaccessRoute from './routes/earlyaccessRoute.js';

dotenv.config();
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app); // Create HTTP server

initializeSocket(server); // Initialize Socket.IO

// Middleware
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/organization", organizationRoute);
app.use("/api/notification", notificationRoutes);
app.use("/api/payment", paymentRoute);
app.use("/api/event", eventRoute);
app.use('/api/colleges', collegeRoutes);
app.use('/api/earlyaccess', earlyaccessRoute);

// Serve college management UI
app.get('/admin/colleges', (req, res) => {
  console.log(process.env.ADMIN_PASSWORD)
    res.render('collegeManagement', { 
        adminPassword: process.env.ADMIN_PASSWORD 
    });
});

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Server setup
const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
