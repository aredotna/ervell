/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ChannelTableContentsConnectable
// ====================================================

export interface ChannelTableContentsConnectable_Attachment_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
  manage: boolean | null;
}

export interface ChannelTableContentsConnectable_Attachment_connection_user {
  __typename: "User";
  name: string;
}

export interface ChannelTableContentsConnectable_Attachment_connection {
  __typename: "Connection";
  can: ChannelTableContentsConnectable_Attachment_connection_can | null;
  position: number;
  selected: boolean;
  id: number;
  created_at: string | null;
  user: ChannelTableContentsConnectable_Attachment_connection_user | null;
}

export interface ChannelTableContentsConnectable_Attachment_can {
  __typename: "BlockCan";
  mute: boolean | null;
  remove: boolean | null;
}

export interface ChannelTableContentsConnectable_Attachment_source {
  __typename: "ConnectableSource";
  url: string | null;
  provider_url: string | null;
}

export interface ChannelTableContentsConnectable_Attachment_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface ChannelTableContentsConnectable_Attachment_user {
  __typename: "User";
  name: string;
}

export interface ChannelTableContentsConnectable_Attachment {
  __typename: "Attachment";
  id: number;
  href: string | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelTableContentsConnectable_Attachment_connection | null;
  can: ChannelTableContentsConnectable_Attachment_can | null;
  source: ChannelTableContentsConnectable_Attachment_source | null;
  counts: ChannelTableContentsConnectable_Attachment_counts | null;
  created_at: string | null;
  updated_at: string | null;
  file_url: string | null;
  image_url: string | null;
  title: string;
  user: ChannelTableContentsConnectable_Attachment_user | null;
}

export interface ChannelTableContentsConnectable_Embed_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
  manage: boolean | null;
}

export interface ChannelTableContentsConnectable_Embed_connection_user {
  __typename: "User";
  name: string;
}

export interface ChannelTableContentsConnectable_Embed_connection {
  __typename: "Connection";
  can: ChannelTableContentsConnectable_Embed_connection_can | null;
  position: number;
  selected: boolean;
  id: number;
  created_at: string | null;
  user: ChannelTableContentsConnectable_Embed_connection_user | null;
}

export interface ChannelTableContentsConnectable_Embed_can {
  __typename: "BlockCan";
  mute: boolean | null;
  remove: boolean | null;
}

export interface ChannelTableContentsConnectable_Embed_source {
  __typename: "ConnectableSource";
  url: string | null;
  provider_url: string | null;
}

export interface ChannelTableContentsConnectable_Embed_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface ChannelTableContentsConnectable_Embed_user {
  __typename: "User";
  name: string;
}

export interface ChannelTableContentsConnectable_Embed {
  __typename: "Embed";
  id: number;
  href: string | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelTableContentsConnectable_Embed_connection | null;
  can: ChannelTableContentsConnectable_Embed_can | null;
  source: ChannelTableContentsConnectable_Embed_source | null;
  counts: ChannelTableContentsConnectable_Embed_counts | null;
  created_at: string | null;
  updated_at: string | null;
  embed_html: string | null;
  image_url: string | null;
  title: string;
  user: ChannelTableContentsConnectable_Embed_user | null;
}

export interface ChannelTableContentsConnectable_Image_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
  manage: boolean | null;
}

export interface ChannelTableContentsConnectable_Image_connection_user {
  __typename: "User";
  name: string;
}

export interface ChannelTableContentsConnectable_Image_connection {
  __typename: "Connection";
  can: ChannelTableContentsConnectable_Image_connection_can | null;
  position: number;
  selected: boolean;
  id: number;
  created_at: string | null;
  user: ChannelTableContentsConnectable_Image_connection_user | null;
}

export interface ChannelTableContentsConnectable_Image_can {
  __typename: "BlockCan";
  mute: boolean | null;
  remove: boolean | null;
}

export interface ChannelTableContentsConnectable_Image_source {
  __typename: "ConnectableSource";
  url: string | null;
  provider_url: string | null;
}

export interface ChannelTableContentsConnectable_Image_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface ChannelTableContentsConnectable_Image_user {
  __typename: "User";
  name: string;
}

export interface ChannelTableContentsConnectable_Image {
  __typename: "Image";
  id: number;
  href: string | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelTableContentsConnectable_Image_connection | null;
  can: ChannelTableContentsConnectable_Image_can | null;
  source: ChannelTableContentsConnectable_Image_source | null;
  find_original_url: string | null;
  counts: ChannelTableContentsConnectable_Image_counts | null;
  created_at: string | null;
  updated_at: string | null;
  image_url: string | null;
  title: string;
  user: ChannelTableContentsConnectable_Image_user | null;
}

export interface ChannelTableContentsConnectable_Link_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
  manage: boolean | null;
}

export interface ChannelTableContentsConnectable_Link_connection_user {
  __typename: "User";
  name: string;
}

export interface ChannelTableContentsConnectable_Link_connection {
  __typename: "Connection";
  can: ChannelTableContentsConnectable_Link_connection_can | null;
  position: number;
  selected: boolean;
  id: number;
  created_at: string | null;
  user: ChannelTableContentsConnectable_Link_connection_user | null;
}

export interface ChannelTableContentsConnectable_Link_can {
  __typename: "BlockCan";
  mute: boolean | null;
  remove: boolean | null;
}

