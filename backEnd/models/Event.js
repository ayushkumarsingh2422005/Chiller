import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    // Basic Event Information
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        default: "" // Brief description about the event
    },
    date: {
        type: Date,
        required: true
    },
    duration: {
        type: Number, // Duration of the event in hours
        required: true
    },
    location: {
        type: String,
        required: true
    },

    // Event Status
    status: {
        type: String,
        enum: ['active', 'cancelled', 'completed', 'upcoming'],
        default: 'active'
    },
    visibility: {
        type: String,
        enum: ['public', 'private'], // Determines who can view the event
        default: 'public'
    },

    // Event Organizer and Participation
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization', // Reference to the organizing organization
        required: true
    },
    attendees: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User' // Users attending the event
        }
    ],
    maxAttendees: {
        type: Number, // Maximum number of attendees allowed
        required: true
    },

    // Registration Details
    registrationRequired: {
        type: Boolean,
        default: false // Indicates if attendees must register
    },
    registrationFee: {
        type: Number, // Fee for registration (if applicable)
        default: 0
    },
    registrationDeadline: {
        type: Date, // Deadline for registration
        required: function () {
            return this.registrationRequired;
        },
        validate: {
            validator: function(v) {
                if (this.registrationRequired && v) {
                    return v > Date.now(); // Ensures the registration deadline is in the future
                }
                return true;
            },
            message: 'Registration deadline must be in the future.'
        }
    },

    // Event Assets
    bannerImage: {
        type: String, // URL of the banner image for the event
        default: ""
    },
    resources: [
        {
            title: { type: String },
            link: { type: String } // Links to slides, recordings, or other resources
        }
    ],

    // Social Media Links
    socialLinks: {
        facebook: { type: String, default: "" },
        instagram: { type: String, default: "" },
        twitter: { type: String, default: "" },
        linkedin: { type: String, default: "" },
        youtube: { type: String, default: "" },
        tiktok: { type: String, default: "" }
    },

    // Analytics
    totalRegistrations: {
        type: Number, // Tracks the number of registrations
        default: 0
    },
    totalAttendees: {
        type: Number, // Tracks the number of actual attendees
        default: 0
    },

    // Post-Event Fields
    postEventSurvey: {
        type: String, // Link to a post-event survey or feedback form
        default: ""
    },
    feedbackRating: {
        type: Number, // Rating scale (1-5 or 1-10)
        min: 1,
        max: 5,
        default: 0 // You can default to 0 and update after feedback is collected
    },

}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

export default mongoose.model('Event', eventSchema);
