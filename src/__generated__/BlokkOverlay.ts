/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BlokkOverlay
// ====================================================

export interface BlokkOverlay_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface BlokkOverlay {
  __typename: "Channel" | "Text" | "Image" | "Link" | "Embed" | "Attachment" | "PendingBlock";
  id: number | null;
  source: BlokkOverlay_source | null;
}
