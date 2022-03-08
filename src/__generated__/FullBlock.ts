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
  href: string | null;
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
  href: string | null;
  created_at_unix_time: string | null;
  created_at_timestamp: string | null;
  created_at: string | null;
  updated_at: string | null;
  updated_at_timestamp: string | null;
  description: string | null;
  user: FullBlock_Channel_user | null;
  source: FullBlock_Channel_source | null;
  shareable_href: string | null;
  shareable_title: string;
  editable_title: string;
  editable_description: string | null;
}

export interface FullBlock_Image_user {
  __typename: "User";
  id: number;
  name: string;
  href: string | null;
}

export interface FullBlock_Image_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface FullBlock_Image_can {
  __typename: "BlockCan";
  manage: boolean | null;
  comment: boolean | null;
  mute: boolean | null;
  potentially_edit_thumbnail: boolean | null;
  edit_thumbnail: boolean | null;
}

export interface FullBlock_Image {
  __typename: "Image";
  id: number;
  title: string;
  href: string | null;
  thumb_url: string | null;
  image_url: string | null;
  original_image_url: string | null;
  created_at_unix_time: string | null;
  created_at_timestamp: string | null;
  created_at: string | null;
  updated_at: string | null;
  updated_at_timestamp: string | null;
  description: string | null;
  user: FullBlock_Image_user | null;
  source: FullBlock_Image_source | null;
  shareable_href: string | null;
  shareable_title: string;
  editable_title: string;
  editable_description: string | null;
  can: FullBlock_Image_can | null;
  find_original_url: string | null;
  downloadable_image: string | null;
  editable_alt_text: string | null;
}

export interface FullBlock_Text_can {
  __typename: "BlockCan";
  manage: boolean | null;
  comment: boolean | null;
  mute: boolean | null;
  potentially_edit_thumbnail: boolean | null;
  edit_thumbnail: boolean | null;
}

export interface FullBlock_Text_user {
  __typename: "User";
  id: number;
  name: string;
  href: string | null;
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
  href: string | null;
  content: string;
  can: FullBlock_Text_can | null;
  created_at_unix_time: string | null;
  created_at_timestamp: string | null;
  created_at: string | null;
  updated_at: string | null;
  updated_at_timestamp: string | null;
  description: string | null;
  user: FullBlock_Text_user | null;
  source: FullBlock_Text_source | null;
  shareable_href: string | null;
  shareable_title: string;
  editable_title: string;
  editable_description: string | null;
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
  href: string | null;
}

export interface FullBlock_Link_can {
  __typename: "BlockCan";
  manage: boolean | null;
  comment: boolean | null;
  mute: boolean | null;
  potentially_edit_thumbnail: boolean | null;
  edit_thumbnail: boolean | null;
}

export interface FullBlock_Link {
  __typename: "Link";
  id: number;
  title: string;
  href: string | null;
  source_url: string | null;
  image_url: string | null;
  image_updated_at: string | null;
  image_updated_at_unix_time: string | null;
  source: FullBlock_Link_source | null;
  created_at_unix_time: string | null;
  created_at_timestamp: string | null;
  created_at: string | null;
  updated_at: string | null;
  updated_at_timestamp: string | null;
  description: string | null;
  user: FullBlock_Link_user | null;
  shareable_href: string | null;
  shareable_title: string;
  editable_title: string;
  editable_description: string | null;
  can: FullBlock_Link_can | null;
}

export interface FullBlock_Attachment_user {
  __typename: "User";
  id: number;
  name: string;
  href: string | null;
}

export interface FullBlock_Attachment_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface FullBlock_Attachment_can {
  __typename: "BlockCan";
  manage: boolean | null;
  comment: boolean | null;
  mute: boolean | null;
  potentially_edit_thumbnail: boolean | null;
  edit_thumbnail: boolean | null;
}

export interface FullBlock_Attachment {
  __typename: "Attachment";
  id: number;
  title: string;
  href: string | null;
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
  user: FullBlock_Attachment_user | null;
  source: FullBlock_Attachment_source | null;
  shareable_href: string | null;
  shareable_title: string;
  editable_title: string;
  editable_description: string | null;
  can: FullBlock_Attachment_can | null;
}

export interface FullBlock_Embed_user {
  __typename: "User";
  id: number;
  name: string;
  href: string | null;
}

export interface FullBlock_Embed_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface FullBlock_Embed_can {
  __typename: "BlockCan";
  manage: boolean | null;
  comment: boolean | null;
  mute: boolean | null;
  potentially_edit_thumbnail: boolean | null;
  edit_thumbnail: boolean | null;
}

export interface FullBlock_Embed {
  __typename: "Embed";
  id: number;
  title: string;
  href: string | null;
  embed_html: string | null;
  embed_width: number | null;
  embed_height: number | null;
  created_at_unix_time: string | null;
  created_at_timestamp: string | null;
  created_at: string | null;
  updated_at: string | null;
  updated_at_timestamp: string | null;
  description: string | null;
  user: FullBlock_Embed_user | null;
  source: FullBlock_Embed_source | null;
  shareable_href: string | null;
  shareable_title: string;
  editable_title: string;
  editable_description: string | null;
  can: FullBlock_Embed_can | null;
}

export interface FullBlock_PendingBlock_user {
  __typename: "User";
  id: number;
  name: string;
  href: string | null;
}

export interface FullBlock_PendingBlock_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface FullBlock_PendingBlock_can {
  __typename: "BlockCan";
  manage: boolean | null;
  comment: boolean | null;
  mute: boolean | null;
  potentially_edit_thumbnail: boolean | null;
  edit_thumbnail: boolean | null;
}

export interface FullBlock_PendingBlock {
  __typename: "PendingBlock";
  id: number;
  title: string;
  href: string | null;
  created_at_unix_time: string | null;
  created_at_timestamp: string | null;
  created_at: string | null;
  updated_at: string | null;
  updated_at_timestamp: string | null;
  description: string | null;
  user: FullBlock_PendingBlock_user | null;
  source: FullBlock_PendingBlock_source | null;
  shareable_href: string | null;
  shareable_title: string;
  editable_title: string;
  editable_description: string | null;
  can: FullBlock_PendingBlock_can | null;
}

export type FullBlock = FullBlock_Channel | FullBlock_Image | FullBlock_Text | FullBlock_Link | FullBlock_Attachment | FullBlock_Embed | FullBlock_PendingBlock;
