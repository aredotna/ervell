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

export interface ChannelTableContentsSet_channel_blokks_Attachment_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
  manage: boolean | null;
}

export interface ChannelTableContentsSet_channel_blokks_Attachment_connection_user {
  __typename: "User";
  name: string;
}

export interface ChannelTableContentsSet_channel_blokks_Attachment_connection {
  __typename: "Connection";
  can: ChannelTableContentsSet_channel_blokks_Attachment_connection_can | null;
  position: number;
  selected: boolean;
  id: number;
  created_at: string | null;
  user: ChannelTableContentsSet_channel_blokks_Attachment_connection_user | null;
}

export interface ChannelTableContentsSet_channel_blokks_Attachment_user {
  __typename: "User";
  name: string;
}

export interface ChannelTableContentsSet_channel_blokks_Attachment_can {
  __typename: "BlockCan";
  mute: boolean | null;
  remove: boolean | null;
  manage: boolean | null;
}

export interface ChannelTableContentsSet_channel_blokks_Attachment_source {
  __typename: "ConnectableSource";
  url: string | null;
  provider_url: string | null;
}

export interface ChannelTableContentsSet_channel_blokks_Attachment_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface ChannelTableContentsSet_channel_blokks_Attachment {
  __typename: "Attachment";
  id: number;
  href: string | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelTableContentsSet_channel_blokks_Attachment_connection | null;
  created_at: string | null;
  updated_at: string | null;
  title: string;
  user: ChannelTableContentsSet_channel_blokks_Attachment_user | null;
  can: ChannelTableContentsSet_channel_blokks_Attachment_can | null;
  source: ChannelTableContentsSet_channel_blokks_Attachment_source | null;
  counts: ChannelTableContentsSet_channel_blokks_Attachment_counts | null;
  file_url: string | null;
  image_url: string | null;
}

export interface ChannelTableContentsSet_channel_blokks_Embed_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
  manage: boolean | null;
}

export interface ChannelTableContentsSet_channel_blokks_Embed_connection_user {
  __typename: "User";
  name: string;
}

export interface ChannelTableContentsSet_channel_blokks_Embed_connection {
  __typename: "Connection";
  can: ChannelTableContentsSet_channel_blokks_Embed_connection_can | null;
  position: number;
  selected: boolean;
  id: number;
  created_at: string | null;
  user: ChannelTableContentsSet_channel_blokks_Embed_connection_user | null;
}

export interface ChannelTableContentsSet_channel_blokks_Embed_user {
  __typename: "User";
  name: string;
}

export interface ChannelTableContentsSet_channel_blokks_Embed_can {
  __typename: "BlockCan";
  mute: boolean | null;
  remove: boolean | null;
  manage: boolean | null;
}

export interface ChannelTableContentsSet_channel_blokks_Embed_source {
  __typename: "ConnectableSource";
  url: string | null;
  provider_url: string | null;
}

export interface ChannelTableContentsSet_channel_blokks_Embed_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface ChannelTableContentsSet_channel_blokks_Embed {
  __typename: "Embed";
  id: number;
  href: string | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelTableContentsSet_channel_blokks_Embed_connection | null;
  created_at: string | null;
  updated_at: string | null;
  title: string;
  user: ChannelTableContentsSet_channel_blokks_Embed_user | null;
  can: ChannelTableContentsSet_channel_blokks_Embed_can | null;
  source: ChannelTableContentsSet_channel_blokks_Embed_source | null;
  counts: ChannelTableContentsSet_channel_blokks_Embed_counts | null;
  embed_html: string | null;
  image_url: string | null;
}

export interface ChannelTableContentsSet_channel_blokks_Image_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
  manage: boolean | null;
}

export interface ChannelTableContentsSet_channel_blokks_Image_connection_user {
  __typename: "User";
  name: string;
}

export interface ChannelTableContentsSet_channel_blokks_Image_connection {
  __typename: "Connection";
  can: ChannelTableContentsSet_channel_blokks_Image_connection_can | null;
  position: number;
  selected: boolean;
  id: number;
  created_at: string | null;
  user: ChannelTableContentsSet_channel_blokks_Image_connection_user | null;
}

