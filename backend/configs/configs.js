import dotenv from 'dotenv';
dotenv.config();

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
    host: process.env.REDIS_HOST || 'redis',
    port: parseInt(process.env.REDIS_PORT) || 6379,
    url: `redis://${process.env.REDIS_HOST || 'redis'}:${process.env.REDIS_PORT || 6379}`
  },

  // Ollama Configuration
  ollama: {
    host: process.env.OLLAMA_HOST || 'ollama',
    port: parseInt(process.env.OLLAMA_PORT) || 11434,
    url: `http://${process.env.OLLAMA_HOST || 'ollama'}:${process.env.OLLAMA_PORT || 11434}`
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
  auth: {
    jwtSecret: process.env.JWT_SECRET || 'your-default-secret-key',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
    bcryptSaltRounds: 10
  }
};

export default configs;
