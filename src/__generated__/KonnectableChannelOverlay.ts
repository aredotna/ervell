/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: KonnectableChannelOverlay
// ====================================================

export interface KonnectableChannelOverlay_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface KonnectableChannelOverlay {
  __typename: "Channel";
  id: number | null;
  visibility: string | null;
  counts: KonnectableChannelOverlay_counts | null;
}
