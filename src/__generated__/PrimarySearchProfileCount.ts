/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PrimarySearchProfileCount
// ====================================================

export interface PrimarySearchProfileCount_user_counts {
  __typename: "UserCounts";
  channels: number;
  blocks: number;
}

export interface PrimarySearchProfileCount_user {
  __typename: "User";
  id: number;
  counts: PrimarySearchProfileCount_user_counts;
}

export interface PrimarySearchProfileCount {
  /**
   * A single user
   */
  user: PrimarySearchProfileCount_user | null;
}

export interface PrimarySearchProfileCountVariables {
  id: string;
}
