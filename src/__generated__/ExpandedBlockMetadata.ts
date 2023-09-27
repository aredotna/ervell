/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ExpandedBlockMetadata
// ====================================================

export interface ExpandedBlockMetadata_block_Channel_user {
  __typename: "User";
  id: number;
  name: string;
  href: string;
}

export interface ExpandedBlockMetadata_block_Channel_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface ExpandedBlockMetadata_block_Channel {
  __typename: "Channel";
  id: number;
  created_at_unix_time: string;
  created_at_timestamp: string;
  created_at: string;
  updated_at: string;
  updated_at_timestamp: string;
  title: string;
  description: string | null;
  href: string;
  user: ExpandedBlockMetadata_block_Channel_user;
  source: ExpandedBlockMetadata_block_Channel_source | null;
  shareable_href: string;
  shareable_title: string;
  editable_title: string;
  editable_description: string | null;
}

export interface ExpandedBlockMetadata_block_Attachment_user {
  __typename: "User";
  id: number;
  name: string;
  href: string;
}

export interface ExpandedBlockMetadata_block_Attachment_can {
  __typename: "BlockCan";
  manage: boolean;
  comment: boolean;
  mute: boolean;
  potentially_edit_thumbnail: boolean;
  edit_thumbnail: boolean;
}

export interface ExpandedBlockMetadata_block_Attachment_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface ExpandedBlockMetadata_block_Attachment {
  __typename: "Attachment" | "Embed" | "Link" | "PendingBlock";
  id: number;
  created_at_unix_time: string;
  created_at_timestamp: string;
  created_at: string;
  updated_at: string;
  updated_at_timestamp: string;
  title: string;
  description: string | null;
  href: string;
  user: ExpandedBlockMetadata_block_Attachment_user;
  can: ExpandedBlockMetadata_block_Attachment_can;
  source: ExpandedBlockMetadata_block_Attachment_source | null;
  shareable_href: string;
  shareable_title: string;
  editable_title: string;
  editable_description: string | null;
}

export interface ExpandedBlockMetadata_block_Image_user {
  __typename: "User";
  id: number;
  name: string;
  href: string;
}

export interface ExpandedBlockMetadata_block_Image_can {
  __typename: "BlockCan";
  manage: boolean;
  comment: boolean;
  mute: boolean;
  potentially_edit_thumbnail: boolean;
  edit_thumbnail: boolean;
}

export interface ExpandedBlockMetadata_block_Image_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface ExpandedBlockMetadata_block_Image {
  __typename: "Image";
  id: number;
  created_at_unix_time: string;
  created_at_timestamp: string;
  created_at: string;
  updated_at: string;
  updated_at_timestamp: string;
  title: string;
  description: string | null;
  href: string;
  user: ExpandedBlockMetadata_block_Image_user;
  can: ExpandedBlockMetadata_block_Image_can;
  thumb_url: string | null;
  image_url: string | null;
  original_image_url: string | null;
  source: ExpandedBlockMetadata_block_Image_source | null;
  shareable_href: string;
  shareable_title: string;
  /**
   * URL to find the original image on various services
   */
  find_original_url: string | null;
  downloadable_image: string | null;
  editable_title: string;
  editable_description: string | null;
  editable_alt_text: string | null;
}

export interface ExpandedBlockMetadata_block_Text_user {
  __typename: "User";
  id: number;
  name: string;
  href: string;
}

export interface ExpandedBlockMetadata_block_Text_can {
  __typename: "BlockCan";
  manage: boolean;
  comment: boolean;
  mute: boolean;
  potentially_edit_thumbnail: boolean;
  edit_thumbnail: boolean;
}

export interface ExpandedBlockMetadata_block_Text_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface ExpandedBlockMetadata_block_Text {
  __typename: "Text";
  id: number;
  created_at_unix_time: string;
  created_at_timestamp: string;
  created_at: string;
  updated_at: string;
  updated_at_timestamp: string;
  title: string;
  description: string | null;
  href: string;
  user: ExpandedBlockMetadata_block_Text_user;
  can: ExpandedBlockMetadata_block_Text_can;
  content: string;
  source: ExpandedBlockMetadata_block_Text_source | null;
  shareable_href: string;
  shareable_title: string;
  /**
   * URL to find the original image on various services
   */
  find_original_url: string | null;
  editable_title: string;
  editable_description: string | null;
  editable_content: string;
}

export type ExpandedBlockMetadata_block = ExpandedBlockMetadata_block_Channel | ExpandedBlockMetadata_block_Attachment | ExpandedBlockMetadata_block_Image | ExpandedBlockMetadata_block_Text;

export interface ExpandedBlockMetadata {
  block: ExpandedBlockMetadata_block | null;
}

export interface ExpandedBlockMetadataVariables {
  id: string;
}
