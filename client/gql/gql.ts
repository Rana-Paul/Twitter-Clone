/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  #graphql\n  mutation CreateTweet($payload: CreateTweetData!) {\n    # see this mutation\n    createTweet(payload: $payload) {\n      id\n      content\n      imageURL\n      author {\n        id\n        firstName\n        profileImageURL\n      }\n    }\n  }\n": types.CreateTweetDocument,
    "\n  mutation DeleteTweet($payload: DeleteTweetData!) {\n    deleteTweet(payload: $payload)\n  }\n": types.DeleteTweetDocument,
    "\n#graphql\n\n    mutation FollowUser($to: ID!) {\n        followUser(to: $to)\n    }\n\n": types.FollowUserDocument,
    "\n#graphql\n\n    mutation UnfollowUser($to: ID!) {\n        unfollowUser(to: $to)\n    }\n\n": types.UnfollowUserDocument,
    "\n    #graphql\n    query GetAllTweets {\n      getAllTweets {\n        id\n        content\n        imageURL\n        author {\n          id\n          firstName\n          lastName\n          profileImageURL\n        }\n      }\n    }\n  ": types.GetAllTweetsDocument,
    "\n    #graphql\n\n    query GetSignURL($imageName: String!, $imageType: String!) {\n      getSignedURLForTweet(imageName: $imageName, imageType: $imageType)\n    }\n  ": types.GetSignUrlDocument,
    "\n  #graphql\n  query VerifyUserGoogleToken($token: String!) {\n    verifyGoogleToken(token: $token)\n  }\n": types.VerifyUserGoogleTokenDocument,
    "\n  query GetCurrentUser {\n    getCurrentUser {\n        id\n        profileImageURL\n        email\n        firstName\n        lastName\n        recommendedUsers {\n          id\n          email\n          firstName\n          lastName\n          profileImageURL\n        }\n        followers {\n          id\n          firstName\n          lastName\n          profileImageURL\n        }\n        following {\n          id\n          firstName\n          lastName\n          profileImageURL\n        }\n        tweets {\n            id\n            content\n            author {\n              firstName\n              lastName\n              profileImageURL\n            }\n        }\n    }\n  }\n": types.GetCurrentUserDocument,
    "\nquery GetUserById($id: ID!) {\n  getUserById(id: $id) {\n    id\n    firstName\n    lastName\n    email\n    profileImageURL\n    followers {\n      firstName\n      lastName\n      profileImageURL\n    }\n    following {\n      firstName\n      lastName\n      profileImageURL\n    }\n    tweets {\n      content\n      id\n      author {\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n    }\n  }\n}\n": types.GetUserByIdDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  mutation CreateTweet($payload: CreateTweetData!) {\n    # see this mutation\n    createTweet(payload: $payload) {\n      id\n      content\n      imageURL\n      author {\n        id\n        firstName\n        profileImageURL\n      }\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  mutation CreateTweet($payload: CreateTweetData!) {\n    # see this mutation\n    createTweet(payload: $payload) {\n      id\n      content\n      imageURL\n      author {\n        id\n        firstName\n        profileImageURL\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteTweet($payload: DeleteTweetData!) {\n    deleteTweet(payload: $payload)\n  }\n"): (typeof documents)["\n  mutation DeleteTweet($payload: DeleteTweetData!) {\n    deleteTweet(payload: $payload)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n#graphql\n\n    mutation FollowUser($to: ID!) {\n        followUser(to: $to)\n    }\n\n"): (typeof documents)["\n#graphql\n\n    mutation FollowUser($to: ID!) {\n        followUser(to: $to)\n    }\n\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n#graphql\n\n    mutation UnfollowUser($to: ID!) {\n        unfollowUser(to: $to)\n    }\n\n"): (typeof documents)["\n#graphql\n\n    mutation UnfollowUser($to: ID!) {\n        unfollowUser(to: $to)\n    }\n\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n    query GetAllTweets {\n      getAllTweets {\n        id\n        content\n        imageURL\n        author {\n          id\n          firstName\n          lastName\n          profileImageURL\n        }\n      }\n    }\n  "): (typeof documents)["\n    #graphql\n    query GetAllTweets {\n      getAllTweets {\n        id\n        content\n        imageURL\n        author {\n          id\n          firstName\n          lastName\n          profileImageURL\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n\n    query GetSignURL($imageName: String!, $imageType: String!) {\n      getSignedURLForTweet(imageName: $imageName, imageType: $imageType)\n    }\n  "): (typeof documents)["\n    #graphql\n\n    query GetSignURL($imageName: String!, $imageType: String!) {\n      getSignedURLForTweet(imageName: $imageName, imageType: $imageType)\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  query VerifyUserGoogleToken($token: String!) {\n    verifyGoogleToken(token: $token)\n  }\n"): (typeof documents)["\n  #graphql\n  query VerifyUserGoogleToken($token: String!) {\n    verifyGoogleToken(token: $token)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCurrentUser {\n    getCurrentUser {\n        id\n        profileImageURL\n        email\n        firstName\n        lastName\n        recommendedUsers {\n          id\n          email\n          firstName\n          lastName\n          profileImageURL\n        }\n        followers {\n          id\n          firstName\n          lastName\n          profileImageURL\n        }\n        following {\n          id\n          firstName\n          lastName\n          profileImageURL\n        }\n        tweets {\n            id\n            content\n            author {\n              firstName\n              lastName\n              profileImageURL\n            }\n        }\n    }\n  }\n"): (typeof documents)["\n  query GetCurrentUser {\n    getCurrentUser {\n        id\n        profileImageURL\n        email\n        firstName\n        lastName\n        recommendedUsers {\n          id\n          email\n          firstName\n          lastName\n          profileImageURL\n        }\n        followers {\n          id\n          firstName\n          lastName\n          profileImageURL\n        }\n        following {\n          id\n          firstName\n          lastName\n          profileImageURL\n        }\n        tweets {\n            id\n            content\n            author {\n              firstName\n              lastName\n              profileImageURL\n            }\n        }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery GetUserById($id: ID!) {\n  getUserById(id: $id) {\n    id\n    firstName\n    lastName\n    email\n    profileImageURL\n    followers {\n      firstName\n      lastName\n      profileImageURL\n    }\n    following {\n      firstName\n      lastName\n      profileImageURL\n    }\n    tweets {\n      content\n      id\n      author {\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n    }\n  }\n}\n"): (typeof documents)["\nquery GetUserById($id: ID!) {\n  getUserById(id: $id) {\n    id\n    firstName\n    lastName\n    email\n    profileImageURL\n    followers {\n      firstName\n      lastName\n      profileImageURL\n    }\n    following {\n      firstName\n      lastName\n      profileImageURL\n    }\n    tweets {\n      content\n      id\n      author {\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n    }\n  }\n}\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;