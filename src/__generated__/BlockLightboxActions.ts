/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BlockLightboxActions
// ====================================================

export interface BlockLightboxActions_Channel_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface BlockLightboxActions_Channel {
  __typename: "Channel";
  source: BlockLightboxActions_Channel_source | null;
  shareable_href: string | null;
  shareable_title: string | null;
}

export interface BlockLightboxActions_Image_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface BlockLightboxActions_Image_can {
  __typename: "BlockCan";
  mute: boolean | null;
  potentially_edit_thumbnail: boolean | null;
  edit_thumbnail: boolean | null;
}

export interface BlockLightboxActions_Image {
  __typename: "Image";
  find_original_url: string | null;
  source: BlockLightboxActions_Image_source | null;
  can: BlockLightboxActions_Image_can | null;
  shareable_href: string | null;
  shareable_title: string | null;
}

export interface BlockLightboxActions_Text_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface BlockLightboxActions_Text_can {
  __typename: "BlockCan";
  mute: boolean | null;
  potentially_edit_thumbnail: boolean | null;
  edit_thumbnail: boolean | null;
}

export interface BlockLightboxActions_Text {
  __typename: "Text";
  find_original_url: string | null;
  source: BlockLightboxActions_Text_source | null;
  can: BlockLightboxActions_Text_can | null;
  shareable_href: string | null;
  shareable_title: string | null;
}

export interface BlockLightboxActions_Link_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface BlockLightboxActions_Link_can {
  __typename: "BlockCan";
  mute: boolean | null;
  potentially_edit_thumbnail: boolean | null;
  edit_thumbnail: boolean | null;
}

export interface BlockLightboxActions_Link {
  __typename: "Link" | "Embed" | "Attachment" | "PendingBlock";
  source: BlockLightboxActions_Link_source | null;
  can: BlockLightboxActions_Link_can | null;
  shareable_href: string | null;
  shareable_title: string | null;
}

export type BlockLightboxActions = BlockLightboxActions_Channel | BlockLightboxActions_Image | BlockLightboxActions_Text | BlockLightboxActions_Link;
