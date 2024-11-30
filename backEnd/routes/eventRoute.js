import express from 'express';
import { addEvent } from '../controllers/eventController.js';

const router = express.Router();

router.post('/add', addEvent);

export default router;