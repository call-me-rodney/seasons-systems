# Environment Variables Setup

This document explains how to configure environment variables for the Seasons Systems frontend application.

## Environment Files

### Development
1. Copy `.env.example` to `.env`
2. Update the values as needed for your local development environment

### Production
1. Copy `.env.production.example` to `.env.production`
2. Update the values with your production API endpoints

## Available Environment Variables

### Required Variables

- `VITE_API_URL`: The base URL for the API endpoints
  - Development: `http://localhost:4000/api`
  - Production: `https://your-production-api.com/api`

### Optional Variables

- `VITE_NODE_ENV`: The environment mode (development/production)
  - Default: `development`

## File Structure

```
frontend/
├── .env                     # Local development environment (not committed)
├── .env.example            # Example development environment
├── .env.production.example # Example production environment
├── .env.production         # Production environment (not committed)
└── src/
    └── config/
        └── env.js          # Centralized environment configuration
```

## Usage in Code

Instead of directly accessing `import.meta.env`, use the centralized configuration:

```javascript
import { config } from '../config/env.js';

// Use config.apiUrl instead of import.meta.env.VITE_API_URL
const response = await fetch(`${config.apiUrl}/endpoint`);
```

## Security Notes

1. Never commit `.env` files to version control
2. Use `.env.example` files to document required variables
3. All environment variables must be prefixed with `VITE_` to be accessible in the frontend
4. Sensitive information should never be stored in frontend environment variables

## Debugging

In development mode, the current configuration is logged to the console. Check the browser's developer tools to verify your environment variables are loaded correctly.

## Deployment

When deploying to production:

1. Ensure all required environment variables are set in your deployment environment
2. Use the production API URL
3. Set `VITE_NODE_ENV=production`

## Troubleshooting

If you encounter issues:

1. Verify the `.env` file exists and has the correct variables
2. Restart the development server after changing environment variables
3. Check the browser console for configuration logs in development mode
4. Ensure all variables are prefixed with `VITE_`