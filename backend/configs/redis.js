import { createClient } from 'redis';
import configs from './configs.js';

const redisClient = createClient({
  url: configs.redis.url,
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

redisClient.connect();

export default redisClient;
