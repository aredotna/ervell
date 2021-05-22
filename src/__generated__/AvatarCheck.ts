/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AvatarCheck
// ====================================================

export interface AvatarCheck_me {
  __typename: "Me";
  id: number | null;
  avatar: string | null;
}

export interface AvatarCheck {
  /**
   * The current logged in user
   */
  me: AvatarCheck_me | null;
}
