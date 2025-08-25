import { createClient } from 'redis';
import configs from './configs.js';

const client = createClient({
    username: configs.redis.username,
    password: configs.redis.password,
    socket: {
        host: configs.redis.host,
        port: configs.redis.port
    }
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

redisClient.connect();

export default redisClient;
