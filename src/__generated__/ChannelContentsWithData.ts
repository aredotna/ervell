/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ChannelContentsWithData
// ====================================================

export interface ChannelContentsWithData_channel_can {
  __typename: "ChannelCan";
  add_to: boolean;
  reorder_connections: boolean;
  add_to_as_premium: boolean;
  update: boolean;
}

export interface ChannelContentsWithData_channel_counts {
  __typename: "ChannelCounts";
  contents: number;
}

export interface ChannelContentsWithData_channel {
  __typename: "Channel";
  id: number;
  can: ChannelContentsWithData_channel_can;
  counts: ChannelContentsWithData_channel_counts;
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
