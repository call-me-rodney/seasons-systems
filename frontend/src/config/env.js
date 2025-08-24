// Environment configuration utility
export const config = {
  // API Configuration
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
  
  // Environment
  nodeEnv: import.meta.env.VITE_NODE_ENV || 'development',
  isDevelopment: import.meta.env.VITE_NODE_ENV === 'development',
  isProduction: import.meta.env.VITE_NODE_ENV === 'production',
  
  // Debugging
  enableDebugLogs: import.meta.env.VITE_NODE_ENV === 'development',
};

// Validation function to ensure required environment variables are set
export const validateConfig = () => {
  const requiredVars = ['VITE_API_URL'];
  const missing = requiredVars.filter(varName => !import.meta.env[varName]);
  
  if (missing.length > 0) {
    console.warn('Missing environment variables:', missing);
  }
  
  return missing.length === 0;
};

// Log configuration in development
if (config.isDevelopment) {
  console.log('Environment Configuration:', {
    apiUrl: config.apiUrl,
    nodeEnv: config.nodeEnv,
    isDevelopment: config.isDevelopment,
  });
}

export default config;