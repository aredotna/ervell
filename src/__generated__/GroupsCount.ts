/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GroupsCount
// ====================================================

export interface GroupsCount_counts {
  __typename: "MeCounts";
  groups: number;
}

export interface GroupsCount {
  __typename: "Me";
  id: number;
  counts: GroupsCount_counts;
}
