import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, '../../.env')
});

const configs = {
  // Database Configuration
  database: {
    url: process.env.DATABASE_URL,
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },

  // Redis Configuration
  redis: {
    username: process.env.REDIS_USERNAME || 'default',
    host: process.env.REDIS_HOST || 'redis',
    port: parseInt(process.env.REDIS_PORT) || 6379,
    url: `redis://${process.env.REDIS_HOST || 'redis'}:${process.env.REDIS_PORT || 6379}`,
    password: process.env.REDIS_PASSWORD || null
  },

  // Server Configuration
  server: {
    port: parseInt(process.env.PORT) || 4000,
    environment: process.env.NODE_ENV || 'development',
    isProduction: process.env.NODE_ENV === 'production',
    isDevelopment: process.env.NODE_ENV === 'development',
    isTest: process.env.NODE_ENV === 'test'
  },

  // API Configuration
  api: {
    baseUrl: process.env.VITE_API_URL || 'http://localhost:4000'
  },

  // Authentication Configuration
  // Authentication Configuration
  auth: {
    jwtSecret: 'your-secure-secret-key-here',
    jwtExpiresIn: '1d',
    bcryptSaltRounds: 10
  },

  // Google Gemini Configuration
  gemini: {
    apiKey: process.env.GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY',
  }
};

export default configs;



