import axios from 'axios';
import configs from '../configs/configs.js';
import logger from '../utils/logger.js';

const OLLAMA_API_URL = `${configs.ollama.url}/api/generate`;

export const generateOllamaResponse = async (prompt) => {
  try {
    const response = await axios.post(OLLAMA_API_URL, {
      model: 'llama2', // You can make this configurable
      prompt: prompt,
      stream: false,
    });
    logger.info('Ollama API call successful');
    return response.data.response;
  } catch (error) {
    logger.error(`Error calling Ollama API: ${error.message}`);
    throw new Error(`Failed to get response from Ollama: ${error.message}`);
  }
};
