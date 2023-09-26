/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ChannelContentsFiltered
// ====================================================

export interface ChannelContentsFiltered_channel_filtered_contents_Attachment_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelContentsFiltered_channel_filtered_contents_Attachment_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelContentsFiltered_channel_filtered_contents_Attachment_connection {
  __typename: "Connection";
  created_at: string;
  user: ChannelContentsFiltered_channel_filtered_contents_Attachment_connection_user | null;
}

export interface ChannelContentsFiltered_channel_filtered_contents_Attachment_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelContentsFiltered_channel_filtered_contents_Attachment_counts {
  __typename: "BlockCounts";
  comments: number;
}

export interface ChannelContentsFiltered_channel_filtered_contents_Attachment {
  __typename: "Attachment";
  id: number;
  href: string;
  updated_at: string;
  title: string;
  user: ChannelContentsFiltered_channel_filtered_contents_Attachment_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelContentsFiltered_channel_filtered_contents_Attachment_connection | null;
  source: ChannelContentsFiltered_channel_filtered_contents_Attachment_source | null;
  counts: ChannelContentsFiltered_channel_filtered_contents_Attachment_counts;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  file_extension: string | null;
}

export interface ChannelContentsFiltered_channel_filtered_contents_Embed_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelContentsFiltered_channel_filtered_contents_Embed_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelContentsFiltered_channel_filtered_contents_Embed_connection {
  __typename: "Connection";
  created_at: string;
  user: ChannelContentsFiltered_channel_filtered_contents_Embed_connection_user | null;
}

export interface ChannelContentsFiltered_channel_filtered_contents_Embed_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelContentsFiltered_channel_filtered_contents_Embed_counts {
  __typename: "BlockCounts";
  comments: number;
}

export interface ChannelContentsFiltered_channel_filtered_contents_Embed {
  __typename: "Embed";
  id: number;
  href: string;
  updated_at: string;
  title: string;
  user: ChannelContentsFiltered_channel_filtered_contents_Embed_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelContentsFiltered_channel_filtered_contents_Embed_connection | null;
  source: ChannelContentsFiltered_channel_filtered_contents_Embed_source | null;
  counts: ChannelContentsFiltered_channel_filtered_contents_Embed_counts;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
}

export interface ChannelContentsFiltered_channel_filtered_contents_Image_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelContentsFiltered_channel_filtered_contents_Image_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelContentsFiltered_channel_filtered_contents_Image_connection {
  __typename: "Connection";
  created_at: string;
  user: ChannelContentsFiltered_channel_filtered_contents_Image_connection_user | null;
}

export interface ChannelContentsFiltered_channel_filtered_contents_Image_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelContentsFiltered_channel_filtered_contents_Image_counts {
  __typename: "BlockCounts";
  comments: number;
}

export interface ChannelContentsFiltered_channel_filtered_contents_Image_original_dimensions {
  __typename: "Dimensions";
  width: number | null;
  height: number | null;
}

export interface ChannelContentsFiltered_channel_filtered_contents_Image {
  __typename: "Image";
  id: number;
  href: string;
  updated_at: string;
  title: string;
  user: ChannelContentsFiltered_channel_filtered_contents_Image_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelContentsFiltered_channel_filtered_contents_Image_connection | null;
  source: ChannelContentsFiltered_channel_filtered_contents_Image_source | null;
  counts: ChannelContentsFiltered_channel_filtered_contents_Image_counts;
  alt_text: string | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  original_dimensions: ChannelContentsFiltered_channel_filtered_contents_Image_original_dimensions | null;
}

export interface ChannelContentsFiltered_channel_filtered_contents_Link_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelContentsFiltered_channel_filtered_contents_Link_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelContentsFiltered_channel_filtered_contents_Link_connection {
  __typename: "Connection";
  created_at: string;
  user: ChannelContentsFiltered_channel_filtered_contents_Link_connection_user | null;
}

export interface ChannelContentsFiltered_channel_filtered_contents_Link_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelContentsFiltered_channel_filtered_contents_Link_counts {
  __typename: "BlockCounts";
  comments: number;
}

export interface ChannelContentsFiltered_channel_filtered_contents_Link {
  __typename: "Link";
  id: number;
  href: string;
  updated_at: string;
  title: string;
  user: ChannelContentsFiltered_channel_filtered_contents_Link_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelContentsFiltered_channel_filtered_contents_Link_connection | null;
  source: ChannelContentsFiltered_channel_filtered_contents_Link_source | null;
  counts: ChannelContentsFiltered_channel_filtered_contents_Link_counts;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  external_url: string | null;
  content: string | null;
  source_url: string | null;
}

