/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: EmptyOrTips
// ====================================================

export interface EmptyOrTips_User {
  __typename: "User";
  id: number;
  is_me: boolean;
}

export interface EmptyOrTips_Group {
  __typename: "Group";
  id: number;
  is_current_user_a_member: boolean;
  is_current_user_the_owner: boolean;
}

export type EmptyOrTips = EmptyOrTips_User | EmptyOrTips_Group;
