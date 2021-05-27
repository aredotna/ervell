/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserInfoQuery
// ====================================================

export interface UserInfoQuery_me {
  __typename: "Me";
  name: string | null;
}

export interface UserInfoQuery {
  /**
   * The current logged in user
   */
  me: UserInfoQuery_me | null;
}
