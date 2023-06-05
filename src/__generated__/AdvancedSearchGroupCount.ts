/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdvancedSearchGroupCount
// ====================================================

export interface AdvancedSearchGroupCount_group_counts {
  __typename: "GroupCounts";
  channels: number;
  users: number;
}

export interface AdvancedSearchGroupCount_group {
  __typename: "Group";
  id: number;
  counts: AdvancedSearchGroupCount_group_counts;
}

export interface AdvancedSearchGroupCount {
  group: AdvancedSearchGroupCount_group | null;
}

export interface AdvancedSearchGroupCountVariables {
  id: string;
}
