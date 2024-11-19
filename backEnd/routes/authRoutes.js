import express from 'express';
import { register, login, forgotPassword, resetPassword, googleAuthCallback } from '../controllers/authControllerUser.js';
import { registerOrganization, loginOrganization, forgotPasswordOrganization, resetPasswordOrganization } from '../controllers/authControllerOrganization.js'; // Import organization controller functions
import passport from 'passport';

const router = express.Router();

// **User Authentication Routes**

// Register a new user
router.post('/user/register', register);

// Login a user
router.post('/user/login', login);

// Forgot password for user
router.post('/user/forgot-password', forgotPassword);

// Reset password for user
router.post('/user/reset-password', resetPassword);

// Google Authentication for User
router.get('/user/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// Callback route for Google to redirect to for User
router.get('/user/google/callback', passport.authenticate('google', { session: false }), googleAuthCallback);

// **Organization Authentication Routes**

// Register a new organization
router.post('/organization/register', registerOrganization);

// Login an organization
router.post('/organization/login', loginOrganization);

// Forgot password for organization
router.post('/organization/forgot-password', forgotPasswordOrganization);

// Reset password for organization
router.post('/organization/reset-password', resetPasswordOrganization);

export default router;
