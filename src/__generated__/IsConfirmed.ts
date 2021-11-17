/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: IsConfirmed
// ====================================================

export interface IsConfirmed_me {
  __typename: "Me";
  is_confirmed: boolean;
}

export interface IsConfirmed {
  /**
   * The current logged in user
   */
  me: IsConfirmed_me | null;
}
