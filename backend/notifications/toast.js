import redisClient from "../configs/redis";

async function sendToastNotification(channel, message) {
  await redisClient.publish(channel, JSON.stringify(message));
}

export default { sendToastNotification };
