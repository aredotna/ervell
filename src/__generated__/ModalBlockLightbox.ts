/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ModalBlockLightbox
// ====================================================

export interface ModalBlockLightbox_block_Channel_user {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
}

export interface ModalBlockLightbox_block_Channel_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface ModalBlockLightbox_block_Channel {
  __typename: "Channel";
  id: number | null;
  title: string | null;
  created_at_unix_time: string | null;
  created_at_timestamp: string | null;
  created_at: string | null;
  updated_at: string | null;
  updated_at_timestamp: string | null;
  description: string | null;
  user: ModalBlockLightbox_block_Channel_user | null;
  source: ModalBlockLightbox_block_Channel_source | null;
  shareable_href: string | null;
  shareable_title: string | null;
  editable_title: string | null;
  editable_description: string | null;
}

export interface ModalBlockLightbox_block_Image_user {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
}

export interface ModalBlockLightbox_block_Image_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface ModalBlockLightbox_block_Image_can {
  __typename: "BlockCan";
  manage: boolean | null;
  comment: boolean | null;
  mute: boolean | null;
  potentially_edit_thumbnail: boolean | null;
  edit_thumbnail: boolean | null;
}

export interface ModalBlockLightbox_block_Image {
  __typename: "Image";
  id: number | null;
  title: string | null;
  created_at_unix_time: string | null;
  created_at_timestamp: string | null;
  created_at: string | null;
  updated_at: string | null;
  updated_at_timestamp: string | null;
  description: string | null;
  user: ModalBlockLightbox_block_Image_user | null;
  source: ModalBlockLightbox_block_Image_source | null;
  shareable_href: string | null;
  shareable_title: string | null;
  editable_title: string | null;
  editable_description: string | null;
  thumb_url: string | null;
  image_url: string | null;
  original_image_url: string | null;
  can: ModalBlockLightbox_block_Image_can | null;
  find_original_url: string | null;
  downloadable_image: string | null;
}

export interface ModalBlockLightbox_block_Text_user {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
}

export interface ModalBlockLightbox_block_Text_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface ModalBlockLightbox_block_Text_can {
  __typename: "BlockCan";
  manage: boolean | null;
  comment: boolean | null;
  mute: boolean | null;
  potentially_edit_thumbnail: boolean | null;
  edit_thumbnail: boolean | null;
}

export interface ModalBlockLightbox_block_Text {
  __typename: "Text";
  id: number | null;
  title: string | null;
  created_at_unix_time: string | null;
  created_at_timestamp: string | null;
  created_at: string | null;
  updated_at: string | null;
  updated_at_timestamp: string | null;
  description: string | null;
  user: ModalBlockLightbox_block_Text_user | null;
  source: ModalBlockLightbox_block_Text_source | null;
  shareable_href: string | null;
  shareable_title: string | null;
  editable_title: string | null;
  editable_description: string | null;
  content: string | null;
  can: ModalBlockLightbox_block_Text_can | null;
  find_original_url: string | null;
  editable_content: string | null;
}

export interface ModalBlockLightbox_block_Link_user {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
}

export interface ModalBlockLightbox_block_Link_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
  provider_name: string | null;
  provider_url: string | null;
}

export interface ModalBlockLightbox_block_Link_can {
  __typename: "BlockCan";
  manage: boolean | null;
  comment: boolean | null;
  mute: boolean | null;
  potentially_edit_thumbnail: boolean | null;
  edit_thumbnail: boolean | null;
}

export interface ModalBlockLightbox_block_Link {
  __typename: "Link";
  id: number | null;
  title: string | null;
  created_at_unix_time: string | null;
  created_at_timestamp: string | null;
  created_at: string | null;
  updated_at: string | null;
  updated_at_timestamp: string | null;
  description: string | null;
  user: ModalBlockLightbox_block_Link_user | null;
  source: ModalBlockLightbox_block_Link_source | null;
  shareable_href: string | null;
  shareable_title: string | null;
  editable_title: string | null;
  editable_description: string | null;
  source_url: string | null;
  image_url: string | null;
  image_updated_at: string | null;
  image_updated_at_unix_time: string | null;
  can: ModalBlockLightbox_block_Link_can | null;
}

