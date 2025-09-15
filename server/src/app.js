import express from 'express';
import cors from 'cors';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import assessmentRoutes from './routes/assessment.js';
import chatRoutes from './routes/chat.js';

dotenv.config({ path: '.env.local' });

const app = express();

// Connect to MongoDB
await connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/assessments', ClerkExpressRequireAuth(), assessmentRoutes);
app.use('/api/chat', ClerkExpressRequireAuth(), chatRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

export default app;
