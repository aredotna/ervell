/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BlockLightboxLink
// ====================================================

export interface BlockLightboxLink_Channel {
  __typename: "Channel" | "Text" | "Image" | "Embed" | "Attachment" | "PendingBlock";
}

export interface BlockLightboxLink_Link_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
  provider_name: string | null;
  provider_url: string | null;
}

export interface BlockLightboxLink_Link {
  __typename: "Link";
  id: number | null;
  title: string | null;
  source_url: string | null;
  image_url: string | null;
  image_updated_at: string | null;
  image_updated_at_unix_time: string | null;
  source: BlockLightboxLink_Link_source | null;
}

export type BlockLightboxLink = BlockLightboxLink_Channel | BlockLightboxLink_Link;
