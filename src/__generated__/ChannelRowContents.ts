/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ChannelRowContents
// ====================================================

export interface ChannelRowContents_channel_blokks_Attachment_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelRowContents_channel_blokks_Attachment_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelRowContents_channel_blokks_Attachment_connection {
  __typename: "Connection";
  created_at: string;
  user: ChannelRowContents_channel_blokks_Attachment_connection_user | null;
}

export interface ChannelRowContents_channel_blokks_Attachment_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelRowContents_channel_blokks_Attachment_counts {
  __typename: "BlockCounts";
  comments: number;
}

export interface ChannelRowContents_channel_blokks_Attachment {
  __typename: "Attachment";
  id: number;
  href: string;
  updated_at: string;
  title: string;
  user: ChannelRowContents_channel_blokks_Attachment_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelRowContents_channel_blokks_Attachment_connection | null;
  source: ChannelRowContents_channel_blokks_Attachment_source | null;
  counts: ChannelRowContents_channel_blokks_Attachment_counts;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  file_extension: string | null;
}

export interface ChannelRowContents_channel_blokks_Embed_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelRowContents_channel_blokks_Embed_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelRowContents_channel_blokks_Embed_connection {
  __typename: "Connection";
  created_at: string;
  user: ChannelRowContents_channel_blokks_Embed_connection_user | null;
}

export interface ChannelRowContents_channel_blokks_Embed_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelRowContents_channel_blokks_Embed_counts {
  __typename: "BlockCounts";
  comments: number;
}

export interface ChannelRowContents_channel_blokks_Embed {
  __typename: "Embed";
  id: number;
  href: string;
  updated_at: string;
  title: string;
  user: ChannelRowContents_channel_blokks_Embed_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelRowContents_channel_blokks_Embed_connection | null;
  source: ChannelRowContents_channel_blokks_Embed_source | null;
  counts: ChannelRowContents_channel_blokks_Embed_counts;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
}

export interface ChannelRowContents_channel_blokks_Image_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelRowContents_channel_blokks_Image_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelRowContents_channel_blokks_Image_connection {
  __typename: "Connection";
  created_at: string;
  user: ChannelRowContents_channel_blokks_Image_connection_user | null;
}

export interface ChannelRowContents_channel_blokks_Image_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelRowContents_channel_blokks_Image_counts {
  __typename: "BlockCounts";
  comments: number;
}

export interface ChannelRowContents_channel_blokks_Image_original_dimensions {
  __typename: "Dimensions";
  width: number | null;
  height: number | null;
}

export interface ChannelRowContents_channel_blokks_Image {
  __typename: "Image";
  id: number;
  href: string;
  updated_at: string;
  title: string;
  user: ChannelRowContents_channel_blokks_Image_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelRowContents_channel_blokks_Image_connection | null;
  source: ChannelRowContents_channel_blokks_Image_source | null;
  counts: ChannelRowContents_channel_blokks_Image_counts;
  alt_text: string | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  original_dimensions: ChannelRowContents_channel_blokks_Image_original_dimensions | null;
}

export interface ChannelRowContents_channel_blokks_Link_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelRowContents_channel_blokks_Link_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelRowContents_channel_blokks_Link_connection {
  __typename: "Connection";
  created_at: string;
  user: ChannelRowContents_channel_blokks_Link_connection_user | null;
}

export interface ChannelRowContents_channel_blokks_Link_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelRowContents_channel_blokks_Link_counts {
  __typename: "BlockCounts";
  comments: number;
}

export interface ChannelRowContents_channel_blokks_Link {
  __typename: "Link";
  id: number;
  href: string;
  updated_at: string;
  title: string;
  user: ChannelRowContents_channel_blokks_Link_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelRowContents_channel_blokks_Link_connection | null;
  source: ChannelRowContents_channel_blokks_Link_source | null;
  counts: ChannelRowContents_channel_blokks_Link_counts;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  external_url: string | null;
  content: string | null;
  source_url: string | null;
}

