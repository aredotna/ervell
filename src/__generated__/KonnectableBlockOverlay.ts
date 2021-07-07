/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: KonnectableBlockOverlay
// ====================================================

export interface KonnectableBlockOverlay_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface KonnectableBlockOverlay {
  __typename: "Attachment" | "Channel" | "Embed" | "Image" | "Link" | "PendingBlock" | "Text";
  id: number;
  source: KonnectableBlockOverlay_source | null;
}
