/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CanUserConnect
// ====================================================

export interface CanUserConnect_me {
  __typename: "Me";
  is_exceeding_either_connections_limit: boolean | null;
}

export interface CanUserConnect {
  /**
   * The current logged in user
   */
  me: CanUserConnect_me | null;
}
