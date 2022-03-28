/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PrimarySearchGroupCount
// ====================================================

export interface PrimarySearchGroupCount_group_counts {
  __typename: "GroupCounts";
  channels: number | null;
  users: number | null;
}

export interface PrimarySearchGroupCount_group {
  __typename: "Group";
  id: number;
  counts: PrimarySearchGroupCount_group_counts | null;
}

export interface PrimarySearchGroupCount {
  group: PrimarySearchGroupCount_group | null;
}

export interface PrimarySearchGroupCountVariables {
  id: string;
}
