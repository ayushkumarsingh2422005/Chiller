import express from 'express';
import { addEvent, getAllEvents, getOrganizationEvents, getEventById } from '../controllers/eventController.js';
import dynamicMulter from '../middleware/multer.js';
import { authenticate } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/add', authenticate, dynamicMulter("uploads/event").single("bannerImage"), addEvent);
router.get('/all', getAllEvents);
router.get('/organization', authenticate, getOrganizationEvents);
router.get('/:id', authenticate, getEventById);

export default router;