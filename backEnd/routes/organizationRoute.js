import express from 'express';
import { getProfile } from '../controllers/organizationController.js';
import { authenticate } from '../middleware/authMiddleware.js';
// import {  } from '../controllers/organizationController.js';
import { updateDescription, updateBank, updatePhone } from '../controllers/organizationController.js';

const router = express.Router();

// router.put('/profile', updateProfile);
router.get('/data', authenticate, getProfile);


// updation routes
router.put('/update-description', authenticate, updateDescription);
router.put('/update-bank', authenticate, updateBank);
router.put('/update-phone', authenticate, updatePhone);
// router.put('/update-college', authenticate, updateCollege);
// router.put('/update-registration-number', authenticate, updateRegistrationNumber);
// router.put('/update-program-branch', authenticate, updateProgramBranch);


export default router;
