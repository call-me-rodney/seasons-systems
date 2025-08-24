import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { generatePlannerSuggestion } from '../services/api';
import CalendarAI from '../components/CalendarAI';

const Planner = () => {
  const { user } = useAuth();
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse('');

    try {
      const apiResponse = await generatePlannerSuggestion(prompt);
      setResponse(apiResponse.data.suggestion);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full space-x-4">
      <div className="flex flex-col flex-1 bg-white rounded-lg shadow p-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Seasons Planner (AI)</h2>
        <p className="text-gray-600 mb-4">Get AI-powered suggestions and plans for your agricultural operations.</p>

        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-700">Your Query/Request:</label>
            <textarea
              id="prompt"
              name="prompt"
              rows="4"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              placeholder="e.g., 'Suggest optimal planting times for corn in my region', 'Analyze current crop health and recommend actions'"
              required
            ></textarea>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-seasons-green rounded-md hover:bg-seasons-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-seasons-green disabled:opacity-50"
            >
              {loading ? 'Generating...' : 'Get Suggestion'}
            </button>
          </div>
        </form>

        {response && (
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200 overflow-auto flex-1">
            <h3 className="text-lg font-medium text-gray-900 mb-2">AI Response:</h3>
            <p className="text-gray-800 whitespace-pre-wrap">{response}</p>
          </div>
        )}
      </div>
      <div className="w-80">
        <CalendarAI />
      </div>
    </div>
  );
};

export default Planner;
