/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ChannelContents
// ====================================================

export interface ChannelContents_can {
  __typename: "ChannelCan";
  add_to: boolean | null;
  reorder_connections: boolean | null;
  add_to_as_premium: boolean | null;
  remove_connections: boolean | null;
}

export interface ChannelContents_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface ChannelContents {
  __typename: "Channel";
  id: number;
  can: ChannelContents_can | null;
  counts: ChannelContents_counts | null;
  visibility: string;
}
