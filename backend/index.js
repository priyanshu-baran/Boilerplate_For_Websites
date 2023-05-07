import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import usersRouter from './routes/users.js';

const app = express();

const port = process.env.PORT || 8000;

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

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

// Define the Netlify function handler
const handler = async (event, context) => {
  // Invoke the usersRouter middleware with the request and response objects
  usersRouter(event, context);

  // Invoke the /api/env endpoint handler with the request and response objects
  if (event.httpMethod === 'GET' && event.path === '/api/env') {
    app.handle(event, context);
  }
};

// Export the Netlify function handler
export { handler };
