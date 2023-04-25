/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ChannelContents
// ====================================================

export interface ChannelContents_can {
  __typename: "ChannelCan";
  add_to: boolean;
  reorder_connections: boolean;
  add_to_as_premium: boolean;
  update: boolean;
}

export interface ChannelContents_counts {
  __typename: "ChannelCounts";
  contents: number;
}

export interface ChannelContents {
  __typename: "Channel";
  id: number;
  can: ChannelContents_can;
  counts: ChannelContents_counts;
  visibility: string;
}
