/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BlockLightboxEmbed
// ====================================================

export interface BlockLightboxEmbed_Channel {
  __typename: "Channel" | "Text" | "Image" | "Link" | "Attachment" | "PendingBlock";
}

export interface BlockLightboxEmbed_Embed {
  __typename: "Embed";
  id: number | null;
  title: string | null;
  embed_html: string | null;
  embed_width: number | null;
  embed_height: number | null;
}

export type BlockLightboxEmbed = BlockLightboxEmbed_Channel | BlockLightboxEmbed_Embed;
