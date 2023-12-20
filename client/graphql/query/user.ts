import { graphql } from "../../gql";

export const verifyUserGoogleTokenQuery = graphql(`
  #graphql
  query VerifyUserGoogleToken($token: String!) {
    verifyGoogleToken(token: $token)
  }
`);

export const getCurrentUserQuery = graphql(`
  query GetCurrentUser {
    getCurrentUser {
        id
        profileImageURL
        email
        firstName
        lastName
        recommendedUsers {
          id
          email
          firstName
          lastName
          profileImageURL
        }
        followers {
          id
          firstName
          lastName
          profileImageURL
        }
        following {
          id
          firstName
          lastName
          profileImageURL
        }
        tweets {
            id
            content
            author {
              firstName
              lastName
              profileImageURL
            }
        }
    }
  }
`);
export const getUserByIdQuery  = graphql(`
query GetUserById($id: ID!) {
  getUserById(id: $id) {
    id
    firstName
    lastName
    email
    profileImageURL
    followers {
      firstName
      lastName
      profileImageURL
    }
    following {
      firstName
      lastName
      profileImageURL
    }
    tweets {
      content
      id
      author {
        id
        firstName
        lastName
        profileImageURL
      }
    }
  }
}
`);
