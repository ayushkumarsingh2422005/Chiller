import express from 'express';
import { getProfile, updateCollege, updateGender, updatePhone, updateProgramBranch, updateRegistrationNumber, updateUser, updateProfilePicture } from '../controllers/userController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import dynamicMulter from '../middleware/multer.js';

const router = express.Router();

// router.put('/profile', updateProfile);
router.get('/data', authenticate, getProfile);


// updation routes
router.put('/update-gender', authenticate, updateGender);
router.put('/update-phone', authenticate, updatePhone);
router.put('/update-college', authenticate, updateCollege);
router.put('/update-registration-number', authenticate, updateRegistrationNumber);
router.put('/update-program-branch', authenticate, updateProgramBranch);
router.put('/update', authenticate, updateUser);
router.put('/update-profile-picture', 
    authenticate, 
    dynamicMulter("uploads/profile").single("profilePicture"), 
    updateProfilePicture
);


export default router;
