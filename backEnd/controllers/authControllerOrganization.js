// import Organization from '../models/Organization.js';
import Orginization from '../models/Orginization.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import nodemailer from 'nodemailer';

// Helper function to configure nodemailer transport for email notifications
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Example service
    auth: {
        user: process.env.EMAIL, // Sender email
        pass: process.env.EMAIL_PASSWORD, // Sender password
    },
});

// Registration function for Organization
export const registerOrganization = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, password, description, contactPerson, phoneNumber } = req.body;

    try {
        // Check if the organization already exists
        let organization = await Organization.findOne({ email });
        if (organization) return res.status(400).json({ msg: 'Organization already exists' });

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new organization and save it to the database
        organization = new Organization({
            name,
            email,
            password: hashedPassword,
            description,
            contactPerson,
            phoneNumber,
        });
        await organization.save();

        // Generate JWT token for the organization
        const payload = { organizationId: organization._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Respond with the generated token
        res.status(201).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

// Login function for Organization
export const loginOrganization = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {
        // Check if the organization exists
        const organization = await Organization.findOne({ email });
        if (!organization) return res.status(400).json({ msg: 'Invalid email or password' });

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, organization.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid email or password' });

        // Generate JWT token for the organization
        const payload = { organizationId: organization._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Respond with the generated token
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

// Forgot Password function for Organization
export const forgotPasswordOrganization = async (req, res) => {
    const { email } = req.body;

    try {
        // Check if the organization exists
        const organization = await Organization.findOne({ email });
        if (!organization) return res.status(400).json({ msg: 'Organization does not exist' });

        // Generate a temporary password reset token
        const token = jwt.sign({ organizationId: organization._id }, process.env.JWT_SECRET, { expiresIn: '15m' });

        // Send the reset email with the token
        const mailOptions = {
            from: process.env.EMAIL,
            to: organization.email,
            subject: 'Password Reset Request',
            text: `Click the link below to reset your password:\n${process.env.CLIENT_URL}/reset-password/${token}`,
        };

        await transporter.sendMail(mailOptions);
        res.json({ msg: 'Password reset link sent' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

// Reset Password function for Organization
export const resetPasswordOrganization = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        // Verify the password reset token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const organization = await Organization.findById(decoded.organizationId);
        if (!organization) return res.status(400).json({ msg: 'Invalid or expired token' });

        // Hash the new password and update the organization password
        const salt = await bcrypt.genSalt(10);
        organization.password = await bcrypt.hash(newPassword, salt);
        await organization.save();

        res.json({ msg: 'Password reset successful' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};
