/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TwitterAuthCheckQuery
// ====================================================

export interface TwitterAuthCheckQuery_me_twitter_authentication {
  __typename: "Authentication";
  id: number | null;
}

export interface TwitterAuthCheckQuery_me {
  __typename: "Me";
  id: number | null;
  twitter_authentication: TwitterAuthCheckQuery_me_twitter_authentication | null;
}

export interface TwitterAuthCheckQuery {
  /**
   * The current logged in user
   */
  me: TwitterAuthCheckQuery_me | null;
}
