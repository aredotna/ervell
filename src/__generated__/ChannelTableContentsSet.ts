/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Sorts, SortDirection, ConnectableTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: ChannelTableContentsSet
// ====================================================

export interface ChannelTableContentsSet_channel_counts {
  __typename: "ChannelCounts";
  contents: number | null;
  blocks: number | null;
  channels: number | null;
}

export interface ChannelTableContentsSet_channel_can {
  __typename: "ChannelCan";
  update: boolean | null;
}

export interface ChannelTableContentsSet_channel_blokks_PendingBlock_user {
  __typename: "User";
  name: string;
}

export interface ChannelTableContentsSet_channel_blokks_PendingBlock_connection_can {
  __typename: "ConnectionCan";
  manage: boolean | null;
  remove: boolean | null;
  destroy: boolean | null;
}

export interface ChannelTableContentsSet_channel_blokks_PendingBlock_connection {
  __typename: "Connection";
  id: number;
  created_at: string | null;
  selected: boolean;
  can: ChannelTableContentsSet_channel_blokks_PendingBlock_connection_can | null;
}

export interface ChannelTableContentsSet_channel_blokks_PendingBlock_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface ChannelTableContentsSet_channel_blokks_PendingBlock_can {
  __typename: "BlockCan";
  remove: boolean | null;
  manage: boolean | null;
  mute: boolean | null;
}

export interface ChannelTableContentsSet_channel_blokks_PendingBlock {
  __typename: "PendingBlock";
  id: number;
  created_at: string | null;
  updated_at: string | null;
  title: string;
  user: ChannelTableContentsSet_channel_blokks_PendingBlock_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelTableContentsSet_channel_blokks_PendingBlock_connection | null;
  href: string | null;
  counts: ChannelTableContentsSet_channel_blokks_PendingBlock_counts | null;
  can: ChannelTableContentsSet_channel_blokks_PendingBlock_can | null;
}

export interface ChannelTableContentsSet_channel_blokks_Attachment_user {
  __typename: "User";
  name: string;
}

export interface ChannelTableContentsSet_channel_blokks_Attachment_connection_can {
  __typename: "ConnectionCan";
  manage: boolean | null;
  remove: boolean | null;
  destroy: boolean | null;
}

export interface ChannelTableContentsSet_channel_blokks_Attachment_connection {
  __typename: "Connection";
  id: number;
  created_at: string | null;
  selected: boolean;
  can: ChannelTableContentsSet_channel_blokks_Attachment_connection_can | null;
}

export interface ChannelTableContentsSet_channel_blokks_Attachment_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface ChannelTableContentsSet_channel_blokks_Attachment_can {
  __typename: "BlockCan";
  remove: boolean | null;
  manage: boolean | null;
  mute: boolean | null;
}

export interface ChannelTableContentsSet_channel_blokks_Attachment_source {
  __typename: "ConnectableSource";
  url: string | null;
  provider_url: string | null;
}

export interface ChannelTableContentsSet_channel_blokks_Attachment {
  __typename: "Attachment";
  id: number;
  created_at: string | null;
  updated_at: string | null;
  title: string;
  user: ChannelTableContentsSet_channel_blokks_Attachment_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelTableContentsSet_channel_blokks_Attachment_connection | null;
  counts: ChannelTableContentsSet_channel_blokks_Attachment_counts | null;
  can: ChannelTableContentsSet_channel_blokks_Attachment_can | null;
  file_url: string | null;
  image_url: string | null;
  href: string | null;
  source: ChannelTableContentsSet_channel_blokks_Attachment_source | null;
}

export interface ChannelTableContentsSet_channel_blokks_Embed_user {
  __typename: "User";
  name: string;
}

export interface ChannelTableContentsSet_channel_blokks_Embed_connection_can {
  __typename: "ConnectionCan";
  manage: boolean | null;
  remove: boolean | null;
  destroy: boolean | null;
}

export interface ChannelTableContentsSet_channel_blokks_Embed_connection {
  __typename: "Connection";
  id: number;
  created_at: string | null;
  selected: boolean;
  can: ChannelTableContentsSet_channel_blokks_Embed_connection_can | null;
}

