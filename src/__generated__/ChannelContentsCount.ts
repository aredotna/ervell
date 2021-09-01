/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ChannelContentsCount
// ====================================================

export interface ChannelContentsCount_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface ChannelContentsCount {
  __typename: "Channel";
  id: number;
  counts: ChannelContentsCount_counts | null;
}
