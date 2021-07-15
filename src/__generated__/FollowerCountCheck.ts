/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FollowerCountCheck
// ====================================================

export interface FollowerCountCheck_counts {
  __typename: "MeCounts";
  following: number;
}

export interface FollowerCountCheck_twitter_authentication {
  __typename: "Authentication";
  id: number;
}

export interface FollowerCountCheck {
  __typename: "Me";
  id: number;
  counts: FollowerCountCheck_counts | null;
  twitter_authentication: FollowerCountCheck_twitter_authentication | null;
}
