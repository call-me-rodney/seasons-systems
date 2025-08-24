import redisClient from "../configs/redis.js";

async function sendToastNotification(channel, message) {
  await redisClient.publish(channel, JSON.stringify(message));
}

export default { sendToastNotification };
