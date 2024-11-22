import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    // Basic User Information
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: function () {
            return !this.googleId; // Password is required only if googleId is not set
        }
    },
    googleId: {
        type: String // Stores the Google ID if logged in via Google
    },
    profileCompleted:{
        type: Boolean,
        default: false
    },
    profilePicture: {
        type: String, // URL for the user's profile picture
        default: "" // Default to an empty string
    },

    // Identification
    idcard: {
        type: String, // Link or ID of the user's ID card
        // required: true
    },
    registrationNumber: {
        type: String,
        required: false,
        unique: true,
        sparse: true
    },

    // Status
    active: {
        type: Boolean,
        required: true,
        default: true // Default active status for new users
    },

    // Academic Details
    program: {
        type: String,
        // required: true,
        enum: ['UG', 'PG', 'Ph.d'] // User's academic program
    },
    branch: {
        type: String,
        // required: true // User's branch or department
    },

    // Demographics
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Prefer Not to Choose'],
        default: 'Prefer Not to Choose' // Default to neutral if not specified
    },

    // Event Participation
    enrolledEvents: [
        {
            event: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Event'
            },
            paymentStatus: {
                type: String, 
                enum: ['Pending', 'Paid', 'Failed'],
                default: 'Pending'
            }
        }
    ],
    // Notifications and Settings (Optional for extensibility)
    notificationsEnabled: {
        type: Boolean,
        default: true // Allows users to enable/disable notifications
    },
    college: {
        type: String,
    },
    phone:{
        type: String
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt timestamps
});

export default mongoose.model('User', UserSchema);
