import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configs = {
  // Database Configuration
  database: {
    url: 'postgresql://neondb_owner:npg_jHu4aAlE5zfg@ep-winter-moon-a2joa7eq-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },

  // Redis Configuration
  redis: {
    host: 'redis',
    port: 6379,
    url: `redis://redis:6379`
  },

  // Ollama Configuration
  ollama: {
    host: 'ollama',
    port: 11434,
    url: `http://ollama:11434`
  },

  // Server Configuration
  server: {
    port: 4000,
    environment: 'development',
    isProduction: false,
    isDevelopment: true,
    isTest: false
  },

  // API Configuration
  api: {
    baseUrl: 'http://localhost:4000'
  },

  // Authentication Configuration
  auth: {
    jwtSecret: 'your-secure-secret-key-here',
    jwtExpiresIn: '1d',
    bcryptSaltRounds: 10
  }
};

export default configs;


