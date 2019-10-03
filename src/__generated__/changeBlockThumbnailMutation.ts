/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: changeBlockThumbnailMutation
// ====================================================

export interface changeBlockThumbnailMutation_update_block_thumbnail_blokk_Channel_user {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
}

export interface changeBlockThumbnailMutation_update_block_thumbnail_blokk_Channel_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface changeBlockThumbnailMutation_update_block_thumbnail_blokk_Channel {
  __typename: "Channel";
  id: number | null;
  title: string | null;
  created_at_timestamp: string | null;
  created_at: string | null;
  updated_at: string | null;
  updated_at_timestamp: string | null;
  description: string | null;
  user: changeBlockThumbnailMutation_update_block_thumbnail_blokk_Channel_user | null;
  source: changeBlockThumbnailMutation_update_block_thumbnail_blokk_Channel_source | null;
  shareable_href: string | null;
  shareable_title: string | null;
  editable_title: string | null;
  editable_description: string | null;
}

export interface changeBlockThumbnailMutation_update_block_thumbnail_blokk_Image_user {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
}

export interface changeBlockThumbnailMutation_update_block_thumbnail_blokk_Image_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface changeBlockThumbnailMutation_update_block_thumbnail_blokk_Image_can {
  __typename: "BlockCan";
  manage: boolean | null;
  comment: boolean | null;
  mute: boolean | null;
  potentially_edit_thumbnail: boolean | null;
  edit_thumbnail: boolean | null;
}

export interface changeBlockThumbnailMutation_update_block_thumbnail_blokk_Image {
  __typename: "Image";
  id: number | null;
  title: string | null;
  thumb_url: string | null;
  image_url: string | null;
  original_image_url: string | null;
  created_at_timestamp: string | null;
  created_at: string | null;
  updated_at: string | null;
  updated_at_timestamp: string | null;
  description: string | null;
  user: changeBlockThumbnailMutation_update_block_thumbnail_blokk_Image_user | null;
  source: changeBlockThumbnailMutation_update_block_thumbnail_blokk_Image_source | null;
  shareable_href: string | null;
  shareable_title: string | null;
  editable_title: string | null;
  editable_description: string | null;
  can: changeBlockThumbnailMutation_update_block_thumbnail_blokk_Image_can | null;
  find_original_url: string | null;
}

export interface changeBlockThumbnailMutation_update_block_thumbnail_blokk_Text_can {
  __typename: "BlockCan";
  manage: boolean | null;
  comment: boolean | null;
  mute: boolean | null;
  potentially_edit_thumbnail: boolean | null;
  edit_thumbnail: boolean | null;
}

export interface changeBlockThumbnailMutation_update_block_thumbnail_blokk_Text_user {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
}

export interface changeBlockThumbnailMutation_update_block_thumbnail_blokk_Text_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface changeBlockThumbnailMutation_update_block_thumbnail_blokk_Text {
  __typename: "Text";
  id: number | null;
  title: string | null;
  content: string | null;
  can: changeBlockThumbnailMutation_update_block_thumbnail_blokk_Text_can | null;
  created_at_timestamp: string | null;
  created_at: string | null;
  updated_at: string | null;
  updated_at_timestamp: string | null;
  description: string | null;
  user: changeBlockThumbnailMutation_update_block_thumbnail_blokk_Text_user | null;
  source: changeBlockThumbnailMutation_update_block_thumbnail_blokk_Text_source | null;
  shareable_href: string | null;
  shareable_title: string | null;
  editable_title: string | null;
  editable_description: string | null;
  find_original_url: string | null;
  editable_content: string | null;
}

export interface changeBlockThumbnailMutation_update_block_thumbnail_blokk_Link_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
  provider_name: string | null;
  provider_url: string | null;
}

export interface changeBlockThumbnailMutation_update_block_thumbnail_blokk_Link_user {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
}

export interface changeBlockThumbnailMutation_update_block_thumbnail_blokk_Link_can {
  __typename: "BlockCan";
  manage: boolean | null;
  comment: boolean | null;
  mute: boolean | null;
  potentially_edit_thumbnail: boolean | null;
  edit_thumbnail: boolean | null;
}

export interface changeBlockThumbnailMutation_update_block_thumbnail_blokk_Link {
  __typename: "Link";
  id: number | null;
  title: string | null;
  source_url: string | null;
  image_url: string | null;
  source: changeBlockThumbnailMutation_update_block_thumbnail_blokk_Link_source | null;
  created_at_timestamp: string | null;
  created_at: string | null;
  updated_at: string | null;
  updated_at_timestamp: string | null;
  description: string | null;
  user: changeBlockThumbnailMutation_update_block_thumbnail_blokk_Link_user | null;
  shareable_href: string | null;
  shareable_title: string | null;
  editable_title: string | null;
  editable_description: string | null;
  can: changeBlockThumbnailMutation_update_block_thumbnail_blokk_Link_can | null;
}

export interface changeBlockThumbnailMutation_update_block_thumbnail_blokk_Attachment_user {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
}

