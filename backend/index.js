import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import serverless from 'serverless-http';

const router = express.Router();

import usersRouter from './routes/users.js';

const app = express();

const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

router.get('/', (req, res) => {
  res.json({
    serviceId: process.env.EMAILJS_SERVICE_ID,
    templateId: process.env.EMAILJS_TEMPLATE_ID,
    apiKey: process.env.EMAILJS_API_KEY,
  });
});

app.use('/users', usersRouter);
app.use('/api/env', router);

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

export const handler = serverless(app);
