/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UnreadNotificationsCount
// ====================================================

export interface UnreadNotificationsCount_counts {
  __typename: "MeCounts";
  notifications: number | null;
}

export interface UnreadNotificationsCount {
  __typename: "Me";
  id: number | null;
  counts: UnreadNotificationsCount_counts | null;
}
