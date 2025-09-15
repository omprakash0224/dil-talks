import { Router } from 'express';
import { generateChatResponse } from '../services/geminiService.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { history, message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required.' });
    }

    const botResponse = await generateChatResponse(history || [], message);
    res.json({ reply: botResponse });

  } catch (error) {
    console.error('Chat route error:', error);
    res.status(500).json({ error: 'The AI assistant is currently unavailable.' });
  }
});

export default router;