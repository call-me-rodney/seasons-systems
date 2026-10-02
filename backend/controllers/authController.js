import authService from '../services/authService.js';

export default {
  async login(req, res) {
    const { name, password } = req.body;
    try {
      const result = await authService.login(name, password);
      res.json(result);
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  }
};
