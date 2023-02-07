/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TableRow
// ====================================================

export interface TableRow_blokk_PendingBlock_user {
  __typename: "User";
  name: string;
}

export interface TableRow_blokk_PendingBlock_connection_can {
  __typename: "ConnectionCan";
  manage: boolean | null;
  remove: boolean | null;
  destroy: boolean | null;
}

export interface TableRow_blokk_PendingBlock_connection {
  __typename: "Connection";
  id: number;
  created_at: string | null;
  selected: boolean;
  can: TableRow_blokk_PendingBlock_connection_can | null;
}

export interface TableRow_blokk_PendingBlock_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface TableRow_blokk_PendingBlock_can {
  __typename: "BlockCan";
  remove: boolean | null;
  manage: boolean | null;
  mute: boolean | null;
}

export interface TableRow_blokk_PendingBlock {
  __typename: "PendingBlock";
  id: number;
  created_at: string | null;
  updated_at: string | null;
  title: string;
  user: TableRow_blokk_PendingBlock_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: TableRow_blokk_PendingBlock_connection | null;
  href: string | null;
  counts: TableRow_blokk_PendingBlock_counts | null;
  can: TableRow_blokk_PendingBlock_can | null;
}

export interface TableRow_blokk_Attachment_user {
  __typename: "User";
  name: string;
}

export interface TableRow_blokk_Attachment_connection_can {
  __typename: "ConnectionCan";
  manage: boolean | null;
  remove: boolean | null;
  destroy: boolean | null;
}

export interface TableRow_blokk_Attachment_connection {
  __typename: "Connection";
  id: number;
  created_at: string | null;
  selected: boolean;
  can: TableRow_blokk_Attachment_connection_can | null;
}

export interface TableRow_blokk_Attachment_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface TableRow_blokk_Attachment_can {
  __typename: "BlockCan";
  remove: boolean | null;
  manage: boolean | null;
  mute: boolean | null;
}

export interface TableRow_blokk_Attachment_source {
  __typename: "ConnectableSource";
  url: string | null;
  provider_url: string | null;
}

export interface TableRow_blokk_Attachment {
  __typename: "Attachment";
  id: number;
  created_at: string | null;
  updated_at: string | null;
  title: string;
  user: TableRow_blokk_Attachment_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: TableRow_blokk_Attachment_connection | null;
  counts: TableRow_blokk_Attachment_counts | null;
  can: TableRow_blokk_Attachment_can | null;
  file_url: string | null;
  image_url: string | null;
  href: string | null;
  source: TableRow_blokk_Attachment_source | null;
}

export interface TableRow_blokk_Embed_user {
  __typename: "User";
  name: string;
}

export interface TableRow_blokk_Embed_connection_can {
  __typename: "ConnectionCan";
  manage: boolean | null;
  remove: boolean | null;
  destroy: boolean | null;
}

export interface TableRow_blokk_Embed_connection {
  __typename: "Connection";
  id: number;
  created_at: string | null;
  selected: boolean;
  can: TableRow_blokk_Embed_connection_can | null;
}

export interface TableRow_blokk_Embed_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface TableRow_blokk_Embed_can {
  __typename: "BlockCan";
  remove: boolean | null;
  manage: boolean | null;
  mute: boolean | null;
}

export interface TableRow_blokk_Embed_source {
  __typename: "ConnectableSource";
  url: string | null;
  provider_url: string | null;
}

export interface TableRow_blokk_Embed {
  __typename: "Embed";
  id: number;
  created_at: string | null;
  updated_at: string | null;
  title: string;
  user: TableRow_blokk_Embed_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: TableRow_blokk_Embed_connection | null;
  counts: TableRow_blokk_Embed_counts | null;
  can: TableRow_blokk_Embed_can | null;
  embed_html: string | null;
  image_url: string | null;
  href: string | null;
  source: TableRow_blokk_Embed_source | null;
}

export interface TableRow_blokk_Image_user {
  __typename: "User";
  name: string;
}

export interface TableRow_blokk_Image_connection_can {
  __typename: "ConnectionCan";
  manage: boolean | null;
  remove: boolean | null;
  destroy: boolean | null;
}

export interface TableRow_blokk_Image_connection {
  __typename: "Connection";
  id: number;
  created_at: string | null;
  selected: boolean;
  can: TableRow_blokk_Image_connection_can | null;
}

export interface TableRow_blokk_Image_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface TableRow_blokk_Image_can {
  __typename: "BlockCan";
  remove: boolean | null;
  manage: boolean | null;
  mute: boolean | null;
}

export interface TableRow_blokk_Image_source {
  __typename: "ConnectableSource";
  url: string | null;
  provider_url: string | null;
}

