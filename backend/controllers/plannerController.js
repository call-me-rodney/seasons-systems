import logger from '../utils/logger.js';

// ---- High-level policy: knows only the abstraction -------------------------
export const createPlannerController = ({ suggestionProvider }) => ({
  getPlannerSuggestion: async (req, res) => {
    try {
      const { prompt } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
      }

      const suggestion = await suggestionProvider.suggest(prompt);
      res.json({ suggestion });
      logger.info('Planner suggestion generated successfully');
    } catch (error) {
      logger.error(`Error getting planner suggestion: ${error.message}`);
      res.status(500).json({ error: error.message });
    }
  },
});

// ---- Composition root: the ONLY place that names a concrete provider -------
// The existing Ollama service is wrapped as an adapter that satisfies
// SuggestionProvider. Replace this block to use a different LLM.
import { generateOllamaResponse } from '../services/ollamaService.js';

const ollamaProvider = { suggest: (prompt) => generateOllamaResponse(prompt) };

// Same export name as the original, so routes/planner.js can switch to it.
export const { getPlannerSuggestion } = createPlannerController({
  suggestionProvider: ollamaProvider,
});
