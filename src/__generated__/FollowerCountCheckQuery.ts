/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FollowerCountCheckQuery
// ====================================================

export interface FollowerCountCheckQuery_me_counts {
  __typename: "MeCounts";
  following: number;
}

export interface FollowerCountCheckQuery_me_twitter_authentication {
  __typename: "Authentication";
  id: number;
}

export interface FollowerCountCheckQuery_me {
  __typename: "Me";
  id: number;
  counts: FollowerCountCheckQuery_me_counts;
  twitter_authentication: FollowerCountCheckQuery_me_twitter_authentication | null;
}

export interface FollowerCountCheckQuery {
  /**
   * The current logged in user
   */
  me: FollowerCountCheckQuery_me | null;
}
