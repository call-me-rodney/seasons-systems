import app from './app.js';
import { sequelize } from './models/index.js';
import configs from './configs/configs.js';

const PORT = configs.server.port;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected.');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Unable to connect to the database:', err);
    process.exit(1);
  }
})();
