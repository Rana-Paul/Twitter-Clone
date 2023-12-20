// import {CreateTweetData} from './types'
export const muatation = `#graphql

 createTweet(payload: CreateTweetData!): Tweet
 deleteTweet(payload: DeleteTweetData!): Boolean

`