/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GroupsCountQuery
// ====================================================

export interface GroupsCountQuery_me_counts {
  __typename: "MeCounts";
  groups: number;
}

export interface GroupsCountQuery_me {
  __typename: "Me";
  id: number;
  counts: GroupsCountQuery_me_counts;
}

export interface GroupsCountQuery {
  /**
   * The current logged in user
   */
  me: GroupsCountQuery_me | null;
}
