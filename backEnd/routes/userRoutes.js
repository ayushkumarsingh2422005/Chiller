import express from 'express';
import { getProfile, updateCollege, updateGender, updatePhone, updateProgramBranch, updateRegistrationNumber } from '../controllers/userController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// router.put('/profile', updateProfile);
router.get('/data', authenticate, getProfile);


// updation routes
router.put('/update-gender', authenticate, updateGender);
router.put('/update-phone', authenticate, updatePhone);
router.put('/update-college', authenticate, updateCollege);
router.put('/update-registration-number', authenticate, updateRegistrationNumber);
router.put('/update-program-branch', authenticate, updateProgramBranch);


export default router;
