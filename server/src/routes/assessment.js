import { Router } from 'express';
import Assessment from '../models/Assessment.js';
import requireAuth from '../middleware/auth.js';

const router = Router();

router.post('/', requireAuth, async (req, res) => {
  try {
    const assessment = new Assessment({
      userId: req.auth.userId,
      responses: req.body.responses
    });
    await assessment.save();
    res.status(201).json(assessment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/my-assessments', requireAuth, async (req, res) => {
  try {
    const assessments = await Assessment.find({ userId: req.auth.userId });
    res.json(assessments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
