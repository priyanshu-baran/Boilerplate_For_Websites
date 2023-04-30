import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import usersRouter from './routes/users.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', usersRouter);

app.get('/api/env', (req, res) => {
  res.json({
    serviceId: process.env.EMAILJS_SERVICE_ID,
    templateId: process.env.EMAILJS_TEMPLATE_ID,
    apiKey: process.env.EMAILJS_API_KEY,
  });
});

// app.use('*', (req, res) => res.status(404).json({ error: 'not found' }));

export default app;
