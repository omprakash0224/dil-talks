import mongoose from 'mongoose';

const assessmentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  responses: [{
    question: String,
    answer: String
  }],
  score: Number,
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: Date
}, { timestamps: true });

const Assessment = mongoose.model('Assessment', assessmentSchema);

export default Assessment;