export interface ChannelTableContentsConnectable_Link_source {
  __typename: "ConnectableSource";
  url: string | null;
  provider_url: string | null;
}

export interface ChannelTableContentsConnectable_Link_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface ChannelTableContentsConnectable_Link_user {
  __typename: "User";
  name: string;
}

export interface ChannelTableContentsConnectable_Link {
  __typename: "Link";
  id: number;
  href: string | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelTableContentsConnectable_Link_connection | null;
  can: ChannelTableContentsConnectable_Link_can | null;
  source: ChannelTableContentsConnectable_Link_source | null;
  counts: ChannelTableContentsConnectable_Link_counts | null;
  created_at: string | null;
  updated_at: string | null;
  image_url: string | null;
  title: string;
  user: ChannelTableContentsConnectable_Link_user | null;
}

export interface ChannelTableContentsConnectable_PendingBlock_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
  manage: boolean | null;
}

export interface ChannelTableContentsConnectable_PendingBlock_connection_user {
  __typename: "User";
  name: string;
}

export interface ChannelTableContentsConnectable_PendingBlock_connection {
  __typename: "Connection";
  can: ChannelTableContentsConnectable_PendingBlock_connection_can | null;
  position: number;
  selected: boolean;
  id: number;
  created_at: string | null;
  user: ChannelTableContentsConnectable_PendingBlock_connection_user | null;
}

export interface ChannelTableContentsConnectable_PendingBlock_can {
  __typename: "BlockCan";
  mute: boolean | null;
  remove: boolean | null;
}

export interface ChannelTableContentsConnectable_PendingBlock_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface ChannelTableContentsConnectable_PendingBlock_user {
  __typename: "User";
  name: string;
}

export interface ChannelTableContentsConnectable_PendingBlock {
  __typename: "PendingBlock";
  id: number;
  href: string | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelTableContentsConnectable_PendingBlock_connection | null;
  can: ChannelTableContentsConnectable_PendingBlock_can | null;
  counts: ChannelTableContentsConnectable_PendingBlock_counts | null;
  created_at: string | null;
  updated_at: string | null;
  title: string;
  user: ChannelTableContentsConnectable_PendingBlock_user | null;
}

export interface ChannelTableContentsConnectable_Text_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
  manage: boolean | null;
}

export interface ChannelTableContentsConnectable_Text_connection_user {
  __typename: "User";
  name: string;
}

export interface ChannelTableContentsConnectable_Text_connection {
  __typename: "Connection";
  can: ChannelTableContentsConnectable_Text_connection_can | null;
  position: number;
  selected: boolean;
  id: number;
  created_at: string | null;
  user: ChannelTableContentsConnectable_Text_connection_user | null;
}

export interface ChannelTableContentsConnectable_Text_can {
  __typename: "BlockCan";
  mute: boolean | null;
  remove: boolean | null;
}

export interface ChannelTableContentsConnectable_Text_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelTableContentsConnectable_Text_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface ChannelTableContentsConnectable_Text_user {
  __typename: "User";
  name: string;
}

export interface ChannelTableContentsConnectable_Text {
  __typename: "Text";
  id: number;
  href: string | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelTableContentsConnectable_Text_connection | null;
  can: ChannelTableContentsConnectable_Text_can | null;
  source: ChannelTableContentsConnectable_Text_source | null;
  counts: ChannelTableContentsConnectable_Text_counts | null;
  created_at: string | null;
  updated_at: string | null;
  content: string;
  html: string;
  title: string;
  user: ChannelTableContentsConnectable_Text_user | null;
}

export interface ChannelTableContentsConnectable_Channel_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
  manage: boolean | null;
}

export interface ChannelTableContentsConnectable_Channel_connection_user {
  __typename: "User";
  name: string;
}

export interface ChannelTableContentsConnectable_Channel_connection {
  __typename: "Connection";
  can: ChannelTableContentsConnectable_Channel_connection_can | null;
  position: number;
  selected: boolean;
  id: number;
  created_at: string | null;
  user: ChannelTableContentsConnectable_Channel_connection_user | null;
}

export interface ChannelTableContentsConnectable_Channel_can {
  __typename: "ChannelCan";
  mute: boolean | null;
}

export interface ChannelTableContentsConnectable_Channel_counts {
  __typename: "ChannelCounts";
  connected_to_channels: number | null;
  contents: number | null;
}

export interface ChannelTableContentsConnectable_Channel_user {
  __typename: "User";
  name: string;
}

export interface ChannelTableContentsConnectable_Channel {
  __typename: "Channel";
  id: number;
  href: string | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelTableContentsConnectable_Channel_connection | null;
  can: ChannelTableContentsConnectable_Channel_can | null;
  visibility: string;
  title: string;
  counts: ChannelTableContentsConnectable_Channel_counts | null;
  created_at: string | null;
  updated_at: string | null;
  user: ChannelTableContentsConnectable_Channel_user | null;
}

export type ChannelTableContentsConnectable = ChannelTableContentsConnectable_Attachment | ChannelTableContentsConnectable_Embed | ChannelTableContentsConnectable_Image | ChannelTableContentsConnectable_Link | ChannelTableContentsConnectable_PendingBlock | ChannelTableContentsConnectable_Text | ChannelTableContentsConnectable_Channel;
