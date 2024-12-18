import mongoose from 'mongoose';

const collegeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: String,
        required: true
    },
    established: {
        type: Number
    },
    website: {
        type: String
    },
    type: {
        type: String,
        enum: ['IIT', 'NIT', 'IIIT', 'GFTI', 'OTHER'],
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model('College', collegeSchema); 