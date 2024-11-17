// routes/paymentRoute.js
import express from 'express';
import { createOrder, verifyPayment, createPaymentLink } from '../controllers/paymentController.js';

const router = express.Router();

// Routes
router.post('/create-order', createOrder); // Create an order
router.post('/verify-payment', verifyPayment); // Verify payment
router.post('/create-payment-link', createPaymentLink); // Optional: Create payment link

export default router;
