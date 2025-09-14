import mongoose from 'mongoose';

const assessmentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  responses: {
    phq9: [{
      question: String,
      answer: {
        label: String,
        value: Number
      }
    }],
    gad7: [{
      question: String,
      answer: {
        label: String,
        value: Number
      }
    }],
    ghq12: [{
      question: String,
      answer: {
        label: String,
        value: Number
      }
    }]
  },
  scores: {
    phq9: Number,
    gad7: Number,
    ghq12: Number
  },
  aiAnalysis: {
    summary: String,
    riskLevel: String,
    recommendations: [String],
    requiresImmediate: Boolean
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Assessment', assessmentSchema);