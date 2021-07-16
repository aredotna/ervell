/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TwitterAuthCheck
// ====================================================

export interface TwitterAuthCheck_twitter_authentication {
  __typename: "Authentication";
  id: number;
}

export interface TwitterAuthCheck {
  __typename: "Me";
  id: number;
  twitter_authentication: TwitterAuthCheck_twitter_authentication | null;
}
