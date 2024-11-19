import mongoose from 'mongoose';

const eventFeedbackSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event', // Reference to the Event model
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  rating: {
    type: Number, // Rating between 1-5
    required: true,
    min: 1,
    max: 5
  },
  comments: {
    type: String, // User's comments about the event
    default: ''
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model('EventFeedback', eventFeedbackSchema);
