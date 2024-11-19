import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  // Payment Details
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization', // Reference to the Organization model
    required: true
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event', // Reference to the Event being paid for
    required: true
  },
  orderId: {
    type: String,
    required: true // Unique identifier for the payment order
  },
  paymentId: {
    type: String // Payment gateway-provided unique ID (e.g., Razorpay, Stripe, PayPal)
  },
  amount: {
    type: Number,
    required: true // Total transaction amount
  },
  currency: {
    type: String,
    default: 'INR', // Default currency
    enum: ['INR', 'USD', 'EUR'] // Extendable to multiple currencies if needed
  },
  status: {
    type: String,
    enum: ['created', 'paid', 'failed', 'refunded'], // Added 'refunded' for refund cases
    default: 'created'
  },

  // Payment Metadata
  paymentMethod: {
    type: String,
    enum: ['UPI', 'Credit Card', 'Debit Card', 'Net Banking', 'Wallet'], // Modes of payment
    default: 'UPI'
  },
  receiptUrl: {
    type: String, // URL to the payment receipt (optional)
    default: ""
  },
  notes: {
    type: String, // Any additional notes related to the transaction
    default: ""
  },

  // Tracking Information
  isRefunded: {
    type: Boolean,
    default: false // Indicates if the payment has been refunded
  },
  refundDetails: {
    refundId: { type: String }, // ID provided by payment gateway for refund
    refundAmount: { type: Number } // Amount refunded (if any)
  },

  // Additional Fields
  failureReason: {
    type: String, // Reason for payment failure (if applicable)
    default: ''
  },
  paymentDate: {
    type: Date,
    default: null // Set when payment is successfully processed
  },
  taxAmount: {
    type: Number,
    default: 0
  },
  taxPercentage: {
    type: Number,
    default: 0
  },
  transactionSource: {
    type: String,
    enum: ['Razorpay', 'Stripe', 'PayPal', 'Custom'], // Example gateways
    default: 'Custom'
  },
  paymentCompletedAt: {
    type: Date,
    default: null // Set when payment is confirmed as completed
  },

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now // Automatically set at creation
  },
  updatedAt: {
    type: Date,
    default: Date.now // Updated during status change
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

export default mongoose.model('Transaction', transactionSchema);
