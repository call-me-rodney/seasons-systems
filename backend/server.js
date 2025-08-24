import app from './app.js';
import configs from './configs/configs.js';
import logger from './utils/logger.js';

const PORT = configs.server.port;

(async () => {
  const dbModule = await import('./models/index.js');
  const db = await dbModule.default; // Await the promise
  const { sequelize } = db;
  try {
    await sequelize.authenticate();
    logger.info('Database connected.');
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch (err) {
    logger.error('Unable to connect to the database:', err);
    process.exit(1);
  }
})();
