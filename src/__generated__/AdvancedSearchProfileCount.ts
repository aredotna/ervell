/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdvancedSearchProfileCount
// ====================================================

export interface AdvancedSearchProfileCount_user_counts {
  __typename: "UserCounts";
  channels: number;
  blocks: number;
}

export interface AdvancedSearchProfileCount_user {
  __typename: "User";
  id: number;
  counts: AdvancedSearchProfileCount_user_counts;
}

export interface AdvancedSearchProfileCount {
  /**
   * A single user
   */
  user: AdvancedSearchProfileCount_user | null;
}

export interface AdvancedSearchProfileCountVariables {
  id: string;
}
