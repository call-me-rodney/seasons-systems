import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './models';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// API routes
app.use('/api', require('./routes'));

export default app;
