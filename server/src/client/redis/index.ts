import Redis from "ioredis"

const redisClient = new Redis(process.env.REDIS_URI as string);

export default redisClient;
