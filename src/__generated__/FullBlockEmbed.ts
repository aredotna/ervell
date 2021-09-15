/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FullBlockEmbed
// ====================================================

export interface FullBlockEmbed_Attachment {
  __typename: "Attachment" | "Channel" | "Image" | "Link" | "PendingBlock" | "Text";
}

export interface FullBlockEmbed_Embed {
  __typename: "Embed";
  id: number;
  title: string;
  embed_html: string | null;
  embed_width: number | null;
  embed_height: number | null;
}

export type FullBlockEmbed = FullBlockEmbed_Attachment | FullBlockEmbed_Embed;
