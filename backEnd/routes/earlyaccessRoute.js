import express from 'express';
import { saveEarlyAccess } from '../controllers/earlyaccessController.js';

const router = express.Router();


router.post('/save', saveEarlyAccess);

export default router;