export interface ChannelTableContentsSet_channel_blokks_Image_user {
  __typename: "User";
  name: string;
}

export interface ChannelTableContentsSet_channel_blokks_Image_can {
  __typename: "BlockCan";
  mute: boolean | null;
  remove: boolean | null;
  manage: boolean | null;
}

export interface ChannelTableContentsSet_channel_blokks_Image_source {
  __typename: "ConnectableSource";
  url: string | null;
  provider_url: string | null;
}

export interface ChannelTableContentsSet_channel_blokks_Image_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface ChannelTableContentsSet_channel_blokks_Image {
  __typename: "Image";
  id: number;
  href: string | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelTableContentsSet_channel_blokks_Image_connection | null;
  created_at: string | null;
  updated_at: string | null;
  title: string;
  user: ChannelTableContentsSet_channel_blokks_Image_user | null;
  can: ChannelTableContentsSet_channel_blokks_Image_can | null;
  source: ChannelTableContentsSet_channel_blokks_Image_source | null;
  find_original_url: string | null;
  counts: ChannelTableContentsSet_channel_blokks_Image_counts | null;
  image_url: string | null;
}

export interface ChannelTableContentsSet_channel_blokks_Link_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
  manage: boolean | null;
}

export interface ChannelTableContentsSet_channel_blokks_Link_connection_user {
  __typename: "User";
  name: string;
}

export interface ChannelTableContentsSet_channel_blokks_Link_connection {
  __typename: "Connection";
  can: ChannelTableContentsSet_channel_blokks_Link_connection_can | null;
  position: number;
  selected: boolean;
  id: number;
  created_at: string | null;
  user: ChannelTableContentsSet_channel_blokks_Link_connection_user | null;
}

export interface ChannelTableContentsSet_channel_blokks_Link_user {
  __typename: "User";
  name: string;
}

export interface ChannelTableContentsSet_channel_blokks_Link_can {
  __typename: "BlockCan";
  mute: boolean | null;
  remove: boolean | null;
  manage: boolean | null;
}

export interface ChannelTableContentsSet_channel_blokks_Link_source {
  __typename: "ConnectableSource";
  url: string | null;
  provider_url: string | null;
}

export interface ChannelTableContentsSet_channel_blokks_Link_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface ChannelTableContentsSet_channel_blokks_Link {
  __typename: "Link";
  id: number;
  href: string | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelTableContentsSet_channel_blokks_Link_connection | null;
  created_at: string | null;
  updated_at: string | null;
  title: string;
  user: ChannelTableContentsSet_channel_blokks_Link_user | null;
  can: ChannelTableContentsSet_channel_blokks_Link_can | null;
  source: ChannelTableContentsSet_channel_blokks_Link_source | null;
  counts: ChannelTableContentsSet_channel_blokks_Link_counts | null;
  image_url: string | null;
}

export interface ChannelTableContentsSet_channel_blokks_PendingBlock_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
  manage: boolean | null;
}

export interface ChannelTableContentsSet_channel_blokks_PendingBlock_connection_user {
  __typename: "User";
  name: string;
}

export interface ChannelTableContentsSet_channel_blokks_PendingBlock_connection {
  __typename: "Connection";
  can: ChannelTableContentsSet_channel_blokks_PendingBlock_connection_can | null;
  position: number;
  selected: boolean;
  id: number;
  created_at: string | null;
  user: ChannelTableContentsSet_channel_blokks_PendingBlock_connection_user | null;
}

export interface ChannelTableContentsSet_channel_blokks_PendingBlock_user {
  __typename: "User";
  name: string;
}

export interface ChannelTableContentsSet_channel_blokks_PendingBlock_can {
  __typename: "BlockCan";
  mute: boolean | null;
  remove: boolean | null;
  manage: boolean | null;
}