export interface ChannelTableContentsSet_channel_blokks_Embed_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface ChannelTableContentsSet_channel_blokks_Embed_can {
  __typename: "BlockCan";
  remove: boolean | null;
  manage: boolean | null;
  mute: boolean | null;
}

export interface ChannelTableContentsSet_channel_blokks_Embed_source {
  __typename: "ConnectableSource";
  url: string | null;
  provider_url: string | null;
}

export interface ChannelTableContentsSet_channel_blokks_Embed {
  __typename: "Embed";
  id: number;
  created_at: string | null;
  updated_at: string | null;
  title: string;
  user: ChannelTableContentsSet_channel_blokks_Embed_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelTableContentsSet_channel_blokks_Embed_connection | null;
  counts: ChannelTableContentsSet_channel_blokks_Embed_counts | null;
  can: ChannelTableContentsSet_channel_blokks_Embed_can | null;
  embed_html: string | null;
  image_url: string | null;
  href: string | null;
  source: ChannelTableContentsSet_channel_blokks_Embed_source | null;
}

export interface ChannelTableContentsSet_channel_blokks_Image_user {
  __typename: "User";
  name: string;
}

export interface ChannelTableContentsSet_channel_blokks_Image_connection_can {
  __typename: "ConnectionCan";
  manage: boolean | null;
  remove: boolean | null;
  destroy: boolean | null;
}

export interface ChannelTableContentsSet_channel_blokks_Image_connection {
  __typename: "Connection";
  id: number;
  created_at: string | null;
  selected: boolean;
  can: ChannelTableContentsSet_channel_blokks_Image_connection_can | null;
}

export interface ChannelTableContentsSet_channel_blokks_Image_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface ChannelTableContentsSet_channel_blokks_Image_can {
  __typename: "BlockCan";
  remove: boolean | null;
  manage: boolean | null;
  mute: boolean | null;
}

export interface ChannelTableContentsSet_channel_blokks_Image_source {
  __typename: "ConnectableSource";
  url: string | null;
  provider_url: string | null;
}

export interface ChannelTableContentsSet_channel_blokks_Image {
  __typename: "Image";
  id: number;
  created_at: string | null;
  updated_at: string | null;
  title: string;
  user: ChannelTableContentsSet_channel_blokks_Image_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelTableContentsSet_channel_blokks_Image_connection | null;
  counts: ChannelTableContentsSet_channel_blokks_Image_counts | null;
  can: ChannelTableContentsSet_channel_blokks_Image_can | null;
  image_url: string | null;
  href: string | null;
  find_original_url: string | null;
  source: ChannelTableContentsSet_channel_blokks_Image_source | null;
}

export interface ChannelTableContentsSet_channel_blokks_Link_user {
  __typename: "User";
  name: string;
}

export interface ChannelTableContentsSet_channel_blokks_Link_connection_can {
  __typename: "ConnectionCan";
  manage: boolean | null;
  remove: boolean | null;
  destroy: boolean | null;
}

export interface ChannelTableContentsSet_channel_blokks_Link_connection {
  __typename: "Connection";
  id: number;
  created_at: string | null;
  selected: boolean;
  can: ChannelTableContentsSet_channel_blokks_Link_connection_can | null;
}

export interface ChannelTableContentsSet_channel_blokks_Link_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface ChannelTableContentsSet_channel_blokks_Link_can {
  __typename: "BlockCan";
  remove: boolean | null;
  manage: boolean | null;
  mute: boolean | null;
}

export interface ChannelTableContentsSet_channel_blokks_Link_source {
  __typename: "ConnectableSource";
  url: string | null;
  provider_url: string | null;
}

export interface ChannelTableContentsSet_channel_blokks_Link {
  __typename: "Link";
  id: number;
  created_at: string | null;
  updated_at: string | null;
  title: string;
  user: ChannelTableContentsSet_channel_blokks_Link_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelTableContentsSet_channel_blokks_Link_connection | null;
  counts: ChannelTableContentsSet_channel_blokks_Link_counts | null;
  can: ChannelTableContentsSet_channel_blokks_Link_can | null;
  image_url: string | null;
  href: string | null;
  source: ChannelTableContentsSet_channel_blokks_Link_source | null;
}