export interface ChannelRowContents_channel_blokks_PendingBlock_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelRowContents_channel_blokks_PendingBlock_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelRowContents_channel_blokks_PendingBlock_connection {
  __typename: "Connection";
  created_at: string;
  user: ChannelRowContents_channel_blokks_PendingBlock_connection_user | null;
}

export interface ChannelRowContents_channel_blokks_PendingBlock_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelRowContents_channel_blokks_PendingBlock_counts {
  __typename: "BlockCounts";
  comments: number;
}

export interface ChannelRowContents_channel_blokks_PendingBlock {
  __typename: "PendingBlock";
  id: number;
  href: string;
  updated_at: string;
  title: string;
  user: ChannelRowContents_channel_blokks_PendingBlock_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelRowContents_channel_blokks_PendingBlock_connection | null;
  source: ChannelRowContents_channel_blokks_PendingBlock_source | null;
  counts: ChannelRowContents_channel_blokks_PendingBlock_counts;
}

export interface ChannelRowContents_channel_blokks_Text_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelRowContents_channel_blokks_Text_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelRowContents_channel_blokks_Text_connection {
  __typename: "Connection";
  created_at: string;
  user: ChannelRowContents_channel_blokks_Text_connection_user | null;
}

export interface ChannelRowContents_channel_blokks_Text_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelRowContents_channel_blokks_Text_counts {
  __typename: "BlockCounts";
  comments: number;
}

export interface ChannelRowContents_channel_blokks_Text {
  __typename: "Text";
  id: number;
  href: string;
  updated_at: string;
  title: string;
  user: ChannelRowContents_channel_blokks_Text_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelRowContents_channel_blokks_Text_connection | null;
  source: ChannelRowContents_channel_blokks_Text_source | null;
  counts: ChannelRowContents_channel_blokks_Text_counts;
  content: string;
  raw: string;
}

export interface ChannelRowContents_channel_blokks_Channel_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelRowContents_channel_blokks_Channel_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelRowContents_channel_blokks_Channel_connection {
  __typename: "Connection";
  created_at: string;
  user: ChannelRowContents_channel_blokks_Channel_connection_user | null;
}

export interface ChannelRowContents_channel_blokks_Channel_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelRowContents_channel_blokks_Channel_counts {
  __typename: "ChannelCounts";
  contents: number;
}

export interface ChannelRowContents_channel_blokks_Channel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface ChannelRowContents_channel_blokks_Channel_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type ChannelRowContents_channel_blokks_Channel_owner = ChannelRowContents_channel_blokks_Channel_owner_Group | ChannelRowContents_channel_blokks_Channel_owner_User;

export interface ChannelRowContents_channel_blokks_Channel {
  __typename: "Channel";
  id: number;
  href: string;
  updated_at: string;
  title: string;
  user: ChannelRowContents_channel_blokks_Channel_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelRowContents_channel_blokks_Channel_connection | null;
  source: ChannelRowContents_channel_blokks_Channel_source | null;
  truncatedTitle: string;
  visibility: string;
  counts: ChannelRowContents_channel_blokks_Channel_counts;
  owner: ChannelRowContents_channel_blokks_Channel_owner;
  label: string;
}

export type ChannelRowContents_channel_blokks = ChannelRowContents_channel_blokks_Attachment | ChannelRowContents_channel_blokks_Embed | ChannelRowContents_channel_blokks_Image | ChannelRowContents_channel_blokks_Link | ChannelRowContents_channel_blokks_PendingBlock | ChannelRowContents_channel_blokks_Text | ChannelRowContents_channel_blokks_Channel;

export interface ChannelRowContents_channel {
  __typename: "Channel";
  id: number;
  blokks: ChannelRowContents_channel_blokks[];
}

export interface ChannelRowContents {
  /**
   * A single channel
   */
  channel: ChannelRowContents_channel | null;
}

export interface ChannelRowContentsVariables {
  id: string;
}
