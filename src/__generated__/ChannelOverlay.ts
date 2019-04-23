/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ChannelOverlay
// ====================================================

export interface ChannelOverlay_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface ChannelOverlay {
  __typename: "Channel";
  id: number | null;
  visibility: string | null;
  counts: ChannelOverlay_counts | null;
}
