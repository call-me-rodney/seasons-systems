/*
 * ============================================================================
 *  SOLID DEMO — D: DEPENDENCY INVERSION PRINCIPLE
 *  "High-level modules should not depend on low-level modules. Both should
 *   depend on abstractions."
 *  Original file: controllers/plannerController.js
 * ============================================================================
 *
 *  WHAT WAS WRONG
 *  --------------
 *      import { generateOllamaResponse } from '../services/ollamaService.js';
 *
 *  The planner (high-level policy: "validate a prompt, return a suggestion")
 *  imported a specific low-level detail: Ollama, called through axios, with
 *  the 'llama2' model hard-coded. The dependency arrow pointed the wrong way:
 *
 *      plannerController  ──►  ollamaService  ──►  axios / Ollama HTTP API
 *
 *  Consequences:
 *    - Switching to another LLM provider means editing the controller.
 *    - It cannot be unit-tested without a running Ollama server, or without
 *      a module-mocking library to intercept the import.
 *
 *  WHAT IMPROVED
 *  -------------
 *    1. The controller depends on an ABSTRACTION it defines itself:
 *
 *           SuggestionProvider = { suggest(prompt: string): Promise<string> }
 *
 *    2. createPlannerController({ suggestionProvider }) receives that
 *       abstraction from outside (dependency injection). There is no import
 *       of Ollama, axios, or any provider in the controller code.
 *    3. The Ollama code becomes an ADAPTER that implements the abstraction.
 *       Now both sides depend on the abstraction:
 *
 *           plannerController ──► SuggestionProvider ◄── ollamaProvider
 *
 *    4. The wiring happens in one place, the "composition root" at the bottom
 *       of this file. In a larger app it would move to app.js.
 *
 *  Swapping providers or testing is now one line:
 *
 *      const fake = { suggest: async () => 'Plant maize in field 3' };
 *      const { getPlannerSuggestion } = createPlannerController({ suggestionProvider: fake });
 * ============================================================================
 */
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
