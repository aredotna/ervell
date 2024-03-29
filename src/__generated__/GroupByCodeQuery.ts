/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GroupByCodeQuery
// ====================================================

export interface GroupByCodeQuery_group_by_code_user {
  __typename: "User";
  name: string;
  href: string;
}

export interface GroupByCodeQuery_group_by_code_counts {
  __typename: "GroupCounts";
  channels: number;
  users: number;
}

export interface GroupByCodeQuery_group_by_code {
  __typename: "GroupPreview";
  id: number;
  name: string | null;
  user: GroupByCodeQuery_group_by_code_user | null;
  counts: GroupByCodeQuery_group_by_code_counts;
}

export interface GroupByCodeQuery {
  group_by_code: GroupByCodeQuery_group_by_code | null;
}

export interface GroupByCodeQueryVariables {
  code: string;
}
