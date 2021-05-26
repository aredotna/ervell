/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ChannelTableContentsSet
// ====================================================

export interface ChannelTableContentsSet_channel_blokks_Text_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface ChannelTableContentsSet_channel_blokks_Text_user {
  __typename: "User";
  name: string | null;
}

export interface ChannelTableContentsSet_channel_blokks_Text_connection_user {
  __typename: "User";
  name: string | null;
}

export interface ChannelTableContentsSet_channel_blokks_Text_connection {
  __typename: "Connection";
  position: number | null;
  created_at: string | null;
  user: ChannelTableContentsSet_channel_blokks_Text_connection_user | null;
}

export interface ChannelTableContentsSet_channel_blokks_Text {
  __typename: "Text";
  counts: ChannelTableContentsSet_channel_blokks_Text_counts | null;
  created_at: string | null;
  updated_at: string | null;
  content: string | null;
  title: string | null;
  user: ChannelTableContentsSet_channel_blokks_Text_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelTableContentsSet_channel_blokks_Text_connection | null;
}

export interface ChannelTableContentsSet_channel_blokks_Image_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface ChannelTableContentsSet_channel_blokks_Image_source {
  __typename: "ConnectableSource";
  url: string | null;
  provider_url: string | null;
}

export interface ChannelTableContentsSet_channel_blokks_Image_user {
  __typename: "User";
  name: string | null;
}

export interface ChannelTableContentsSet_channel_blokks_Image_connection_user {
  __typename: "User";
  name: string | null;
}

export interface ChannelTableContentsSet_channel_blokks_Image_connection {
  __typename: "Connection";
  position: number | null;
  created_at: string | null;
  user: ChannelTableContentsSet_channel_blokks_Image_connection_user | null;
}

export interface ChannelTableContentsSet_channel_blokks_Image {
  __typename: "Image";
  counts: ChannelTableContentsSet_channel_blokks_Image_counts | null;
  created_at: string | null;
  updated_at: string | null;
  image_url: string | null;
  source: ChannelTableContentsSet_channel_blokks_Image_source | null;
  title: string | null;
  user: ChannelTableContentsSet_channel_blokks_Image_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelTableContentsSet_channel_blokks_Image_connection | null;
}

export interface ChannelTableContentsSet_channel_blokks_Link_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface ChannelTableContentsSet_channel_blokks_Link_source {
  __typename: "ConnectableSource";
  url: string | null;
  provider_url: string | null;
}

export interface ChannelTableContentsSet_channel_blokks_Link_user {
  __typename: "User";
  name: string | null;
}

export interface ChannelTableContentsSet_channel_blokks_Link_connection_user {
  __typename: "User";
  name: string | null;
}

export interface ChannelTableContentsSet_channel_blokks_Link_connection {
  __typename: "Connection";
  position: number | null;
  created_at: string | null;
  user: ChannelTableContentsSet_channel_blokks_Link_connection_user | null;
}

export interface ChannelTableContentsSet_channel_blokks_Link {
  __typename: "Link";
  counts: ChannelTableContentsSet_channel_blokks_Link_counts | null;
  created_at: string | null;
  updated_at: string | null;
  image_url: string | null;
  source: ChannelTableContentsSet_channel_blokks_Link_source | null;
  title: string | null;
  user: ChannelTableContentsSet_channel_blokks_Link_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelTableContentsSet_channel_blokks_Link_connection | null;
}

export interface ChannelTableContentsSet_channel_blokks_Embed_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface ChannelTableContentsSet_channel_blokks_Embed_source {
  __typename: "ConnectableSource";
  url: string | null;
  provider_url: string | null;
}

export interface ChannelTableContentsSet_channel_blokks_Embed_user {
  __typename: "User";
  name: string | null;
}

export interface ChannelTableContentsSet_channel_blokks_Embed_connection_user {
  __typename: "User";
  name: string | null;
}

export interface ChannelTableContentsSet_channel_blokks_Embed_connection {
  __typename: "Connection";
  position: number | null;
  created_at: string | null;
  user: ChannelTableContentsSet_channel_blokks_Embed_connection_user | null;
}

export interface ChannelTableContentsSet_channel_blokks_Embed {
  __typename: "Embed";
  counts: ChannelTableContentsSet_channel_blokks_Embed_counts | null;
  created_at: string | null;
  updated_at: string | null;
  embed_html: string | null;
  image_url: string | null;
  source: ChannelTableContentsSet_channel_blokks_Embed_source | null;
  title: string | null;
  user: ChannelTableContentsSet_channel_blokks_Embed_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelTableContentsSet_channel_blokks_Embed_connection | null;
}

