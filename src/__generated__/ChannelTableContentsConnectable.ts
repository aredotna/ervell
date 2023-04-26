/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ChannelTableContentsConnectable
// ====================================================

export interface ChannelTableContentsConnectable_Attachment_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface ChannelTableContentsConnectable_Attachment_source {
  __typename: "ConnectableSource";
  url: string | null;
  provider_url: string | null;
}

export interface ChannelTableContentsConnectable_Attachment_user {
  __typename: "User";
  name: string;
}

export interface ChannelTableContentsConnectable_Attachment_connection_can {
  __typename: "ConnectionCan";
  manage: boolean;
}

export interface ChannelTableContentsConnectable_Attachment_connection_user {
  __typename: "User";
  name: string;
}

export interface ChannelTableContentsConnectable_Attachment_connection {
  __typename: "Connection";
  position: number;
  selected: boolean;
  id: number;
  created_at: string;
  can: ChannelTableContentsConnectable_Attachment_connection_can;
  user: ChannelTableContentsConnectable_Attachment_connection_user | null;
}

export interface ChannelTableContentsConnectable_Attachment {
  __typename: "Attachment";
  id: number;
  counts: ChannelTableContentsConnectable_Attachment_counts | null;
  created_at: string;
  updated_at: string;
  file_url: string | null;
  image_url: string | null;
  source: ChannelTableContentsConnectable_Attachment_source | null;
  title: string;
  user: ChannelTableContentsConnectable_Attachment_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelTableContentsConnectable_Attachment_connection | null;
}

export interface ChannelTableContentsConnectable_Embed_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface ChannelTableContentsConnectable_Embed_source {
  __typename: "ConnectableSource";
  url: string | null;
  provider_url: string | null;
}

export interface ChannelTableContentsConnectable_Embed_user {
  __typename: "User";
  name: string;
}

export interface ChannelTableContentsConnectable_Embed_connection_can {
  __typename: "ConnectionCan";
  manage: boolean;
}

export interface ChannelTableContentsConnectable_Embed_connection_user {
  __typename: "User";
  name: string;
}

export interface ChannelTableContentsConnectable_Embed_connection {
  __typename: "Connection";
  position: number;
  selected: boolean;
  id: number;
  created_at: string;
  can: ChannelTableContentsConnectable_Embed_connection_can;
  user: ChannelTableContentsConnectable_Embed_connection_user | null;
}

export interface ChannelTableContentsConnectable_Embed {
  __typename: "Embed";
  id: number;
  counts: ChannelTableContentsConnectable_Embed_counts | null;
  created_at: string;
  updated_at: string;
  embed_html: string | null;
  image_url: string | null;
  source: ChannelTableContentsConnectable_Embed_source | null;
  title: string;
  user: ChannelTableContentsConnectable_Embed_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelTableContentsConnectable_Embed_connection | null;
}

export interface ChannelTableContentsConnectable_Image_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface ChannelTableContentsConnectable_Image_source {
  __typename: "ConnectableSource";
  url: string | null;
  provider_url: string | null;
}

export interface ChannelTableContentsConnectable_Image_user {
  __typename: "User";
  name: string;
}

export interface ChannelTableContentsConnectable_Image_connection_can {
  __typename: "ConnectionCan";
  manage: boolean;
}

export interface ChannelTableContentsConnectable_Image_connection_user {
  __typename: "User";
  name: string;
}

export interface ChannelTableContentsConnectable_Image_connection {
  __typename: "Connection";
  position: number;
  selected: boolean;
  id: number;
  created_at: string;
  can: ChannelTableContentsConnectable_Image_connection_can;
  user: ChannelTableContentsConnectable_Image_connection_user | null;
}

export interface ChannelTableContentsConnectable_Image {
  __typename: "Image";
  id: number;
  counts: ChannelTableContentsConnectable_Image_counts | null;
  created_at: string;
  updated_at: string;
  image_url: string | null;
  source: ChannelTableContentsConnectable_Image_source | null;
  title: string;
  user: ChannelTableContentsConnectable_Image_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelTableContentsConnectable_Image_connection | null;
}

export interface ChannelTableContentsConnectable_Link_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface ChannelTableContentsConnectable_Link_source {
  __typename: "ConnectableSource";
  url: string | null;
  provider_url: string | null;
}

export interface ChannelTableContentsConnectable_Link_user {
  __typename: "User";
  name: string;
}

export interface ChannelTableContentsConnectable_Link_connection_can {
  __typename: "ConnectionCan";
  manage: boolean;
}

