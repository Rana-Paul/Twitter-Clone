import { prismaClient } from "../../client/db";
import { GraphqlContext } from "../../interfaces";
import { User } from "prisma/prisma-client";
import UserService from "../../services/user";
import redisClient from "../../client/redis";

const queries = {
  verifyGoogleToken: async (parent: any, { token }: { token: string }) => {
    return await UserService.verifyGoogleAuthToken(token);
  },

  getCurrentUser: async(parent: any, args: any, ctx: GraphqlContext) => {
    const id = ctx.user?.id
    if(!id) return null

    const user = await UserService.getUserByID(id)
    return user
  },

  getUserById: async(parent: any, {id}: {id: string}, ctx: GraphqlContext) => {
    return await UserService.getUserByID(id)
  }
};

const mutations = {
  followUser: async(parent: any, {to}: {to: string}, ctx: GraphqlContext) => {
    if(!ctx.user || !ctx.user.id) throw new Error("You must be logged in to follow a user")
    await UserService.followUser(ctx.user?.id, to)
    await redisClient.del(`RECOMMENDED_USERS_:${ctx.user?.id}`)
    return true;
  },
  unfollowUser: async(parent: any, {to}: {to: string}, ctx: GraphqlContext) => {
    if(!ctx.user || !ctx.user.id) throw new Error("You must be logged in to follow a user")
    await UserService.unfollowUser(ctx.user?.id, to)
    await redisClient.del(`RECOMMENDED_USERS_:${ctx.user?.id}`)
    return true;
  }


}

const extraResolvers = {
  User: {
    tweets: (parent: User) => {
      return prismaClient.tweet.findMany({
        where: { authorId: parent.id },
      });
    },
    followers: async(parent: User) => {
      const result = await prismaClient.follows.findMany({
        where: { following: { id: parent.id } },
        include: {
          follower: true,
        }
      });

      console.log(result);

      return result.map(el => el.follower)
    },
    following: async(parent: User) => {
      const result = await prismaClient.follows.findMany({
        where: { follower: { id: parent.id } },
        include: {
          following: true,
        }
        
      });

      console.log(result);

      return result.map(el => el.following)
    },

    recommendedUsers: async(parent: User, _:any, ctx: GraphqlContext) => {
      if(!ctx.user || !ctx.user.id) return [];
      const cachedValue = await redisClient.get(`RECOMMENDED_USERS_:${ctx.user?.id}`);

      if(cachedValue) return JSON.parse(cachedValue);

      const myFollowings = await prismaClient.follows.findMany({
        where: { follower: { id: ctx.user?.id } },
        include: {
          following:  {include: {followers: {include: {following: true}}}},
        },
      });

      const user: User[] = [];

      for(const following of myFollowings) {
        for (const followingOfFollowedUser of following.following.followers) {
          console.log(followingOfFollowedUser.followingId)
          if (followingOfFollowedUser.followingId !== ctx.user?.id && myFollowings.findIndex(e => e.followingId === followingOfFollowedUser.followingId) < 0) {
            user.push(followingOfFollowedUser.following);
          }
        }

      }

      await redisClient.set(`RECOMMENDED_USERS_:${ctx.user?.id}`,JSON.stringify(user))

      return user
      
    }

    
  }
}

export const resolvers = { queries, extraResolvers, mutations };