export interface ChannelTableContentsSet_channel_blokks_Attachment_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface ChannelTableContentsSet_channel_blokks_Attachment_source {
  __typename: "ConnectableSource";
  url: string | null;
  provider_url: string | null;
}

export interface ChannelTableContentsSet_channel_blokks_Attachment_user {
  __typename: "User";
  name: string | null;
}

export interface ChannelTableContentsSet_channel_blokks_Attachment_connection_user {
  __typename: "User";
  name: string | null;
}

export interface ChannelTableContentsSet_channel_blokks_Attachment_connection {
  __typename: "Connection";
  position: number | null;
  created_at: string | null;
  user: ChannelTableContentsSet_channel_blokks_Attachment_connection_user | null;
}

export interface ChannelTableContentsSet_channel_blokks_Attachment {
  __typename: "Attachment";
  counts: ChannelTableContentsSet_channel_blokks_Attachment_counts | null;
  created_at: string | null;
  updated_at: string | null;
  file_url: string | null;
  image_url: string | null;
  source: ChannelTableContentsSet_channel_blokks_Attachment_source | null;
  title: string | null;
  user: ChannelTableContentsSet_channel_blokks_Attachment_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelTableContentsSet_channel_blokks_Attachment_connection | null;
}

export interface ChannelTableContentsSet_channel_blokks_PendingBlock_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface ChannelTableContentsSet_channel_blokks_PendingBlock_user {
  __typename: "User";
  name: string | null;
}

export interface ChannelTableContentsSet_channel_blokks_PendingBlock_connection_user {
  __typename: "User";
  name: string | null;
}

export interface ChannelTableContentsSet_channel_blokks_PendingBlock_connection {
  __typename: "Connection";
  position: number | null;
  created_at: string | null;
  user: ChannelTableContentsSet_channel_blokks_PendingBlock_connection_user | null;
}

export interface ChannelTableContentsSet_channel_blokks_PendingBlock {
  __typename: "PendingBlock";
  counts: ChannelTableContentsSet_channel_blokks_PendingBlock_counts | null;
  created_at: string | null;
  updated_at: string | null;
  title: string | null;
  user: ChannelTableContentsSet_channel_blokks_PendingBlock_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelTableContentsSet_channel_blokks_PendingBlock_connection | null;
}

export interface ChannelTableContentsSet_channel_blokks_Channel_counts {
  __typename: "ChannelCounts";
  connected_to_channels: number | null;
  contents: number | null;
}

export interface ChannelTableContentsSet_channel_blokks_Channel_user {
  __typename: "User";
  name: string | null;
}

export interface ChannelTableContentsSet_channel_blokks_Channel_connection_user {
  __typename: "User";
  name: string | null;
}

export interface ChannelTableContentsSet_channel_blokks_Channel_connection {
  __typename: "Connection";
  position: number | null;
  created_at: string | null;
  user: ChannelTableContentsSet_channel_blokks_Channel_connection_user | null;
}

export interface ChannelTableContentsSet_channel_blokks_Channel {
  __typename: "Channel";
  visibility: string | null;
  title: string | null;
  counts: ChannelTableContentsSet_channel_blokks_Channel_counts | null;
  created_at: string | null;
  updated_at: string | null;
  user: ChannelTableContentsSet_channel_blokks_Channel_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelTableContentsSet_channel_blokks_Channel_connection | null;
}

export type ChannelTableContentsSet_channel_blokks = ChannelTableContentsSet_channel_blokks_Text | ChannelTableContentsSet_channel_blokks_Image | ChannelTableContentsSet_channel_blokks_Link | ChannelTableContentsSet_channel_blokks_Embed | ChannelTableContentsSet_channel_blokks_Attachment | ChannelTableContentsSet_channel_blokks_PendingBlock | ChannelTableContentsSet_channel_blokks_Channel;

export interface ChannelTableContentsSet_channel {
  __typename: "Channel";
  id: number | null;
  blokks: (ChannelTableContentsSet_channel_blokks | null)[] | null;
}

export interface ChannelTableContentsSet {
  /**
   * A single channel
   */
  channel: ChannelTableContentsSet_channel | null;
}

export interface ChannelTableContentsSetVariables {
  id: string;
}
