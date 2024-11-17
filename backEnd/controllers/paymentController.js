// controllers/paymentController.js
import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

// console.log(process.env.RAZORPAY_KEY_ID, process.env.RAZORPAY_KEY_SECRET);

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create an order
export const createOrder = async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt = `receipt_${Date.now()}`, notes } = req.body;

    // Define order options
    const options = {
      amount: amount * 100, // Convert amount to paise
      currency,
      receipt,
      notes,
    };

    // Create order on Razorpay
    const order = await razorpay.orders.create(options);

    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error.message,
    });
  }
};

// Verify payment
export const verifyPayment = (req, res) => {
  const { order_id, payment_id, razorpay_signature } = req.body;

  try {
    // Generate expected signature
    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    hmac.update(order_id + '|' + payment_id);
    const generatedSignature = hmac.digest('hex');

    // Verify if the signature matches
    if (generatedSignature === razorpay_signature) {
      res.status(200).json({
        success: true,
        message: 'Payment verified successfully',
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Payment verification failed',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error verifying payment',
      error: error.message,
    });
  }
};

// Generate a payment link (optional, for direct payment URL)
export const createPaymentLink = async (req, res) => {
  try {
    const { amount, currency = 'INR', description, customer } = req.body;

    const options = {
      amount: amount * 100, // Convert to paise
      currency,
      description,
      customer: {
        name: customer.name,
        email: customer.email,
        contact: customer.contact,
      },
      notify: {
        sms: true,
        email: true,
      },
      callback_url: 'http://localhost:8000/api/payments/verify-payment',
      callback_method: 'get',
    };

    const paymentLink = await razorpay.paymentLink.create(options);

    res.status(201).json({
      success: true,
      paymentLink,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create payment link',
      error: error.message,
    });
  }
};