export interface ChannelTableContentsConnectable_Link_connection_user {
  __typename: "User";
  name: string;
}

export interface ChannelTableContentsConnectable_Link_connection {
  __typename: "Connection";
  position: number;
  selected: boolean;
  id: number;
  created_at: string;
  can: ChannelTableContentsConnectable_Link_connection_can;
  user: ChannelTableContentsConnectable_Link_connection_user | null;
}

export interface ChannelTableContentsConnectable_Link {
  __typename: "Link";
  id: number;
  counts: ChannelTableContentsConnectable_Link_counts | null;
  created_at: string;
  updated_at: string;
  image_url: string | null;
  source: ChannelTableContentsConnectable_Link_source | null;
  title: string;
  user: ChannelTableContentsConnectable_Link_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelTableContentsConnectable_Link_connection | null;
}

export interface ChannelTableContentsConnectable_PendingBlock_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface ChannelTableContentsConnectable_PendingBlock_user {
  __typename: "User";
  name: string;
}

export interface ChannelTableContentsConnectable_PendingBlock_connection_can {
  __typename: "ConnectionCan";
  manage: boolean;
}

export interface ChannelTableContentsConnectable_PendingBlock_connection_user {
  __typename: "User";
  name: string;
}

export interface ChannelTableContentsConnectable_PendingBlock_connection {
  __typename: "Connection";
  position: number;
  selected: boolean;
  id: number;
  created_at: string;
  can: ChannelTableContentsConnectable_PendingBlock_connection_can;
  user: ChannelTableContentsConnectable_PendingBlock_connection_user | null;
}

export interface ChannelTableContentsConnectable_PendingBlock {
  __typename: "PendingBlock";
  id: number;
  counts: ChannelTableContentsConnectable_PendingBlock_counts | null;
  created_at: string;
  updated_at: string;
  title: string;
  user: ChannelTableContentsConnectable_PendingBlock_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelTableContentsConnectable_PendingBlock_connection | null;
}

export interface ChannelTableContentsConnectable_Text_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface ChannelTableContentsConnectable_Text_user {
  __typename: "User";
  name: string;
}

export interface ChannelTableContentsConnectable_Text_connection_can {
  __typename: "ConnectionCan";
  manage: boolean;
}

export interface ChannelTableContentsConnectable_Text_connection_user {
  __typename: "User";
  name: string;
}

export interface ChannelTableContentsConnectable_Text_connection {
  __typename: "Connection";
  position: number;
  selected: boolean;
  id: number;
  created_at: string;
  can: ChannelTableContentsConnectable_Text_connection_can;
  user: ChannelTableContentsConnectable_Text_connection_user | null;
}

export interface ChannelTableContentsConnectable_Text {
  __typename: "Text";
  id: number;
  counts: ChannelTableContentsConnectable_Text_counts | null;
  created_at: string;
  updated_at: string;
  content: string;
  html: string;
  title: string;
  user: ChannelTableContentsConnectable_Text_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelTableContentsConnectable_Text_connection | null;
}

export interface ChannelTableContentsConnectable_Channel_counts {
  __typename: "ChannelCounts";
  connected_to_channels: number;
  contents: number;
}

export interface ChannelTableContentsConnectable_Channel_user {
  __typename: "User";
  name: string;
}

export interface ChannelTableContentsConnectable_Channel_connection_can {
  __typename: "ConnectionCan";
  manage: boolean;
}

export interface ChannelTableContentsConnectable_Channel_connection_user {
  __typename: "User";
  name: string;
}

export interface ChannelTableContentsConnectable_Channel_connection {
  __typename: "Connection";
  position: number;
  selected: boolean;
  id: number;
  created_at: string;
  can: ChannelTableContentsConnectable_Channel_connection_can;
  user: ChannelTableContentsConnectable_Channel_connection_user | null;
}

export interface ChannelTableContentsConnectable_Channel {
  __typename: "Channel";
  id: number;
  visibility: string;
  title: string;
  counts: ChannelTableContentsConnectable_Channel_counts;
  created_at: string;
  updated_at: string;
  user: ChannelTableContentsConnectable_Channel_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelTableContentsConnectable_Channel_connection | null;
}

export type ChannelTableContentsConnectable = ChannelTableContentsConnectable_Attachment | ChannelTableContentsConnectable_Embed | ChannelTableContentsConnectable_Image | ChannelTableContentsConnectable_Link | ChannelTableContentsConnectable_PendingBlock | ChannelTableContentsConnectable_Text | ChannelTableContentsConnectable_Channel;
