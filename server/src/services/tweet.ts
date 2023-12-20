import { prismaClient } from "../client/db"
import redisClient from "../client/redis"

export interface CreateTweetPayload {
    content: string
    imageURL?: string
    userId: string
    
}
export interface DeleteTweetPayload {
    tweetId: string
    authorId: string
    
}

class TweetService {
    public static async createTweet(data: CreateTweetPayload) {
        const rateLimit = await redisClient.get(`RATE_LIMIT:TWEET:${data.userId}`)
        if(rateLimit) throw new Error("Please wait 30 seconds before posting another tweet");

        const tweet = await prismaClient.tweet.create({
            data: {
                content: data.content,
                imageURL: data.imageURL,
                authorId: data.userId
            }
        });
        await redisClient.setex(`RATE_LIMIT:TWEET:${data.userId}`, 15, 1);
        await redisClient.del("ALL_TWEETS");
        return tweet      
    }

    public static async getAllTweet() {
        const cachedTweets = await redisClient.get("ALL_TWEETS");
        if(cachedTweets) return JSON.parse(cachedTweets);
        const tweets = await prismaClient.tweet.findMany({orderBy: {createdAt: "desc"}});
        await redisClient.set("ALL_TWEETS", JSON.stringify(tweets));
        return tweets
    }
    public static async deleteTweet(id: string) {
        await prismaClient.tweet.delete({where: {id}});
        await redisClient.del("ALL_TWEETS");
        return true;

    }
}

export default TweetService