export interface changeBlockThumbnailMutation_update_block_thumbnail_blokk_Attachment_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface changeBlockThumbnailMutation_update_block_thumbnail_blokk_Attachment_can {
  __typename: "BlockCan";
  manage: boolean | null;
  comment: boolean | null;
  mute: boolean | null;
  potentially_edit_thumbnail: boolean | null;
  edit_thumbnail: boolean | null;
}

export interface changeBlockThumbnailMutation_update_block_thumbnail_blokk_Attachment {
  __typename: "Attachment";
  id: number | null;
  title: string | null;
  file_extension: string | null;
  file_url: string | null;
  file_size: string | null;
  file_content_type: string | null;
  image_url: string | null;
  created_at_timestamp: string | null;
  created_at: string | null;
  updated_at: string | null;
  updated_at_timestamp: string | null;
  description: string | null;
  user: changeBlockThumbnailMutation_update_block_thumbnail_blokk_Attachment_user | null;
  source: changeBlockThumbnailMutation_update_block_thumbnail_blokk_Attachment_source | null;
  shareable_href: string | null;
  shareable_title: string | null;
  editable_title: string | null;
  editable_description: string | null;
  can: changeBlockThumbnailMutation_update_block_thumbnail_blokk_Attachment_can | null;
}

export interface changeBlockThumbnailMutation_update_block_thumbnail_blokk_Embed_user {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
}

export interface changeBlockThumbnailMutation_update_block_thumbnail_blokk_Embed_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface changeBlockThumbnailMutation_update_block_thumbnail_blokk_Embed_can {
  __typename: "BlockCan";
  manage: boolean | null;
  comment: boolean | null;
  mute: boolean | null;
  potentially_edit_thumbnail: boolean | null;
  edit_thumbnail: boolean | null;
}

export interface changeBlockThumbnailMutation_update_block_thumbnail_blokk_Embed {
  __typename: "Embed";
  id: number | null;
  title: string | null;
  embed_html: string | null;
  embed_width: number | null;
  embed_height: number | null;
  created_at_timestamp: string | null;
  created_at: string | null;
  updated_at: string | null;
  updated_at_timestamp: string | null;
  description: string | null;
  user: changeBlockThumbnailMutation_update_block_thumbnail_blokk_Embed_user | null;
  source: changeBlockThumbnailMutation_update_block_thumbnail_blokk_Embed_source | null;
  shareable_href: string | null;
  shareable_title: string | null;
  editable_title: string | null;
  editable_description: string | null;
  can: changeBlockThumbnailMutation_update_block_thumbnail_blokk_Embed_can | null;
}

export interface changeBlockThumbnailMutation_update_block_thumbnail_blokk_PendingBlock_user {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
}

export interface changeBlockThumbnailMutation_update_block_thumbnail_blokk_PendingBlock_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface changeBlockThumbnailMutation_update_block_thumbnail_blokk_PendingBlock_can {
  __typename: "BlockCan";
  manage: boolean | null;
  comment: boolean | null;
  mute: boolean | null;
  potentially_edit_thumbnail: boolean | null;
  edit_thumbnail: boolean | null;
}

export interface changeBlockThumbnailMutation_update_block_thumbnail_blokk_PendingBlock {
  __typename: "PendingBlock";
  id: number | null;
  title: string | null;
  created_at_timestamp: string | null;
  created_at: string | null;
  updated_at: string | null;
  updated_at_timestamp: string | null;
  description: string | null;
  user: changeBlockThumbnailMutation_update_block_thumbnail_blokk_PendingBlock_user | null;
  source: changeBlockThumbnailMutation_update_block_thumbnail_blokk_PendingBlock_source | null;
  shareable_href: string | null;
  shareable_title: string | null;
  editable_title: string | null;
  editable_description: string | null;
  can: changeBlockThumbnailMutation_update_block_thumbnail_blokk_PendingBlock_can | null;
}

export type changeBlockThumbnailMutation_update_block_thumbnail_blokk = changeBlockThumbnailMutation_update_block_thumbnail_blokk_Channel | changeBlockThumbnailMutation_update_block_thumbnail_blokk_Image | changeBlockThumbnailMutation_update_block_thumbnail_blokk_Text | changeBlockThumbnailMutation_update_block_thumbnail_blokk_Link | changeBlockThumbnailMutation_update_block_thumbnail_blokk_Attachment | changeBlockThumbnailMutation_update_block_thumbnail_blokk_Embed | changeBlockThumbnailMutation_update_block_thumbnail_blokk_PendingBlock;

export interface changeBlockThumbnailMutation_update_block_thumbnail {
  __typename: "UpdateBlockThumbnailPayload";
  blokk: changeBlockThumbnailMutation_update_block_thumbnail_blokk | null;
}

export interface changeBlockThumbnailMutation {
  update_block_thumbnail: changeBlockThumbnailMutation_update_block_thumbnail | null;
}

export interface changeBlockThumbnailMutationVariables {
  id: string;
  image_url: string;
}
