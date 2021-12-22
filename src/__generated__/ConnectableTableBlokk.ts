/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ConnectableTableBlokk
// ====================================================

export interface ConnectableTableBlokk_blokk_Attachment_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
  manage: boolean | null;
}

export interface ConnectableTableBlokk_blokk_Attachment_connection_user {
  __typename: "User";
  name: string;
}

export interface ConnectableTableBlokk_blokk_Attachment_connection {
  __typename: "Connection";
  can: ConnectableTableBlokk_blokk_Attachment_connection_can | null;
  position: number;
  selected: boolean;
  id: number;
  created_at: string | null;
  user: ConnectableTableBlokk_blokk_Attachment_connection_user | null;
}

export interface ConnectableTableBlokk_blokk_Attachment_user {
  __typename: "User";
  name: string;
}

export interface ConnectableTableBlokk_blokk_Attachment_can {
  __typename: "BlockCan";
  mute: boolean | null;
  remove: boolean | null;
}

export interface ConnectableTableBlokk_blokk_Attachment_source {
  __typename: "ConnectableSource";
  url: string | null;
  provider_url: string | null;
}

export interface ConnectableTableBlokk_blokk_Attachment_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface ConnectableTableBlokk_blokk_Attachment {
  __typename: "Attachment";
  id: number;
  href: string | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ConnectableTableBlokk_blokk_Attachment_connection | null;
  created_at: string | null;
  updated_at: string | null;
  title: string;
  user: ConnectableTableBlokk_blokk_Attachment_user | null;
  can: ConnectableTableBlokk_blokk_Attachment_can | null;
  source: ConnectableTableBlokk_blokk_Attachment_source | null;
  counts: ConnectableTableBlokk_blokk_Attachment_counts | null;
  file_url: string | null;
  image_url: string | null;
}

export interface ConnectableTableBlokk_blokk_Embed_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
  manage: boolean | null;
}

export interface ConnectableTableBlokk_blokk_Embed_connection_user {
  __typename: "User";
  name: string;
}

export interface ConnectableTableBlokk_blokk_Embed_connection {
  __typename: "Connection";
  can: ConnectableTableBlokk_blokk_Embed_connection_can | null;
  position: number;
  selected: boolean;
  id: number;
  created_at: string | null;
  user: ConnectableTableBlokk_blokk_Embed_connection_user | null;
}

export interface ConnectableTableBlokk_blokk_Embed_user {
  __typename: "User";
  name: string;
}

export interface ConnectableTableBlokk_blokk_Embed_can {
  __typename: "BlockCan";
  mute: boolean | null;
  remove: boolean | null;
}

export interface ConnectableTableBlokk_blokk_Embed_source {
  __typename: "ConnectableSource";
  url: string | null;
  provider_url: string | null;
}

export interface ConnectableTableBlokk_blokk_Embed_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface ConnectableTableBlokk_blokk_Embed {
  __typename: "Embed";
  id: number;
  href: string | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ConnectableTableBlokk_blokk_Embed_connection | null;
  created_at: string | null;
  updated_at: string | null;
  title: string;
  user: ConnectableTableBlokk_blokk_Embed_user | null;
  can: ConnectableTableBlokk_blokk_Embed_can | null;
  source: ConnectableTableBlokk_blokk_Embed_source | null;
  counts: ConnectableTableBlokk_blokk_Embed_counts | null;
  embed_html: string | null;
  image_url: string | null;
}

export interface ConnectableTableBlokk_blokk_Image_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
  manage: boolean | null;
}

export interface ConnectableTableBlokk_blokk_Image_connection_user {
  __typename: "User";
  name: string;
}

export interface ConnectableTableBlokk_blokk_Image_connection {
  __typename: "Connection";
  can: ConnectableTableBlokk_blokk_Image_connection_can | null;
  position: number;
  selected: boolean;
  id: number;
  created_at: string | null;
  user: ConnectableTableBlokk_blokk_Image_connection_user | null;
}

export interface ConnectableTableBlokk_blokk_Image_user {
  __typename: "User";
  name: string;
}

export interface ConnectableTableBlokk_blokk_Image_can {
  __typename: "BlockCan";
  mute: boolean | null;
  remove: boolean | null;
}

export interface ConnectableTableBlokk_blokk_Image_source {
  __typename: "ConnectableSource";
  url: string | null;
  provider_url: string | null;
}

export interface ConnectableTableBlokk_blokk_Image_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface ConnectableTableBlokk_blokk_Image {
  __typename: "Image";
  id: number;
  href: string | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ConnectableTableBlokk_blokk_Image_connection | null;
  created_at: string | null;
  updated_at: string | null;
  title: string;
  user: ConnectableTableBlokk_blokk_Image_user | null;
  can: ConnectableTableBlokk_blokk_Image_can | null;
  source: ConnectableTableBlokk_blokk_Image_source | null;
  find_original_url: string | null;
  counts: ConnectableTableBlokk_blokk_Image_counts | null;
  image_url: string | null;
}

export interface ConnectableTableBlokk_blokk_Link_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
  manage: boolean | null;
}

export interface ConnectableTableBlokk_blokk_Link_connection_user {
  __typename: "User";
  name: string;
}

export interface ConnectableTableBlokk_blokk_Link_connection {
  __typename: "Connection";
  can: ConnectableTableBlokk_blokk_Link_connection_can | null;
  position: number;
  selected: boolean;
  id: number;
  created_at: string | null;
  user: ConnectableTableBlokk_blokk_Link_connection_user | null;
}

export interface ConnectableTableBlokk_blokk_Link_user {
  __typename: "User";
  name: string;
}

export interface ConnectableTableBlokk_blokk_Link_can {
  __typename: "BlockCan";
  mute: boolean | null;
  remove: boolean | null;
}

