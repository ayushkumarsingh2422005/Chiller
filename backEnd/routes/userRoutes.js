import express from 'express';
import { getProfile } from '../controllers/userController.js';
import { authenticateUser } from '../middleware/authMiddleware.js';

const router = express.Router();

// router.put('/profile', updateProfile);
router.get('/data', authenticateUser, getProfile);

export default router;