export interface ModalBlockLightbox_block_Attachment_user {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
}

export interface ModalBlockLightbox_block_Attachment_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface ModalBlockLightbox_block_Attachment_can {
  __typename: "BlockCan";
  manage: boolean | null;
  comment: boolean | null;
  mute: boolean | null;
  potentially_edit_thumbnail: boolean | null;
  edit_thumbnail: boolean | null;
}

export interface ModalBlockLightbox_block_Attachment {
  __typename: "Attachment";
  id: number | null;
  title: string | null;
  created_at_unix_time: string | null;
  created_at_timestamp: string | null;
  created_at: string | null;
  updated_at: string | null;
  updated_at_timestamp: string | null;
  description: string | null;
  user: ModalBlockLightbox_block_Attachment_user | null;
  source: ModalBlockLightbox_block_Attachment_source | null;
  shareable_href: string | null;
  shareable_title: string | null;
  editable_title: string | null;
  editable_description: string | null;
  file_extension: string | null;
  file_url: string | null;
  file_size: string | null;
  file_content_type: string | null;
  image_url: string | null;
  image_updated_at: string | null;
  image_updated_at_unix_time: string | null;
  can: ModalBlockLightbox_block_Attachment_can | null;
}

export interface ModalBlockLightbox_block_Embed_user {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
}

export interface ModalBlockLightbox_block_Embed_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface ModalBlockLightbox_block_Embed_can {
  __typename: "BlockCan";
  manage: boolean | null;
  comment: boolean | null;
  mute: boolean | null;
  potentially_edit_thumbnail: boolean | null;
  edit_thumbnail: boolean | null;
}

export interface ModalBlockLightbox_block_Embed {
  __typename: "Embed";
  id: number | null;
  title: string | null;
  created_at_unix_time: string | null;
  created_at_timestamp: string | null;
  created_at: string | null;
  updated_at: string | null;
  updated_at_timestamp: string | null;
  description: string | null;
  user: ModalBlockLightbox_block_Embed_user | null;
  source: ModalBlockLightbox_block_Embed_source | null;
  shareable_href: string | null;
  shareable_title: string | null;
  editable_title: string | null;
  editable_description: string | null;
  embed_html: string | null;
  embed_width: number | null;
  embed_height: number | null;
  can: ModalBlockLightbox_block_Embed_can | null;
}

export interface ModalBlockLightbox_block_PendingBlock_user {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
}

export interface ModalBlockLightbox_block_PendingBlock_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface ModalBlockLightbox_block_PendingBlock_can {
  __typename: "BlockCan";
  manage: boolean | null;
  comment: boolean | null;
  mute: boolean | null;
  potentially_edit_thumbnail: boolean | null;
  edit_thumbnail: boolean | null;
}

export interface ModalBlockLightbox_block_PendingBlock {
  __typename: "PendingBlock";
  id: number | null;
  title: string | null;
  created_at_unix_time: string | null;
  created_at_timestamp: string | null;
  created_at: string | null;
  updated_at: string | null;
  updated_at_timestamp: string | null;
  description: string | null;
  user: ModalBlockLightbox_block_PendingBlock_user | null;
  source: ModalBlockLightbox_block_PendingBlock_source | null;
  shareable_href: string | null;
  shareable_title: string | null;
  editable_title: string | null;
  editable_description: string | null;
  can: ModalBlockLightbox_block_PendingBlock_can | null;
}

export type ModalBlockLightbox_block = ModalBlockLightbox_block_Channel | ModalBlockLightbox_block_Image | ModalBlockLightbox_block_Text | ModalBlockLightbox_block_Link | ModalBlockLightbox_block_Attachment | ModalBlockLightbox_block_Embed | ModalBlockLightbox_block_PendingBlock;

export interface ModalBlockLightbox {
  block: ModalBlockLightbox_block | null;
}

export interface ModalBlockLightboxVariables {
  id: string;
}