export interface ChannelTableContentsSet_channel_blokks_PendingBlock_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface ChannelTableContentsSet_channel_blokks_PendingBlock {
  __typename: "PendingBlock";
  id: number;
  href: string | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelTableContentsSet_channel_blokks_PendingBlock_connection | null;
  created_at: string | null;
  updated_at: string | null;
  title: string;
  user: ChannelTableContentsSet_channel_blokks_PendingBlock_user | null;
  can: ChannelTableContentsSet_channel_blokks_PendingBlock_can | null;
  counts: ChannelTableContentsSet_channel_blokks_PendingBlock_counts | null;
}

export interface ChannelTableContentsSet_channel_blokks_Text_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
  manage: boolean | null;
}

export interface ChannelTableContentsSet_channel_blokks_Text_connection_user {
  __typename: "User";
  name: string;
}

export interface ChannelTableContentsSet_channel_blokks_Text_connection {
  __typename: "Connection";
  can: ChannelTableContentsSet_channel_blokks_Text_connection_can | null;
  position: number;
  selected: boolean;
  id: number;
  created_at: string | null;
  user: ChannelTableContentsSet_channel_blokks_Text_connection_user | null;
}

export interface ChannelTableContentsSet_channel_blokks_Text_user {
  __typename: "User";
  name: string;
}

export interface ChannelTableContentsSet_channel_blokks_Text_can {
  __typename: "BlockCan";
  mute: boolean | null;
  remove: boolean | null;
  manage: boolean | null;
}

export interface ChannelTableContentsSet_channel_blokks_Text_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelTableContentsSet_channel_blokks_Text_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface ChannelTableContentsSet_channel_blokks_Text {
  __typename: "Text";
  id: number;
  href: string | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelTableContentsSet_channel_blokks_Text_connection | null;
  created_at: string | null;
  updated_at: string | null;
  title: string;
  user: ChannelTableContentsSet_channel_blokks_Text_user | null;
  can: ChannelTableContentsSet_channel_blokks_Text_can | null;
  source: ChannelTableContentsSet_channel_blokks_Text_source | null;
  counts: ChannelTableContentsSet_channel_blokks_Text_counts | null;
  content: string;
  html: string;
}

export interface ChannelTableContentsSet_channel_blokks_Channel_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
  manage: boolean | null;
}

export interface ChannelTableContentsSet_channel_blokks_Channel_connection_user {
  __typename: "User";
  name: string;
}

export interface ChannelTableContentsSet_channel_blokks_Channel_connection {
  __typename: "Connection";
  can: ChannelTableContentsSet_channel_blokks_Channel_connection_can | null;
  position: number;
  selected: boolean;
  id: number;
  created_at: string | null;
  user: ChannelTableContentsSet_channel_blokks_Channel_connection_user | null;
}

export interface ChannelTableContentsSet_channel_blokks_Channel_user {
  __typename: "User";
  name: string;
}

export interface ChannelTableContentsSet_channel_blokks_Channel_can {
  __typename: "ChannelCan";
  mute: boolean | null;
}

export interface ChannelTableContentsSet_channel_blokks_Channel_counts {
  __typename: "ChannelCounts";
  connected_to_channels: number | null;
  contents: number | null;
}

export interface ChannelTableContentsSet_channel_blokks_Channel {
  __typename: "Channel";
  id: number;
  href: string | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelTableContentsSet_channel_blokks_Channel_connection | null;
  created_at: string | null;
  updated_at: string | null;
  title: string;
  user: ChannelTableContentsSet_channel_blokks_Channel_user | null;
  can: ChannelTableContentsSet_channel_blokks_Channel_can | null;
  visibility: string;
  counts: ChannelTableContentsSet_channel_blokks_Channel_counts | null;
}

export type ChannelTableContentsSet_channel_blokks = ChannelTableContentsSet_channel_blokks_Attachment | ChannelTableContentsSet_channel_blokks_Embed | ChannelTableContentsSet_channel_blokks_Image | ChannelTableContentsSet_channel_blokks_Link | ChannelTableContentsSet_channel_blokks_PendingBlock | ChannelTableContentsSet_channel_blokks_Text | ChannelTableContentsSet_channel_blokks_Channel;

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
}