export interface TableRow_blokk_Image {
  __typename: "Image";
  id: number;
  created_at: string | null;
  updated_at: string | null;
  title: string;
  user: TableRow_blokk_Image_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: TableRow_blokk_Image_connection | null;
  counts: TableRow_blokk_Image_counts | null;
  can: TableRow_blokk_Image_can | null;
  image_url: string | null;
  href: string | null;
  /**
   * URL to find the original image on various services
   */
  find_original_url: string | null;
  source: TableRow_blokk_Image_source | null;
}

export interface TableRow_blokk_Link_user {
  __typename: "User";
  name: string;
}

export interface TableRow_blokk_Link_connection_can {
  __typename: "ConnectionCan";
  manage: boolean | null;
  remove: boolean | null;
  destroy: boolean | null;
}

export interface TableRow_blokk_Link_connection {
  __typename: "Connection";
  id: number;
  created_at: string | null;
  selected: boolean;
  can: TableRow_blokk_Link_connection_can | null;
}

export interface TableRow_blokk_Link_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface TableRow_blokk_Link_can {
  __typename: "BlockCan";
  remove: boolean | null;
  manage: boolean | null;
  mute: boolean | null;
}

export interface TableRow_blokk_Link_source {
  __typename: "ConnectableSource";
  url: string | null;
  provider_url: string | null;
}

export interface TableRow_blokk_Link {
  __typename: "Link";
  id: number;
  created_at: string | null;
  updated_at: string | null;
  title: string;
  user: TableRow_blokk_Link_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: TableRow_blokk_Link_connection | null;
  counts: TableRow_blokk_Link_counts | null;
  can: TableRow_blokk_Link_can | null;
  image_url: string | null;
  href: string | null;
  source: TableRow_blokk_Link_source | null;
}

export interface TableRow_blokk_Text_user {
  __typename: "User";
  name: string;
}

export interface TableRow_blokk_Text_connection_can {
  __typename: "ConnectionCan";
  manage: boolean | null;
  remove: boolean | null;
  destroy: boolean | null;
}

export interface TableRow_blokk_Text_connection {
  __typename: "Connection";
  id: number;
  created_at: string | null;
  selected: boolean;
  can: TableRow_blokk_Text_connection_can | null;
}

export interface TableRow_blokk_Text_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface TableRow_blokk_Text_can {
  __typename: "BlockCan";
  remove: boolean | null;
  manage: boolean | null;
  mute: boolean | null;
}

export interface TableRow_blokk_Text_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface TableRow_blokk_Text {
  __typename: "Text";
  id: number;
  created_at: string | null;
  updated_at: string | null;
  title: string;
  user: TableRow_blokk_Text_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: TableRow_blokk_Text_connection | null;
  counts: TableRow_blokk_Text_counts | null;
  can: TableRow_blokk_Text_can | null;
  content: string;
  html: string;
  /**
   * URL to find the original image on various services
   */
  find_original_url: string | null;
  href: string | null;
  source: TableRow_blokk_Text_source | null;
}

export interface TableRow_blokk_Channel_user {
  __typename: "User";
  name: string;
}

export interface TableRow_blokk_Channel_connection_can {
  __typename: "ConnectionCan";
  manage: boolean | null;
  remove: boolean | null;
  destroy: boolean | null;
}

export interface TableRow_blokk_Channel_connection {
  __typename: "Connection";
  id: number;
  created_at: string | null;
  selected: boolean;
  can: TableRow_blokk_Channel_connection_can | null;
}

export interface TableRow_blokk_Channel_counts {
  __typename: "ChannelCounts";
  connected_to_channels: number | null;
  contents: number | null;
}

export interface TableRow_blokk_Channel_can {
  __typename: "ChannelCan";
  update: boolean | null;
  manage: boolean | null;
  mute: boolean | null;
}

export interface TableRow_blokk_Channel {
  __typename: "Channel";
  id: number;
  created_at: string | null;
  updated_at: string | null;
  title: string;
  user: TableRow_blokk_Channel_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: TableRow_blokk_Channel_connection | null;
  visibility: string;
  href: string | null;
  counts: TableRow_blokk_Channel_counts | null;
  can: TableRow_blokk_Channel_can | null;
}

export type TableRow_blokk = TableRow_blokk_PendingBlock | TableRow_blokk_Attachment | TableRow_blokk_Embed | TableRow_blokk_Image | TableRow_blokk_Link | TableRow_blokk_Text | TableRow_blokk_Channel;

export interface TableRow {
  blokk: TableRow_blokk | null;
}

export interface TableRowVariables {
  id: string;
  includeConnection: boolean;
}
