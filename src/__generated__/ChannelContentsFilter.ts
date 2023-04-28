/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ChannelContentsFilter
// ====================================================

export interface ChannelContentsFilter_counts {
  __typename: "ChannelCounts";
  contents: number;
  blocks: number;
  channels: number;
}

export interface ChannelContentsFilter {
  __typename: "Channel";
  id: number;
  title: string;
  counts: ChannelContentsFilter_counts;
}
