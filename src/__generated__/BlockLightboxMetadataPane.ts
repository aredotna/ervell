/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BlockLightboxMetadataPane
// ====================================================

export interface BlockLightboxMetadataPane_Channel_user {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
}

export interface BlockLightboxMetadataPane_Channel_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface BlockLightboxMetadataPane_Channel {
  __typename: "Channel";
  created_at_unix_time: string | null;
  created_at_timestamp: string | null;
  created_at: string | null;
  updated_at: string | null;
  updated_at_timestamp: string | null;
  title: string | null;
  description: string | null;
  user: BlockLightboxMetadataPane_Channel_user | null;
  source: BlockLightboxMetadataPane_Channel_source | null;
  shareable_href: string | null;
  shareable_title: string | null;
  id: number | null;
  editable_title: string | null;
  editable_description: string | null;
}

export interface BlockLightboxMetadataPane_Text_user {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
}

export interface BlockLightboxMetadataPane_Text_can {
  __typename: "BlockCan";
  manage: boolean | null;
  comment: boolean | null;
  mute: boolean | null;
  potentially_edit_thumbnail: boolean | null;
  edit_thumbnail: boolean | null;
}

export interface BlockLightboxMetadataPane_Text_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface BlockLightboxMetadataPane_Text {
  __typename: "Text";
  created_at_unix_time: string | null;
  created_at_timestamp: string | null;
  created_at: string | null;
  updated_at: string | null;
  updated_at_timestamp: string | null;
  title: string | null;
  description: string | null;
  user: BlockLightboxMetadataPane_Text_user | null;
  can: BlockLightboxMetadataPane_Text_can | null;
  source: BlockLightboxMetadataPane_Text_source | null;
  shareable_href: string | null;
  shareable_title: string | null;
  find_original_url: string | null;
  id: number | null;
  editable_title: string | null;
  editable_description: string | null;
  editable_content: string | null;
}

export interface BlockLightboxMetadataPane_Image_user {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
}

export interface BlockLightboxMetadataPane_Image_can {
  __typename: "BlockCan";
  manage: boolean | null;
  comment: boolean | null;
  mute: boolean | null;
  potentially_edit_thumbnail: boolean | null;
  edit_thumbnail: boolean | null;
}

export interface BlockLightboxMetadataPane_Image_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface BlockLightboxMetadataPane_Image {
  __typename: "Image";
  created_at_unix_time: string | null;
  created_at_timestamp: string | null;
  created_at: string | null;
  updated_at: string | null;
  updated_at_timestamp: string | null;
  title: string | null;
  description: string | null;
  user: BlockLightboxMetadataPane_Image_user | null;
  can: BlockLightboxMetadataPane_Image_can | null;
  source: BlockLightboxMetadataPane_Image_source | null;
  shareable_href: string | null;
  shareable_title: string | null;
  find_original_url: string | null;
  id: number | null;
  editable_title: string | null;
  editable_description: string | null;
}

export interface BlockLightboxMetadataPane_Link_user {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
}

export interface BlockLightboxMetadataPane_Link_can {
  __typename: "BlockCan";
  manage: boolean | null;
  comment: boolean | null;
  mute: boolean | null;
  potentially_edit_thumbnail: boolean | null;
  edit_thumbnail: boolean | null;
}

export interface BlockLightboxMetadataPane_Link_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface BlockLightboxMetadataPane_Link {
  __typename: "Link" | "Embed" | "Attachment" | "PendingBlock";
  created_at_unix_time: string | null;
  created_at_timestamp: string | null;
  created_at: string | null;
  updated_at: string | null;
  updated_at_timestamp: string | null;
  title: string | null;
  description: string | null;
  user: BlockLightboxMetadataPane_Link_user | null;
  can: BlockLightboxMetadataPane_Link_can | null;
  source: BlockLightboxMetadataPane_Link_source | null;
  shareable_href: string | null;
  shareable_title: string | null;
  id: number | null;
  editable_title: string | null;
  editable_description: string | null;
}

export type BlockLightboxMetadataPane = BlockLightboxMetadataPane_Channel | BlockLightboxMetadataPane_Text | BlockLightboxMetadataPane_Image | BlockLightboxMetadataPane_Link;
