import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema({
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
        required: true
    },
    image: {
        type: String
    },
    description: {
        type: String,
        required: true,
        default: ""
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive"
    },
    statusReason: {
        type: String,
        default: ""
    },
    bank: {
        name: { type: String },
        accountNumber: { type: String },
        ifsc: { type: String },
        accountHolderName: { type: String },
        accountType: { type: String }
    },
    phone: {
        type: String,
        required: true
    },
    profileComplited: {
        type: Boolean,
        default: false
    },
    emailVarified: {
        type: Boolean,
        default: false
    },
    phoneVarified: {
        type: Boolean,
        default: false
    },
    emailVerificationToken: {
        type: String
    },
    phoneVerificationToken: {
        type: String
    },
    emailVerifiedAt: {
        type: Date
    },
    phoneVerifiedAt: {
        type: Date
    },
    createdEvents: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event'
        }
    ]
}, {
    timestamps: true
});

export default mongoose.model('Organization', organizationSchema);
