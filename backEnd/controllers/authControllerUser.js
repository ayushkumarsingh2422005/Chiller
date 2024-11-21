import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import nodemailer from 'nodemailer';
// import passport from 'passport';
import User from '../models/User.js';
import { OAuth2Client } from 'google-auth-library';

import dotenv from 'dotenv';
import { generateToken } from '../utils/jwtUtils.js';
dotenv.config();


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Helper function to configure nodemailer transport
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Example service
    auth: {
        user: process.env.EMAIL, // Sender email
        pass: process.env.EMAIL_PASSWORD, // Sender password
    },
});

// Registration function
export const register = async (req, res) => {
    const { name, email, password, gender } = req.body;
    console.log(name, email, password, gender);

    try {
        let user = await User.findOne({ email });
       
        if (user) {
            return res.status(400).json({
                success: false,
                message: 'A user with this email already exists. Please log in or use a different email address.',
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({ name, email, password: hashedPassword, gender });
        console.log(user)
        await user.save();

        // const payload = { userId: user._id };
        const token = generateToken({ id: user._id, type: "user" });

        res.status(201).json({ success: true, message: 'User registered successfully', token });
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Login function
export const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
    console.log(email, password);

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Invalid email or password' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid email or password' });

        // const payload = { userId: user._id };
        const token = generateToken({ id: user._id, type: "user" });

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

// Forgot Password function
export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'User does not exist' });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });

        const mailOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: 'Password Reset',
            text: `Click on the link to reset your password: ${process.env.CLIENT_URL}/reset-password/${token}`
        };

        await transporter.sendMail(mailOptions);
        res.json({ msg: 'Password reset link sent' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

// Reset Password function
export const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) return res.status(400).json({ msg: 'Invalid or expired token' });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        res.json({ msg: 'Password reset successful' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};


export const googleAuth = async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ message: 'Token is required' });
    }

    try {
        // Verify Google Token
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        });

        const payload = ticket.getPayload();
        const { email, name, picture } = payload;

        // Find or Create User in Database
        let user = await User.findOne({ email });
        if (!user) {
            user = new User({ name, email, profilePicture: picture, googleId: token });
            await user.save();
        }

        // Generate JWT for the User
        const jwtToken = generateToken({ id: user._id });

        res.status(200).json({ message: 'Login successful', token: jwtToken });
    } catch (error) {
        console.error('Error verifying Google token:', error);
        res.status(401).json({ message: 'Invalid token' });
    }
};
