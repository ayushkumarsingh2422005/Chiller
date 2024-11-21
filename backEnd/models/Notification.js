import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        message: {
            type: String,
            required: true,
            trim: true,
        },
        type: {
            type: String,
            enum: ['info', 'warning', 'error', 'success'], // notification type (you can extend this)
            default: 'info',
        },
        sentToAll: {
            type: Boolean,
            default: true, // Determines if it's a global notification
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to User model (if notification is user-specific)
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