export interface ConnectableTableBlokk_blokk_Link_source {
  __typename: "ConnectableSource";
  url: string | null;
  provider_url: string | null;
}

export interface ConnectableTableBlokk_blokk_Link_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface ConnectableTableBlokk_blokk_Link {
  __typename: "Link";
  id: number;
  href: string | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ConnectableTableBlokk_blokk_Link_connection | null;
  created_at: string | null;
  updated_at: string | null;
  title: string;
  user: ConnectableTableBlokk_blokk_Link_user | null;
  can: ConnectableTableBlokk_blokk_Link_can | null;
  source: ConnectableTableBlokk_blokk_Link_source | null;
  counts: ConnectableTableBlokk_blokk_Link_counts | null;
  image_url: string | null;
}

export interface ConnectableTableBlokk_blokk_PendingBlock_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
  manage: boolean | null;
}

export interface ConnectableTableBlokk_blokk_PendingBlock_connection_user {
  __typename: "User";
  name: string;
}

export interface ConnectableTableBlokk_blokk_PendingBlock_connection {
  __typename: "Connection";
  can: ConnectableTableBlokk_blokk_PendingBlock_connection_can | null;
  position: number;
  selected: boolean;
  id: number;
  created_at: string | null;
  user: ConnectableTableBlokk_blokk_PendingBlock_connection_user | null;
}

export interface ConnectableTableBlokk_blokk_PendingBlock_user {
  __typename: "User";
  name: string;
}

export interface ConnectableTableBlokk_blokk_PendingBlock_can {
  __typename: "BlockCan";
  mute: boolean | null;
  remove: boolean | null;
}

export interface ConnectableTableBlokk_blokk_PendingBlock_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface ConnectableTableBlokk_blokk_PendingBlock {
  __typename: "PendingBlock";
  id: number;
  href: string | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ConnectableTableBlokk_blokk_PendingBlock_connection | null;
  created_at: string | null;
  updated_at: string | null;
  title: string;
  user: ConnectableTableBlokk_blokk_PendingBlock_user | null;
  can: ConnectableTableBlokk_blokk_PendingBlock_can | null;
  counts: ConnectableTableBlokk_blokk_PendingBlock_counts | null;
}

export interface ConnectableTableBlokk_blokk_Text_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
  manage: boolean | null;
}

export interface ConnectableTableBlokk_blokk_Text_connection_user {
  __typename: "User";
  name: string;
}

export interface ConnectableTableBlokk_blokk_Text_connection {
  __typename: "Connection";
  can: ConnectableTableBlokk_blokk_Text_connection_can | null;
  position: number;
  selected: boolean;
  id: number;
  created_at: string | null;
  user: ConnectableTableBlokk_blokk_Text_connection_user | null;
}

export interface ConnectableTableBlokk_blokk_Text_user {
  __typename: "User";
  name: string;
}

export interface ConnectableTableBlokk_blokk_Text_can {
  __typename: "BlockCan";
  mute: boolean | null;
  remove: boolean | null;
}

export interface ConnectableTableBlokk_blokk_Text_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ConnectableTableBlokk_blokk_Text_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface ConnectableTableBlokk_blokk_Text {
  __typename: "Text";
  id: number;
  href: string | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ConnectableTableBlokk_blokk_Text_connection | null;
  created_at: string | null;
  updated_at: string | null;
  title: string;
  user: ConnectableTableBlokk_blokk_Text_user | null;
  can: ConnectableTableBlokk_blokk_Text_can | null;
  source: ConnectableTableBlokk_blokk_Text_source | null;
  counts: ConnectableTableBlokk_blokk_Text_counts | null;
  content: string;
  html: string;
}

export interface ConnectableTableBlokk_blokk_Channel_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
  manage: boolean | null;
}

export interface ConnectableTableBlokk_blokk_Channel_connection_user {
  __typename: "User";
  name: string;
}

export interface ConnectableTableBlokk_blokk_Channel_connection {
  __typename: "Connection";
  can: ConnectableTableBlokk_blokk_Channel_connection_can | null;
  position: number;
  selected: boolean;
  id: number;
  created_at: string | null;
  user: ConnectableTableBlokk_blokk_Channel_connection_user | null;
}

export interface ConnectableTableBlokk_blokk_Channel_user {
  __typename: "User";
  name: string;
}

export interface ConnectableTableBlokk_blokk_Channel_can {
  __typename: "ChannelCan";
  mute: boolean | null;
}

export interface ConnectableTableBlokk_blokk_Channel_counts {
  __typename: "ChannelCounts";
  connected_to_channels: number | null;
  contents: number | null;
}

export interface ConnectableTableBlokk_blokk_Channel {
  __typename: "Channel";
  id: number;
  href: string | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ConnectableTableBlokk_blokk_Channel_connection | null;
  created_at: string | null;
  updated_at: string | null;
  title: string;
  user: ConnectableTableBlokk_blokk_Channel_user | null;
  can: ConnectableTableBlokk_blokk_Channel_can | null;
  visibility: string;
  counts: ConnectableTableBlokk_blokk_Channel_counts | null;
}

export type ConnectableTableBlokk_blokk = ConnectableTableBlokk_blokk_Attachment | ConnectableTableBlokk_blokk_Embed | ConnectableTableBlokk_blokk_Image | ConnectableTableBlokk_blokk_Link | ConnectableTableBlokk_blokk_PendingBlock | ConnectableTableBlokk_blokk_Text | ConnectableTableBlokk_blokk_Channel;

export interface ConnectableTableBlokk {
  blokk: ConnectableTableBlokk_blokk | null;
}

export interface ConnectableTableBlokkVariables {
  id: string;
}
