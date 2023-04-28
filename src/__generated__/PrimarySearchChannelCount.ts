/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PrimarySearchChannelCount
// ====================================================

export interface PrimarySearchChannelCount_channel_counts {
  __typename: "ChannelCounts";
  blocks: number;
}

export interface PrimarySearchChannelCount_channel {
  __typename: "Channel";
  id: number;
  counts: PrimarySearchChannelCount_channel_counts;
}

export interface PrimarySearchChannelCount {
  /**
   * A single channel
   */
  channel: PrimarySearchChannelCount_channel | null;
}

export interface PrimarySearchChannelCountVariables {
  id: string;
}
