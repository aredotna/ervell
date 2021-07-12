/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ExpandedBlockMetadata
// ====================================================

export interface ExpandedBlockMetadata_block_Channel_user {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
}

export interface ExpandedBlockMetadata_block_Channel_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface ExpandedBlockMetadata_block_Channel {
  __typename: "Channel";
  created_at_unix_time: string | null;
  created_at_timestamp: string | null;
  created_at: string | null;
  updated_at: string | null;
  updated_at_timestamp: string | null;
  title: string | null;
  description: string | null;
  user: ExpandedBlockMetadata_block_Channel_user | null;
  source: ExpandedBlockMetadata_block_Channel_source | null;
  shareable_href: string | null;
  shareable_title: string | null;
  id: number | null;
  editable_title: string | null;
  editable_description: string | null;
}

export interface ExpandedBlockMetadata_block_Text_user {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
}

export interface ExpandedBlockMetadata_block_Text_can {
  __typename: "BlockCan";
  manage: boolean | null;
  comment: boolean | null;
  mute: boolean | null;
  potentially_edit_thumbnail: boolean | null;
  edit_thumbnail: boolean | null;
}

export interface ExpandedBlockMetadata_block_Text_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface ExpandedBlockMetadata_block_Text {
  __typename: "Text";
  created_at_unix_time: string | null;
  created_at_timestamp: string | null;
  created_at: string | null;
  updated_at: string | null;
  updated_at_timestamp: string | null;
  title: string | null;
  description: string | null;
  user: ExpandedBlockMetadata_block_Text_user | null;
  can: ExpandedBlockMetadata_block_Text_can | null;
  content: string | null;
  source: ExpandedBlockMetadata_block_Text_source | null;
  shareable_href: string | null;
  shareable_title: string | null;
  find_original_url: string | null;
  id: number | null;
  editable_title: string | null;
  editable_description: string | null;
  editable_content: string | null;
}

export interface ExpandedBlockMetadata_block_Image_user {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
}

export interface ExpandedBlockMetadata_block_Image_can {
  __typename: "BlockCan";
  manage: boolean | null;
  comment: boolean | null;
  mute: boolean | null;
  potentially_edit_thumbnail: boolean | null;
  edit_thumbnail: boolean | null;
}

export interface ExpandedBlockMetadata_block_Image_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface ExpandedBlockMetadata_block_Image {
  __typename: "Image";
  created_at_unix_time: string | null;
  created_at_timestamp: string | null;
  created_at: string | null;
  updated_at: string | null;
  updated_at_timestamp: string | null;
  title: string | null;
  description: string | null;
  user: ExpandedBlockMetadata_block_Image_user | null;
  can: ExpandedBlockMetadata_block_Image_can | null;
  thumb_url: string | null;
  image_url: string | null;
  original_image_url: string | null;
  source: ExpandedBlockMetadata_block_Image_source | null;
  shareable_href: string | null;
  shareable_title: string | null;
  find_original_url: string | null;
  downloadable_image: string | null;
  id: number | null;
  editable_title: string | null;
  editable_description: string | null;
}

export interface ExpandedBlockMetadata_block_Link_user {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
}

export interface ExpandedBlockMetadata_block_Link_can {
  __typename: "BlockCan";
  manage: boolean | null;
  comment: boolean | null;
  mute: boolean | null;
  potentially_edit_thumbnail: boolean | null;
  edit_thumbnail: boolean | null;
}

export interface ExpandedBlockMetadata_block_Link_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface ExpandedBlockMetadata_block_Link {
  __typename: "Link" | "Embed" | "Attachment" | "PendingBlock";
  created_at_unix_time: string | null;
  created_at_timestamp: string | null;
  created_at: string | null;
  updated_at: string | null;
  updated_at_timestamp: string | null;
  title: string | null;
  description: string | null;
  user: ExpandedBlockMetadata_block_Link_user | null;
  can: ExpandedBlockMetadata_block_Link_can | null;
  source: ExpandedBlockMetadata_block_Link_source | null;
  shareable_href: string | null;
  shareable_title: string | null;
  id: number | null;
  editable_title: string | null;
  editable_description: string | null;
}

export type ExpandedBlockMetadata_block = ExpandedBlockMetadata_block_Channel | ExpandedBlockMetadata_block_Text | ExpandedBlockMetadata_block_Image | ExpandedBlockMetadata_block_Link;

export interface ExpandedBlockMetadata {
  block: ExpandedBlockMetadata_block | null;
}

export interface ExpandedBlockMetadataVariables {
  id: string;
}