export interface ChannelContentsFiltered_channel_filtered_contents_PendingBlock_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelContentsFiltered_channel_filtered_contents_PendingBlock_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelContentsFiltered_channel_filtered_contents_PendingBlock_connection {
  __typename: "Connection";
  created_at: string;
  user: ChannelContentsFiltered_channel_filtered_contents_PendingBlock_connection_user | null;
}

export interface ChannelContentsFiltered_channel_filtered_contents_PendingBlock_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelContentsFiltered_channel_filtered_contents_PendingBlock_counts {
  __typename: "BlockCounts";
  comments: number;
}

export interface ChannelContentsFiltered_channel_filtered_contents_PendingBlock {
  __typename: "PendingBlock";
  id: number;
  href: string;
  updated_at: string;
  title: string;
  user: ChannelContentsFiltered_channel_filtered_contents_PendingBlock_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelContentsFiltered_channel_filtered_contents_PendingBlock_connection | null;
  source: ChannelContentsFiltered_channel_filtered_contents_PendingBlock_source | null;
  counts: ChannelContentsFiltered_channel_filtered_contents_PendingBlock_counts;
}

export interface ChannelContentsFiltered_channel_filtered_contents_Text_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelContentsFiltered_channel_filtered_contents_Text_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelContentsFiltered_channel_filtered_contents_Text_connection {
  __typename: "Connection";
  created_at: string;
  user: ChannelContentsFiltered_channel_filtered_contents_Text_connection_user | null;
}

export interface ChannelContentsFiltered_channel_filtered_contents_Text_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelContentsFiltered_channel_filtered_contents_Text_counts {
  __typename: "BlockCounts";
  comments: number;
}

export interface ChannelContentsFiltered_channel_filtered_contents_Text {
  __typename: "Text";
  id: number;
  href: string;
  updated_at: string;
  title: string;
  user: ChannelContentsFiltered_channel_filtered_contents_Text_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelContentsFiltered_channel_filtered_contents_Text_connection | null;
  source: ChannelContentsFiltered_channel_filtered_contents_Text_source | null;
  counts: ChannelContentsFiltered_channel_filtered_contents_Text_counts;
  content: string;
  raw: string;
}

export interface ChannelContentsFiltered_channel_filtered_contents_Channel_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelContentsFiltered_channel_filtered_contents_Channel_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelContentsFiltered_channel_filtered_contents_Channel_connection {
  __typename: "Connection";
  created_at: string;
  user: ChannelContentsFiltered_channel_filtered_contents_Channel_connection_user | null;
}

export interface ChannelContentsFiltered_channel_filtered_contents_Channel_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelContentsFiltered_channel_filtered_contents_Channel_counts {
  __typename: "ChannelCounts";
  contents: number;
}

export interface ChannelContentsFiltered_channel_filtered_contents_Channel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface ChannelContentsFiltered_channel_filtered_contents_Channel_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type ChannelContentsFiltered_channel_filtered_contents_Channel_owner = ChannelContentsFiltered_channel_filtered_contents_Channel_owner_Group | ChannelContentsFiltered_channel_filtered_contents_Channel_owner_User;

export interface ChannelContentsFiltered_channel_filtered_contents_Channel {
  __typename: "Channel";
  id: number;
  href: string;
  updated_at: string;
  title: string;
  user: ChannelContentsFiltered_channel_filtered_contents_Channel_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelContentsFiltered_channel_filtered_contents_Channel_connection | null;
  source: ChannelContentsFiltered_channel_filtered_contents_Channel_source | null;
  truncatedTitle: string;
  visibility: string;
  counts: ChannelContentsFiltered_channel_filtered_contents_Channel_counts;
  owner: ChannelContentsFiltered_channel_filtered_contents_Channel_owner;
  label: string;
}

export type ChannelContentsFiltered_channel_filtered_contents = ChannelContentsFiltered_channel_filtered_contents_Attachment | ChannelContentsFiltered_channel_filtered_contents_Embed | ChannelContentsFiltered_channel_filtered_contents_Image | ChannelContentsFiltered_channel_filtered_contents_Link | ChannelContentsFiltered_channel_filtered_contents_PendingBlock | ChannelContentsFiltered_channel_filtered_contents_Text | ChannelContentsFiltered_channel_filtered_contents_Channel;

export interface ChannelContentsFiltered_channel {
  __typename: "Channel";
  id: number;
  filtered_contents: ChannelContentsFiltered_channel_filtered_contents[];
}

export interface ChannelContentsFiltered {
  /**
   * A single channel
   */
  channel: ChannelContentsFiltered_channel | null;
}

export interface ChannelContentsFilteredVariables {
  channelId: string;
  query: string;
}
