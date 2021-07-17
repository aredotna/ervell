/* tslint:disable */
/* eslint-disable */
// @generated
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
  shareable_title: string;
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
  downloadable_image: string | null;
  source: BlockLightboxActions_Image_source | null;
  can: BlockLightboxActions_Image_can | null;
  shareable_href: string | null;
  shareable_title: string;
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
  shareable_title: string;
}

export interface BlockLightboxActions_Attachment_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface BlockLightboxActions_Attachment_can {
  __typename: "BlockCan";
  mute: boolean | null;
  potentially_edit_thumbnail: boolean | null;
  edit_thumbnail: boolean | null;
}

export interface BlockLightboxActions_Attachment {
  __typename: "Attachment" | "Embed" | "Link" | "PendingBlock";
  source: BlockLightboxActions_Attachment_source | null;
  can: BlockLightboxActions_Attachment_can | null;
  shareable_href: string | null;
  shareable_title: string;
}

export type BlockLightboxActions = BlockLightboxActions_Channel | BlockLightboxActions_Image | BlockLightboxActions_Text | BlockLightboxActions_Attachment;
