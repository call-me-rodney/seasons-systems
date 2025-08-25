import { GoogleGenerativeAI } from '@google/generative-ai';
import configs from '../configs/configs.js';
import logger from '../utils/logger.js';

const genAI = new GoogleGenerativeAI(configs.gemini.apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash"});

export const generateGeminiResponse = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    logger.info('Gemini API call successful');
    return text;
  } catch (error) {
    logger.error(`Error calling Gemini API: ${error.message}`);
    throw new Error(`Failed to get response from Gemini: ${error.message}`);
  }
};
