/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BlockLightbox
// ====================================================

export interface BlockLightbox_Channel_user {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
}

export interface BlockLightbox_Channel_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface BlockLightbox_Channel {
  __typename: "Channel";
  id: number | null;
  title: string | null;
  created_at_unix_time: string | null;
  created_at_timestamp: string | null;
  created_at: string | null;
  updated_at: string | null;
  updated_at_timestamp: string | null;
  description: string | null;
  user: BlockLightbox_Channel_user | null;
  source: BlockLightbox_Channel_source | null;
  shareable_href: string | null;
  shareable_title: string | null;
  editable_title: string | null;
  editable_description: string | null;
}

export interface BlockLightbox_Image_user {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
}

export interface BlockLightbox_Image_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface BlockLightbox_Image_can {
  __typename: "BlockCan";
  manage: boolean | null;
  comment: boolean | null;
  mute: boolean | null;
  potentially_edit_thumbnail: boolean | null;
  edit_thumbnail: boolean | null;
}

export interface BlockLightbox_Image {
  __typename: "Image";
  id: number | null;
  title: string | null;
  thumb_url: string | null;
  image_url: string | null;
  original_image_url: string | null;
  created_at_unix_time: string | null;
  created_at_timestamp: string | null;
  created_at: string | null;
  updated_at: string | null;
  updated_at_timestamp: string | null;
  description: string | null;
  user: BlockLightbox_Image_user | null;
  source: BlockLightbox_Image_source | null;
  shareable_href: string | null;
  shareable_title: string | null;
  editable_title: string | null;
  editable_description: string | null;
  can: BlockLightbox_Image_can | null;
  find_original_url: string | null;
  downloadable_image: string | null;
}

export interface BlockLightbox_Text_can {
  __typename: "BlockCan";
  manage: boolean | null;
  comment: boolean | null;
  mute: boolean | null;
  potentially_edit_thumbnail: boolean | null;
  edit_thumbnail: boolean | null;
}

export interface BlockLightbox_Text_user {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
}

export interface BlockLightbox_Text_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface BlockLightbox_Text {
  __typename: "Text";
  id: number | null;
  title: string | null;
  content: string | null;
  can: BlockLightbox_Text_can | null;
  created_at_unix_time: string | null;
  created_at_timestamp: string | null;
  created_at: string | null;
  updated_at: string | null;
  updated_at_timestamp: string | null;
  description: string | null;
  user: BlockLightbox_Text_user | null;
  source: BlockLightbox_Text_source | null;
  shareable_href: string | null;
  shareable_title: string | null;
  editable_title: string | null;
  editable_description: string | null;
  find_original_url: string | null;
  editable_content: string | null;
}

export interface BlockLightbox_Link_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
  provider_name: string | null;
  provider_url: string | null;
}

export interface BlockLightbox_Link_user {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
}

export interface BlockLightbox_Link_can {
  __typename: "BlockCan";
  manage: boolean | null;
  comment: boolean | null;
  mute: boolean | null;
  potentially_edit_thumbnail: boolean | null;
  edit_thumbnail: boolean | null;
}

export interface BlockLightbox_Link {
  __typename: "Link";
  id: number | null;
  title: string | null;
  source_url: string | null;
  image_url: string | null;
  image_updated_at: string | null;
  image_updated_at_unix_time: string | null;
  source: BlockLightbox_Link_source | null;
  created_at_unix_time: string | null;
  created_at_timestamp: string | null;
  created_at: string | null;
  updated_at: string | null;
  updated_at_timestamp: string | null;
  description: string | null;
  user: BlockLightbox_Link_user | null;
  shareable_href: string | null;
  shareable_title: string | null;
  editable_title: string | null;
  editable_description: string | null;
  can: BlockLightbox_Link_can | null;
}

export interface BlockLightbox_Attachment_user {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
}

export interface BlockLightbox_Attachment_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface BlockLightbox_Attachment_can {
  __typename: "BlockCan";
  manage: boolean | null;
  comment: boolean | null;
  mute: boolean | null;
  potentially_edit_thumbnail: boolean | null;
  edit_thumbnail: boolean | null;
}

export interface BlockLightbox_Attachment {
  __typename: "Attachment";
  id: number | null;
  title: string | null;
  file_extension: string | null;
  file_url: string | null;
  file_size: string | null;
  file_content_type: string | null;
  image_url: string | null;
  image_updated_at: string | null;
  image_updated_at_unix_time: string | null;
  created_at_unix_time: string | null;
  created_at_timestamp: string | null;
  created_at: string | null;
  updated_at: string | null;
  updated_at_timestamp: string | null;
  description: string | null;
  user: BlockLightbox_Attachment_user | null;
  source: BlockLightbox_Attachment_source | null;
  shareable_href: string | null;
  shareable_title: string | null;
  editable_title: string | null;
  editable_description: string | null;
  can: BlockLightbox_Attachment_can | null;
}

export interface BlockLightbox_Embed_user {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
}

export interface BlockLightbox_Embed_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface BlockLightbox_Embed_can {
  __typename: "BlockCan";
  manage: boolean | null;
  comment: boolean | null;
  mute: boolean | null;
  potentially_edit_thumbnail: boolean | null;
  edit_thumbnail: boolean | null;
}

export interface BlockLightbox_Embed {
  __typename: "Embed";
  id: number | null;
  title: string | null;
  embed_html: string | null;
  embed_width: number | null;
  embed_height: number | null;
  created_at_unix_time: string | null;
  created_at_timestamp: string | null;
  created_at: string | null;
  updated_at: string | null;
  updated_at_timestamp: string | null;
  description: string | null;
  user: BlockLightbox_Embed_user | null;
  source: BlockLightbox_Embed_source | null;
  shareable_href: string | null;
  shareable_title: string | null;
  editable_title: string | null;
  editable_description: string | null;
  can: BlockLightbox_Embed_can | null;
}

export interface BlockLightbox_PendingBlock_user {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
}

export interface BlockLightbox_PendingBlock_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface BlockLightbox_PendingBlock_can {
  __typename: "BlockCan";
  manage: boolean | null;
  comment: boolean | null;
  mute: boolean | null;
  potentially_edit_thumbnail: boolean | null;
  edit_thumbnail: boolean | null;
}

export interface BlockLightbox_PendingBlock {
  __typename: "PendingBlock";
  id: number | null;
  title: string | null;
  created_at_unix_time: string | null;
  created_at_timestamp: string | null;
  created_at: string | null;
  updated_at: string | null;
  updated_at_timestamp: string | null;
  description: string | null;
  user: BlockLightbox_PendingBlock_user | null;
  source: BlockLightbox_PendingBlock_source | null;
  shareable_href: string | null;
  shareable_title: string | null;
  editable_title: string | null;
  editable_description: string | null;
  can: BlockLightbox_PendingBlock_can | null;
}

export type BlockLightbox = BlockLightbox_Channel | BlockLightbox_Image | BlockLightbox_Text | BlockLightbox_Link | BlockLightbox_Attachment | BlockLightbox_Embed | BlockLightbox_PendingBlock;
