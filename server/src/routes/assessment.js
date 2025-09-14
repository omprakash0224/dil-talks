import { Router } from 'express';
import Assessment from '../models/Assessment.js';
import { analyzeAssessment } from '../services/geminiService.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { userId, responses } = req.body;

    // Validate request data
    if (!userId || !responses) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate response structure
    if (!responses.phq9 || !responses.gad7 || !responses.ghq12) {
      return res.status(400).json({ error: 'Invalid response structure' });
    }

    // Calculate scores
    const scores = {
      phq9: calculateScore(responses.phq9),
      gad7: calculateScore(responses.gad7),
      ghq12: calculateScore(responses.ghq12)
    };

    console.log('Calculated scores:', scores); // Debug log

    // Get AI analysis
    const aiAnalysis = await analyzeAssessment(responses);
    
    console.log('AI Analysis:', aiAnalysis); // Debug log

    // Create assessment
    const assessment = new Assessment({
      userId,
      responses,
      scores,
      aiAnalysis
    });

    await assessment.save();
    res.status(201).json(assessment);
  } catch (error) {
    console.error('Assessment creation failed:', error);
    res.status(500).json({ 
      error: 'Failed to process assessment',
      details: error.message 
    });
  }
});

const calculateScore = (responses) => {
  if (!Array.isArray(responses)) {
    return 0;
  }
  return responses.reduce((sum, r) => {
    return sum + (r?.answer?.value || 0);
  }, 0);
};

export default router;

