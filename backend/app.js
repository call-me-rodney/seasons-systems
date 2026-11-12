import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import routes from './routes/index.js';
import { employeeRouter, superAdminRouter, errorHandler } from './compositionRoot.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
app.use('/api/employees', employeeRouter);
app.use('/api/super-admin/users', superAdminRouter);
app.use('/api', routes);
app.use(errorHandler);

export default app;
