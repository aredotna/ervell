/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ChannelContentsFilter
// ====================================================

export interface ChannelContentsFilter_counts {
  __typename: "ChannelCounts";
  contents: number | null;
  blocks: number | null;
  channels: number | null;
}

export interface ChannelContentsFilter {
  __typename: "Channel";
  id: number | null;
  title: string | null;
  counts: ChannelContentsFilter_counts | null;
}
