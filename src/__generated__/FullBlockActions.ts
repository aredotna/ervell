/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FullBlockActions
// ====================================================

export interface FullBlockActions_Channel_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface FullBlockActions_Channel {
  __typename: "Channel";
  source: FullBlockActions_Channel_source | null;
  shareable_href: string | null;
  shareable_title: string;
}

export interface FullBlockActions_Image_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface FullBlockActions_Image_can {
  __typename: "BlockCan";
  mute: boolean | null;
  potentially_edit_thumbnail: boolean | null;
  edit_thumbnail: boolean | null;
}

export interface FullBlockActions_Image {
  __typename: "Image";
  find_original_url: string | null;
  downloadable_image: string | null;
  source: FullBlockActions_Image_source | null;
  can: FullBlockActions_Image_can | null;
  shareable_href: string | null;
  shareable_title: string;
}

export interface FullBlockActions_Text_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface FullBlockActions_Text_can {
  __typename: "BlockCan";
  mute: boolean | null;
  potentially_edit_thumbnail: boolean | null;
  edit_thumbnail: boolean | null;
}

export interface FullBlockActions_Text {
  __typename: "Text";
  find_original_url: string | null;
  source: FullBlockActions_Text_source | null;
  can: FullBlockActions_Text_can | null;
  shareable_href: string | null;
  shareable_title: string;
}

export interface FullBlockActions_Attachment_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface FullBlockActions_Attachment_can {
  __typename: "BlockCan";
  mute: boolean | null;
  potentially_edit_thumbnail: boolean | null;
  edit_thumbnail: boolean | null;
}

export interface FullBlockActions_Attachment {
  __typename: "Attachment" | "Embed" | "Link" | "PendingBlock";
  source: FullBlockActions_Attachment_source | null;
  can: FullBlockActions_Attachment_can | null;
  shareable_href: string | null;
  shareable_title: string;
}

export type FullBlockActions = FullBlockActions_Channel | FullBlockActions_Image | FullBlockActions_Text | FullBlockActions_Attachment;
