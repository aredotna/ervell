/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ModalFullBlock
// ====================================================

export interface ModalFullBlock_block_Channel_user {
  __typename: "User";
  id: number;
  name: string;
  href: string;
}

export interface ModalFullBlock_block_Channel_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface ModalFullBlock_block_Channel {
  __typename: "Channel";
  id: number;
  title: string;
  href: string;
  created_at_unix_time: string;
  created_at_timestamp: string;
  created_at: string;
  updated_at: string;
  updated_at_timestamp: string;
  description: string | null;
  user: ModalFullBlock_block_Channel_user | null;
  source: ModalFullBlock_block_Channel_source | null;
  shareable_href: string;
  shareable_title: string;
  editable_title: string;
  editable_description: string | null;
}

export interface ModalFullBlock_block_Image_user {
  __typename: "User";
  id: number;
  name: string;
  href: string;
}

export interface ModalFullBlock_block_Image_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface ModalFullBlock_block_Image_can {
  __typename: "BlockCan";
  manage: boolean;
  comment: boolean;
  mute: boolean;
  potentially_edit_thumbnail: boolean;
  edit_thumbnail: boolean;
}

export interface ModalFullBlock_block_Image {
  __typename: "Image";
  id: number;
  title: string;
  href: string;
  created_at_unix_time: string;
  created_at_timestamp: string;
  created_at: string;
  updated_at: string;
  updated_at_timestamp: string;
  description: string | null;
  user: ModalFullBlock_block_Image_user | null;
  source: ModalFullBlock_block_Image_source | null;
  shareable_href: string;
  shareable_title: string;
  editable_title: string;
  editable_description: string | null;
  thumb_url: string | null;
  image_url: string | null;
  original_image_url: string | null;
  alt_text: string | null;
  can: ModalFullBlock_block_Image_can;
  /**
   * URL to find the original image on various services
   */
  find_original_url: string | null;
  downloadable_image: string | null;
  editable_alt_text: string | null;
}

export interface ModalFullBlock_block_Text_user {
  __typename: "User";
  id: number;
  name: string;
  href: string;
}

export interface ModalFullBlock_block_Text_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface ModalFullBlock_block_Text_can {
  __typename: "BlockCan";
  manage: boolean;
  comment: boolean;
  mute: boolean;
  potentially_edit_thumbnail: boolean;
  edit_thumbnail: boolean;
}

export interface ModalFullBlock_block_Text {
  __typename: "Text";
  id: number;
  title: string;
  href: string;
  created_at_unix_time: string;
  created_at_timestamp: string;
  created_at: string;
  updated_at: string;
  updated_at_timestamp: string;
  description: string | null;
  user: ModalFullBlock_block_Text_user | null;
  source: ModalFullBlock_block_Text_source | null;
  shareable_href: string;
  shareable_title: string;
  editable_title: string;
  editable_description: string | null;
  content: string;
  raw: string;
  can: ModalFullBlock_block_Text_can;
  /**
   * URL to find the original image on various services
   */
  find_original_url: string | null;
  editable_content: string;
}

export interface ModalFullBlock_block_Link_user {
  __typename: "User";
  id: number;
  name: string;
  href: string;
}

export interface ModalFullBlock_block_Link_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
  provider_name: string | null;
  provider_url: string | null;
}

export interface ModalFullBlock_block_Link_can {
  __typename: "BlockCan";
  manage: boolean;
  comment: boolean;
  mute: boolean;
  potentially_edit_thumbnail: boolean;
  edit_thumbnail: boolean;
}

export interface ModalFullBlock_block_Link {
  __typename: "Link";
  id: number;
  title: string;
  href: string;
  created_at_unix_time: string;
  created_at_timestamp: string;
  created_at: string;
  updated_at: string;
  updated_at_timestamp: string;
  description: string | null;
  user: ModalFullBlock_block_Link_user | null;
  source: ModalFullBlock_block_Link_source | null;
  shareable_href: string;
  shareable_title: string;
  editable_title: string;
  editable_description: string | null;
  source_url: string | null;
  image_url: string | null;
  image_updated_at: string | null;
  image_updated_at_unix_time: string | null;
  content: string | null;
  can: ModalFullBlock_block_Link_can;
}

