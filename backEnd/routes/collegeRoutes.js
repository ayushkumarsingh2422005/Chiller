import express from 'express';
import { addColleges, getAllColleges, deleteCollege, updateCollege } from '../controllers/collegeController.js';
// import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add', addColleges);
router.get('/all', getAllColleges);
router.delete('/:id', deleteCollege);
router.put('/:id', updateCollege);

export default router; 