export interface ChannelTableContentsSet_channel_blokks_Text_user {
  __typename: "User";
  name: string;
}

export interface ChannelTableContentsSet_channel_blokks_Text_connection_can {
  __typename: "ConnectionCan";
  manage: boolean | null;
  remove: boolean | null;
  destroy: boolean | null;
}

export interface ChannelTableContentsSet_channel_blokks_Text_connection {
  __typename: "Connection";
  id: number;
  created_at: string | null;
  selected: boolean;
  can: ChannelTableContentsSet_channel_blokks_Text_connection_can | null;
}

export interface ChannelTableContentsSet_channel_blokks_Text_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface ChannelTableContentsSet_channel_blokks_Text_can {
  __typename: "BlockCan";
  remove: boolean | null;
  manage: boolean | null;
  mute: boolean | null;
}

export interface ChannelTableContentsSet_channel_blokks_Text_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelTableContentsSet_channel_blokks_Text {
  __typename: "Text";
  id: number;
  created_at: string | null;
  updated_at: string | null;
  title: string;
  user: ChannelTableContentsSet_channel_blokks_Text_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelTableContentsSet_channel_blokks_Text_connection | null;
  counts: ChannelTableContentsSet_channel_blokks_Text_counts | null;
  can: ChannelTableContentsSet_channel_blokks_Text_can | null;
  content: string;
  html: string;
  find_original_url: string | null;
  href: string | null;
  source: ChannelTableContentsSet_channel_blokks_Text_source | null;
}

export interface ChannelTableContentsSet_channel_blokks_Channel_user {
  __typename: "User";
  name: string;
}

export interface ChannelTableContentsSet_channel_blokks_Channel_connection_can {
  __typename: "ConnectionCan";
  manage: boolean | null;
  remove: boolean | null;
  destroy: boolean | null;
}

export interface ChannelTableContentsSet_channel_blokks_Channel_connection {
  __typename: "Connection";
  id: number;
  created_at: string | null;
  selected: boolean;
  can: ChannelTableContentsSet_channel_blokks_Channel_connection_can | null;
}

export interface ChannelTableContentsSet_channel_blokks_Channel_counts {
  __typename: "ChannelCounts";
  connected_to_channels: number | null;
  contents: number | null;
}

export interface ChannelTableContentsSet_channel_blokks_Channel_can {
  __typename: "ChannelCan";
  update: boolean | null;
  manage: boolean | null;
  mute: boolean | null;
}

export interface ChannelTableContentsSet_channel_blokks_Channel {
  __typename: "Channel";
  id: number;
  created_at: string | null;
  updated_at: string | null;
  title: string;
  user: ChannelTableContentsSet_channel_blokks_Channel_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelTableContentsSet_channel_blokks_Channel_connection | null;
  visibility: string;
  href: string | null;
  counts: ChannelTableContentsSet_channel_blokks_Channel_counts | null;
  can: ChannelTableContentsSet_channel_blokks_Channel_can | null;
}

export type ChannelTableContentsSet_channel_blokks = ChannelTableContentsSet_channel_blokks_PendingBlock | ChannelTableContentsSet_channel_blokks_Attachment | ChannelTableContentsSet_channel_blokks_Embed | ChannelTableContentsSet_channel_blokks_Image | ChannelTableContentsSet_channel_blokks_Link | ChannelTableContentsSet_channel_blokks_Text | ChannelTableContentsSet_channel_blokks_Channel;

export interface ChannelTableContentsSet_channel {
  __typename: "Channel";
  id: number;
  counts: ChannelTableContentsSet_channel_counts | null;
  can: ChannelTableContentsSet_channel_can | null;
  blokks: ChannelTableContentsSet_channel_blokks[] | null;
}

export interface ChannelTableContentsSet {
  /**
   * A single channel
   */
  channel: ChannelTableContentsSet_channel | null;
}

export interface ChannelTableContentsSetVariables {
  id: string;
  page: number;
  per: number;
  sort?: Sorts | null;
  direction?: SortDirection | null;
  type?: ConnectableTypeEnum | null;
  user_id?: string | null;
  includeConnection: boolean;
}
