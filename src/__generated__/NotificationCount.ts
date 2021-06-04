/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: NotificationCount
// ====================================================

export interface NotificationCount_counts {
  __typename: "MeCounts";
  notifications: number | null;
}

export interface NotificationCount {
  __typename: "Me";
  id: number | null;
  counts: NotificationCount_counts | null;
}
