import { generateGeminiResponse } from '../services/geminiService.js';
import logger from '../utils/logger.js';

export const getPlannerSuggestion = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const geminiResponse = await generateGeminiResponse(prompt);
    res.json({ suggestion: geminiResponse });
    logger.info('Planner suggestion generated successfully');
  } catch (error) {
    logger.error(`Error getting planner suggestion: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};
