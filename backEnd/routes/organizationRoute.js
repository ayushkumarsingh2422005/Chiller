import express from 'express';
import { getProfile, updateProfilePicture, updateOrganization, getAllOrganizations, getAllOrganizationDetails } from '../controllers/organizationController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import dynamicMulter from '../middleware/multer.js';

const router = express.Router();

router.get('/data', authenticate, getProfile);

// updation routes
// router.put('/update-description', authenticate, updateDescription);
// router.put('/update-bank', authenticate, updateBank);
// router.put('/update-phone', authenticate, updatePhone);
router.put('/update-image', 
    authenticate, 
    dynamicMulter("uploads/organization").single("profilePicture"),
    updateProfilePicture
);
router.put('/update', authenticate, updateOrganization);

router.get('/all', getAllOrganizations);
router.get('/details/:id', getAllOrganizationDetails);

export default router;
