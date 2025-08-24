import { generateOllamaResponse } from '../services/ollamaService.js';
import logger from '../utils/logger.js';

export const getPlannerSuggestion = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const ollamaResponse = await generateOllamaResponse(prompt);
    res.json({ suggestion: ollamaResponse });
    logger.info('Planner suggestion generated successfully');
  } catch (error) {
    logger.error(`Error getting planner suggestion: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};
