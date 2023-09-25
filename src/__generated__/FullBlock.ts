/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FullBlock
// ====================================================

export interface FullBlock_Channel_user {
  __typename: "User";
  id: number;
  name: string;
  href: string;
}

export interface FullBlock_Channel_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface FullBlock_Channel {
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
  user: FullBlock_Channel_user;
  source: FullBlock_Channel_source | null;
  shareable_href: string;
  shareable_title: string;
  editable_title: string;
  editable_description: string | null;
}

export interface FullBlock_Image_user {
  __typename: "User";
  id: number;
  name: string;
  href: string;
}

export interface FullBlock_Image_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface FullBlock_Image_can {
  __typename: "BlockCan";
  manage: boolean;
  comment: boolean;
  mute: boolean;
  potentially_edit_thumbnail: boolean;
  edit_thumbnail: boolean;
}

export interface FullBlock_Image {
  __typename: "Image";
  id: number;
  title: string;
  href: string;
  thumb_url: string | null;
  image_url: string | null;
  original_image_url: string | null;
  alt_text: string | null;
  created_at_unix_time: string;
  created_at_timestamp: string;
  created_at: string;
  updated_at: string;
  updated_at_timestamp: string;
  description: string | null;
  user: FullBlock_Image_user;
  source: FullBlock_Image_source | null;
  shareable_href: string;
  shareable_title: string;
  editable_title: string;
  editable_description: string | null;
  can: FullBlock_Image_can;
  /**
   * URL to find the original image on various services
   */
  find_original_url: string | null;
  downloadable_image: string | null;
  editable_alt_text: string | null;
}

export interface FullBlock_Text_can {
  __typename: "BlockCan";
  manage: boolean;
  comment: boolean;
  mute: boolean;
  potentially_edit_thumbnail: boolean;
  edit_thumbnail: boolean;
}

export interface FullBlock_Text_user {
  __typename: "User";
  id: number;
  name: string;
  href: string;
}

export interface FullBlock_Text_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface FullBlock_Text {
  __typename: "Text";
  id: number;
  title: string;
  href: string;
  content: string;
  raw: string;
  can: FullBlock_Text_can;
  created_at_unix_time: string;
  created_at_timestamp: string;
  created_at: string;
  updated_at: string;
  updated_at_timestamp: string;
  description: string | null;
  user: FullBlock_Text_user;
  source: FullBlock_Text_source | null;
  shareable_href: string;
  shareable_title: string;
  editable_title: string;
  editable_description: string | null;
  /**
   * URL to find the original image on various services
   */
  find_original_url: string | null;
  editable_content: string;
}

export interface FullBlock_Link_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
  provider_name: string | null;
  provider_url: string | null;
}

export interface FullBlock_Link_user {
  __typename: "User";
  id: number;
  name: string;
  href: string;
}

export interface FullBlock_Link_can {
  __typename: "BlockCan";
  manage: boolean;
  comment: boolean;
  mute: boolean;
  potentially_edit_thumbnail: boolean;
  edit_thumbnail: boolean;
}

export interface FullBlock_Link {
  __typename: "Link";
  id: number;
  title: string;
  href: string;
  source_url: string | null;
  image_url: string | null;
  image_updated_at: string | null;
  image_updated_at_unix_time: string | null;
  content: string | null;
  source: FullBlock_Link_source | null;
  created_at_unix_time: string;
  created_at_timestamp: string;
  created_at: string;
  updated_at: string;
  updated_at_timestamp: string;
  description: string | null;
  user: FullBlock_Link_user;
  shareable_href: string;
  shareable_title: string;
  editable_title: string;
  editable_description: string | null;
  can: FullBlock_Link_can;
}

export interface FullBlock_Attachment_user {
  __typename: "User";
  id: number;
  name: string;
  href: string;
}

export interface FullBlock_Attachment_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface FullBlock_Attachment_can {
  __typename: "BlockCan";
  manage: boolean;
  comment: boolean;
  mute: boolean;
  potentially_edit_thumbnail: boolean;
  edit_thumbnail: boolean;
}

export interface FullBlock_Attachment {
  __typename: "Attachment";
  id: number;
  title: string;
  href: string;
  file_extension: string | null;
  file_url: string | null;
  file_size: string | null;
  file_content_type: string | null;
  image_url: string | null;
  image_updated_at: string | null;
  image_updated_at_unix_time: string | null;
  created_at_unix_time: string;
  created_at_timestamp: string;
  created_at: string;
  updated_at: string;
  updated_at_timestamp: string;
  description: string | null;
  user: FullBlock_Attachment_user;
  source: FullBlock_Attachment_source | null;
  shareable_href: string;
  shareable_title: string;
  editable_title: string;
  editable_description: string | null;
  can: FullBlock_Attachment_can;
}

export interface FullBlock_Embed_user {
  __typename: "User";
  id: number;
  name: string;
  href: string;
}

export interface FullBlock_Embed_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface FullBlock_Embed_can {
  __typename: "BlockCan";
  manage: boolean;
  comment: boolean;
  mute: boolean;
  potentially_edit_thumbnail: boolean;
  edit_thumbnail: boolean;
}

export interface FullBlock_Embed {
  __typename: "Embed";
  id: number;
  title: string;
  href: string;
  embed_html: string | null;
  embed_width: number | null;
  embed_height: number | null;
  created_at_unix_time: string;
  created_at_timestamp: string;
  created_at: string;
  updated_at: string;
  updated_at_timestamp: string;
  description: string | null;
  user: FullBlock_Embed_user;
  source: FullBlock_Embed_source | null;
  shareable_href: string;
  shareable_title: string;
  editable_title: string;
  editable_description: string | null;
  can: FullBlock_Embed_can;
}

export interface FullBlock_PendingBlock_user {
  __typename: "User";
  id: number;
  name: string;
  href: string;
}

export interface FullBlock_PendingBlock_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface FullBlock_PendingBlock_can {
  __typename: "BlockCan";
  manage: boolean;
  comment: boolean;
  mute: boolean;
  potentially_edit_thumbnail: boolean;
  edit_thumbnail: boolean;
}

export interface FullBlock_PendingBlock {
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
  user: FullBlock_PendingBlock_user;
  source: FullBlock_PendingBlock_source | null;
  shareable_href: string;
  shareable_title: string;
  editable_title: string;
  editable_description: string | null;
  can: FullBlock_PendingBlock_can;
}

export type FullBlock = FullBlock_Channel | FullBlock_Image | FullBlock_Text | FullBlock_Link | FullBlock_Attachment | FullBlock_Embed | FullBlock_PendingBlock;
