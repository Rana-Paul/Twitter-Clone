import { graphql } from "@/gql";
export const createTweetMutation = graphql(`
  #graphql
  mutation CreateTweet($payload: CreateTweetData!) {
    # see this mutation
    createTweet(payload: $payload) {
      id
      content
      imageURL
      author {
        id
        firstName
        profileImageURL
      }
    }
  }
`);

export const deleteTweetMutation = graphql(`
  mutation DeleteTweet($payload: DeleteTweetData!) {
    deleteTweet(payload: $payload)
  }
`);
