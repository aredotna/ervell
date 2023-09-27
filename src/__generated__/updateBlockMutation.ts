/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateBlockMutation
// ====================================================

export interface updateBlockMutation_update_block_block_Channel_user {
  __typename: "User";
  id: number;
  name: string;
  href: string;
}

export interface updateBlockMutation_update_block_block_Channel_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface updateBlockMutation_update_block_block_Channel {
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
  user: updateBlockMutation_update_block_block_Channel_user;
  source: updateBlockMutation_update_block_block_Channel_source | null;
  shareable_href: string;
  shareable_title: string;
  editable_title: string;
  editable_description: string | null;
}

export interface updateBlockMutation_update_block_block_Image_user {
  __typename: "User";
  id: number;
  name: string;
  href: string;
}

export interface updateBlockMutation_update_block_block_Image_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface updateBlockMutation_update_block_block_Image_can {
  __typename: "BlockCan";
  manage: boolean;
  comment: boolean;
  mute: boolean;
  potentially_edit_thumbnail: boolean;
  edit_thumbnail: boolean;
}

export interface updateBlockMutation_update_block_block_Image {
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
  user: updateBlockMutation_update_block_block_Image_user;
  source: updateBlockMutation_update_block_block_Image_source | null;
  shareable_href: string;
  shareable_title: string;
  editable_title: string;
  editable_description: string | null;
  thumb_url: string | null;
  image_url: string | null;
  original_image_url: string | null;
  alt_text: string | null;
  can: updateBlockMutation_update_block_block_Image_can;
  /**
   * URL to find the original image on various services
   */
  find_original_url: string | null;
  downloadable_image: string | null;
  editable_alt_text: string | null;
}

export interface updateBlockMutation_update_block_block_Text_user {
  __typename: "User";
  id: number;
  name: string;
  href: string;
}

export interface updateBlockMutation_update_block_block_Text_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface updateBlockMutation_update_block_block_Text_can {
  __typename: "BlockCan";
  manage: boolean;
  comment: boolean;
  mute: boolean;
  potentially_edit_thumbnail: boolean;
  edit_thumbnail: boolean;
}

export interface updateBlockMutation_update_block_block_Text {
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
  user: updateBlockMutation_update_block_block_Text_user;
  source: updateBlockMutation_update_block_block_Text_source | null;
  shareable_href: string;
  shareable_title: string;
  editable_title: string;
  editable_description: string | null;
  content: string;
  raw: string;
  can: updateBlockMutation_update_block_block_Text_can;
  /**
   * URL to find the original image on various services
   */
  find_original_url: string | null;
  editable_content: string;
}

export interface updateBlockMutation_update_block_block_Link_user {
  __typename: "User";
  id: number;
  name: string;
  href: string;
}

export interface updateBlockMutation_update_block_block_Link_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
  provider_name: string | null;
  provider_url: string | null;
}

export interface updateBlockMutation_update_block_block_Link_can {
  __typename: "BlockCan";
  manage: boolean;
  comment: boolean;
  mute: boolean;
  potentially_edit_thumbnail: boolean;
  edit_thumbnail: boolean;
}

export interface updateBlockMutation_update_block_block_Link {
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
  user: updateBlockMutation_update_block_block_Link_user;
  source: updateBlockMutation_update_block_block_Link_source | null;
  shareable_href: string;
  shareable_title: string;
  editable_title: string;
  editable_description: string | null;
  source_url: string | null;
  image_url: string | null;
  image_updated_at: string | null;
  image_updated_at_unix_time: string | null;
  content: string | null;
  can: updateBlockMutation_update_block_block_Link_can;
}

export interface updateBlockMutation_update_block_block_Attachment_user {
  __typename: "User";
  id: number;
  name: string;
  href: string;
}

export interface updateBlockMutation_update_block_block_Attachment_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface updateBlockMutation_update_block_block_Attachment_can {
  __typename: "BlockCan";
  manage: boolean;
  comment: boolean;
  mute: boolean;
  potentially_edit_thumbnail: boolean;
  edit_thumbnail: boolean;
}

export interface updateBlockMutation_update_block_block_Attachment {
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
  user: updateBlockMutation_update_block_block_Attachment_user;
  source: updateBlockMutation_update_block_block_Attachment_source | null;
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
  can: updateBlockMutation_update_block_block_Attachment_can;
}

export interface updateBlockMutation_update_block_block_Embed_user {
  __typename: "User";
  id: number;
  name: string;
  href: string;
}

export interface updateBlockMutation_update_block_block_Embed_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface updateBlockMutation_update_block_block_Embed_can {
  __typename: "BlockCan";
  manage: boolean;
  comment: boolean;
  mute: boolean;
  potentially_edit_thumbnail: boolean;
  edit_thumbnail: boolean;
}

export interface updateBlockMutation_update_block_block_Embed {
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
  user: updateBlockMutation_update_block_block_Embed_user;
  source: updateBlockMutation_update_block_block_Embed_source | null;
  shareable_href: string;
  shareable_title: string;
  editable_title: string;
  editable_description: string | null;
  embed_html: string | null;
  embed_width: number | null;
  embed_height: number | null;
  can: updateBlockMutation_update_block_block_Embed_can;
}

export interface updateBlockMutation_update_block_block_PendingBlock_user {
  __typename: "User";
  id: number;
  name: string;
  href: string;
}

export interface updateBlockMutation_update_block_block_PendingBlock_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface updateBlockMutation_update_block_block_PendingBlock_can {
  __typename: "BlockCan";
  manage: boolean;
  comment: boolean;
  mute: boolean;
  potentially_edit_thumbnail: boolean;
  edit_thumbnail: boolean;
}

export interface updateBlockMutation_update_block_block_PendingBlock {
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
  user: updateBlockMutation_update_block_block_PendingBlock_user;
  source: updateBlockMutation_update_block_block_PendingBlock_source | null;
  shareable_href: string;
  shareable_title: string;
  editable_title: string;
  editable_description: string | null;
  can: updateBlockMutation_update_block_block_PendingBlock_can;
}

export type updateBlockMutation_update_block_block = updateBlockMutation_update_block_block_Channel | updateBlockMutation_update_block_block_Image | updateBlockMutation_update_block_block_Text | updateBlockMutation_update_block_block_Link | updateBlockMutation_update_block_block_Attachment | updateBlockMutation_update_block_block_Embed | updateBlockMutation_update_block_block_PendingBlock;

export interface updateBlockMutation_update_block {
  __typename: "UpdateBlockMutationPayload";
  block: updateBlockMutation_update_block_block;
}

export interface updateBlockMutation {
  update_block: updateBlockMutation_update_block | null;
}

export interface updateBlockMutationVariables {
  id: string;
  title?: string | null;
  description?: string | null;
  content?: string | null;
  alt_text?: string | null;
}
