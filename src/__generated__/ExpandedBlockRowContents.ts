/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ExpandedBlockRowContents
// ====================================================

export interface ExpandedBlockRowContents_block_Channel {
  __typename: "Channel" | "PendingBlock";
  id: number;
  created_at_unix_time: string;
  created_at_timestamp: string;
  created_at: string;
  updated_at: string;
  updated_at_timestamp: string;
}

export interface ExpandedBlockRowContents_block_Text {
  __typename: "Text";
  id: number;
  created_at_unix_time: string;
  created_at_timestamp: string;
  created_at: string;
  updated_at: string;
  updated_at_timestamp: string;
  content: string;
}

export interface ExpandedBlockRowContents_block_Image {
  __typename: "Image";
  id: number;
  created_at_unix_time: string;
  created_at_timestamp: string;
  created_at: string;
  updated_at: string;
  updated_at_timestamp: string;
  thumb_url: string | null;
  image_url: string | null;
  original_image_url: string | null;
}

export interface ExpandedBlockRowContents_block_Attachment {
  __typename: "Attachment";
  id: number;
  created_at_unix_time: string;
  created_at_timestamp: string;
  created_at: string;
  updated_at: string;
  updated_at_timestamp: string;
  title: string;
  file_extension: string | null;
  file_url: string | null;
  file_size: string | null;
  file_content_type: string | null;
  image_url: string | null;
  image_updated_at: string | null;
  image_updated_at_unix_time: string | null;
}

export interface ExpandedBlockRowContents_block_Embed {
  __typename: "Embed";
  id: number;
  created_at_unix_time: string;
  created_at_timestamp: string;
  created_at: string;
  updated_at: string;
  updated_at_timestamp: string;
  title: string;
  embed_html: string | null;
  embed_width: number | null;
  embed_height: number | null;
}

export interface ExpandedBlockRowContents_block_Link_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
  provider_name: string | null;
  provider_url: string | null;
}

export interface ExpandedBlockRowContents_block_Link {
  __typename: "Link";
  id: number;
  created_at_unix_time: string;
  created_at_timestamp: string;
  created_at: string;
  updated_at: string;
  updated_at_timestamp: string;
  title: string;
  source_url: string | null;
  image_url: string | null;
  image_updated_at: string | null;
  image_updated_at_unix_time: string | null;
  content: string | null;
  source: ExpandedBlockRowContents_block_Link_source | null;
}

export type ExpandedBlockRowContents_block = ExpandedBlockRowContents_block_Channel | ExpandedBlockRowContents_block_Text | ExpandedBlockRowContents_block_Image | ExpandedBlockRowContents_block_Attachment | ExpandedBlockRowContents_block_Embed | ExpandedBlockRowContents_block_Link;

export interface ExpandedBlockRowContents {
  block: ExpandedBlockRowContents_block | null;
}

export interface ExpandedBlockRowContentsVariables {
  id: string;
}
