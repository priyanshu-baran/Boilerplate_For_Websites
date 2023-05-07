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

// define the function handler for the /users endpoint
// export async function usersHandler(event, context) {
//   try {
//     // process the request and return a response
//     const result = await app(event, context);
//     return {
//       statusCode: 200,
//       body: JSON.stringify(result),
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ error: 'Internal Server Error' }),
//     };
//   }
// }

// // define the function handler for the /api/env endpoint
// export async function envHandler(event, context) {
//   try {
//     // process the request and return a response
//     const result = await app(event, context);
//     return {
//       statusCode: 200,
//       body: JSON.stringify(result),
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ error: 'Internal Server Error' }),
//     };
//   }
// }
