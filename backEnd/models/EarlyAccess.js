import mongoose from 'mongoose';

const earlyAccessSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true }, 
    userType: { type: String, required: true },
    role: { type: String, required: function() { return this.userType !== 'student'; } },
    organizationName: { type: String, required: function() { return this.userType !== 'student'; } },
    purpose: { type: String, required: true }
}, {
    timestamps: true
});

export default mongoose.model('EarlyAccess', earlyAccessSchema);
