/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ChannelContentsWithData
// ====================================================

export interface ChannelContentsWithData_channel_can {
  __typename: "ChannelCan";
  add_to: boolean | null;
  reorder_connections: boolean | null;
  add_to_as_premium: boolean | null;
  update: boolean | null;
}

export interface ChannelContentsWithData_channel_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface ChannelContentsWithData_channel {
  __typename: "Channel";
  id: number;
  can: ChannelContentsWithData_channel_can | null;
  counts: ChannelContentsWithData_channel_counts | null;
  visibility: string;
}

export interface ChannelContentsWithData {
  /**
   * A single channel
   */
  channel: ChannelContentsWithData_channel | null;
}

export interface ChannelContentsWithDataVariables {
  id: string;
}
