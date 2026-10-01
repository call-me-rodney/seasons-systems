import app from './app.js';
import configs from './configs/configs.js';
import logger from './utils/logger.js';
import { WebSocketServer } from 'ws';
// import redisClient from './configs/redis.js'; // Import redisClient

const PORT = configs.server.port;
const DATABASE_RETRY_ATTEMPTS = 5;
const DATABASE_RETRY_DELAY_MS = 2000;

const wait = delay => new Promise(resolve => setTimeout(resolve, delay));

async function connectDatabase(sequelize) {
  if (!configs.database.url) {
    throw new Error('DATABASE_URL is not configured. Add it to the root .env file.');
  }

  for (let attempt = 1; attempt <= DATABASE_RETRY_ATTEMPTS; attempt += 1) {
    try {
      await sequelize.authenticate();
      await sequelize.sync({ force: false, alter: false });
      logger.info('Database connected and models synchronized.');
      return;
    } catch (error) {
      if (attempt === DATABASE_RETRY_ATTEMPTS) {
        throw error;
      }

      logger.warn(
        `Database startup attempt ${attempt}/${DATABASE_RETRY_ATTEMPTS} failed. Retrying in ${DATABASE_RETRY_DELAY_MS}ms.`,
        { error: error.message }
      );
      await wait(DATABASE_RETRY_DELAY_MS);
    }
  }
}

(async () => {
  const dbModule = await import('./models/index.js');
  const db = await dbModule.default; // Await the promise
  const { sequelize } = db;
  try {
    await connectDatabase(sequelize);
    const server = app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });

    // Initialize WebSocket Server
    const wss = new WebSocketServer({ server });

    // Redis Subscriber
    // const subscriber = redisClient.duplicate();
    // await subscriber.connect(); // Connect the subscriber
    // await subscriber.subscribe('chat_messages', (message, channel) => {
    //   logger.info(`Received message from Redis channel ${channel}: ${message}`);
    //   // Broadcast message to all connected WebSocket clients
    //   wss.clients.forEach(client => {
    //     if (client.readyState === client.OPEN) {
    //       client.send(message);
    //     }
    //   });
    // });

    wss.on('connection', ws => {
      logger.info('Client connected to WebSocket');

      ws.on('message', async message => {
        logger.info(`Received message: ${message}`);
        // Publish message to Redis channel
        await redisClient.publish('chat_messages', message.toString());
      });

      ws.on('close', () => {
        logger.info('Client disconnected from WebSocket');
      });

      ws.on('error', error => {
        logger.error('WebSocket error:', error);
      });
    });

  } catch (err) {
    logger.error('Something went wrong while starting the server:', err);
    process.exit(1);
  }
})();
