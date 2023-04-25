/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdvancedSearchChannelCount
// ====================================================

export interface AdvancedSearchChannelCount_channel_counts {
  __typename: "ChannelCounts";
  blocks: number;
}

export interface AdvancedSearchChannelCount_channel {
  __typename: "Channel";
  id: number;
  counts: AdvancedSearchChannelCount_channel_counts;
}

export interface AdvancedSearchChannelCount {
  /**
   * A single channel
   */
  channel: AdvancedSearchChannelCount_channel | null;
}

export interface AdvancedSearchChannelCountVariables {
  id: string;
}