export interface ModalFullBlock_block_Attachment_user {
  __typename: "User";
  id: number;
  name: string;
  href: string;
}

export interface ModalFullBlock_block_Attachment_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface ModalFullBlock_block_Attachment_can {
  __typename: "BlockCan";
  manage: boolean;
  comment: boolean;
  mute: boolean;
  potentially_edit_thumbnail: boolean;
  edit_thumbnail: boolean;
}

export interface ModalFullBlock_block_Attachment {
  __typename: "Attachment";
  id: number;
  title: string;
  href: string;
  created_at_unix_time: string;
  created_at_timestamp: string;
  created_at: string;
  updated_at: string;
  updated_at_timestamp: string;
  description: string | null;
  user: ModalFullBlock_block_Attachment_user | null;
  source: ModalFullBlock_block_Attachment_source | null;
  shareable_href: string;
  shareable_title: string;
  editable_title: string;
  editable_description: string | null;
  file_extension: string | null;
  file_url: string | null;
  file_size: string | null;
  file_content_type: string | null;
  image_url: string | null;
  image_updated_at: string | null;
  image_updated_at_unix_time: string | null;
  can: ModalFullBlock_block_Attachment_can;
}

export interface ModalFullBlock_block_Embed_user {
  __typename: "User";
  id: number;
  name: string;
  href: string;
}

export interface ModalFullBlock_block_Embed_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface ModalFullBlock_block_Embed_can {
  __typename: "BlockCan";
  manage: boolean;
  comment: boolean;
  mute: boolean;
  potentially_edit_thumbnail: boolean;
  edit_thumbnail: boolean;
}

export interface ModalFullBlock_block_Embed {
  __typename: "Embed";
  id: number;
  title: string;
  href: string;
  created_at_unix_time: string;
  created_at_timestamp: string;
  created_at: string;
  updated_at: string;
  updated_at_timestamp: string;
  description: string | null;
  user: ModalFullBlock_block_Embed_user | null;
  source: ModalFullBlock_block_Embed_source | null;
  shareable_href: string;
  shareable_title: string;
  editable_title: string;
  editable_description: string | null;
  embed_html: string | null;
  embed_width: number | null;
  embed_height: number | null;
  can: ModalFullBlock_block_Embed_can;
}

export interface ModalFullBlock_block_PendingBlock_user {
  __typename: "User";
  id: number;
  name: string;
  href: string;
}

export interface ModalFullBlock_block_PendingBlock_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface ModalFullBlock_block_PendingBlock_can {
  __typename: "BlockCan";
  manage: boolean;
  comment: boolean;
  mute: boolean;
  potentially_edit_thumbnail: boolean;
  edit_thumbnail: boolean;
}

export interface ModalFullBlock_block_PendingBlock {
  __typename: "PendingBlock";
  id: number;
  title: string;
  href: string;
  created_at_unix_time: string;
  created_at_timestamp: string;
  created_at: string;
  updated_at: string;
  updated_at_timestamp: string;
  description: string | null;
  user: ModalFullBlock_block_PendingBlock_user | null;
  source: ModalFullBlock_block_PendingBlock_source | null;
  shareable_href: string;
  shareable_title: string;
  editable_title: string;
  editable_description: string | null;
  can: ModalFullBlock_block_PendingBlock_can;
}

export type ModalFullBlock_block = ModalFullBlock_block_Channel | ModalFullBlock_block_Image | ModalFullBlock_block_Text | ModalFullBlock_block_Link | ModalFullBlock_block_Attachment | ModalFullBlock_block_Embed | ModalFullBlock_block_PendingBlock;

export interface ModalFullBlock {
  block: ModalFullBlock_block | null;
}

export interface ModalFullBlockVariables {
  id: string;
}
