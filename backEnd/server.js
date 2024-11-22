import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import passport from 'passport';
import session from 'express-session';
import http from 'http';                   // Import HTTP for Socket.IO
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js'; // Import notification routes
import paymentRoute from './routes/paymentRoute.js';
import cors from 'cors';
import { initializeSocket } from './config/socket.js'; // Import Socket.IO config
import multer from 'multer'; // Import Multer for file uploads
import path from 'path'; // To manage file paths
import './passport-setup.js';
// import cors from 'cors';


dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);     // Create HTTP server
initializeSocket(server);                   // Initialize Socket.IO

// Set EJS as the template engine
app.set('view engine', 'ejs');
// Set the directory for views (e.g., "views" folder)
app.set('views', './views');

// Middleware Setup
app.use(cors());
app.use(express.json());

// Session middleware configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret',
    resave: false,
    saveUninitialized: true
}));

// Initialize Passport.js for authentication
app.use(passport.initialize());
app.use(passport.session());

// Multer Configuration for Image Uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Path where images will be stored
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'));
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB file size limit
});

// Middleware to handle file uploads (you can use it in routes)
app.post('/api/upload', upload.single('image'), (req, res) => {
    if (req.file) {
        res.json({ message: 'File uploaded successfully!', file: req.file });
    } else {
        res.status(400).json({ message: 'No file uploaded.' });
    }
});

// Serve uploaded files as static assets
app.use('/uploads', express.static('uploads'));

// Error handling middleware for file upload errors
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: err.message });
    }
    if (err) {
        return res.status(500).json({ message: 'Server error', error: err });
    }
    next();
});

// Route definitions
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/notifications', notificationRoutes); // Add notification routes
app.use('/api/payments', paymentRoute);

// Test route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Route to render notification EJS page
app.get('/notifications', (req, res) => {
    res.render('notification'); // Render the notification EJS file
});

// Server setup
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
