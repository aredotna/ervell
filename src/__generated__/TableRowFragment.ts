/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TableRowFragment
// ====================================================

export interface TableRowFragment_PendingBlock_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface TableRowFragment_PendingBlock_user {
  __typename: "User";
  name: string;
}

export interface TableRowFragment_PendingBlock_connection {
  __typename: "Connection";
  id: number;
  created_at: string | null;
  selected: boolean;
}

export interface TableRowFragment_PendingBlock {
  __typename: "PendingBlock";
  id: number;
  created_at: string | null;
  updated_at: string | null;
  href: string | null;
  counts: TableRowFragment_PendingBlock_counts | null;
  title: string;
  user: TableRowFragment_PendingBlock_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: TableRowFragment_PendingBlock_connection | null;
}

export interface TableRowFragment_Attachment_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface TableRowFragment_Attachment_source {
  __typename: "ConnectableSource";
  url: string | null;
  provider_url: string | null;
}

export interface TableRowFragment_Attachment_user {
  __typename: "User";
  name: string;
}

export interface TableRowFragment_Attachment_connection {
  __typename: "Connection";
  id: number;
  created_at: string | null;
  selected: boolean;
}

export interface TableRowFragment_Attachment {
  __typename: "Attachment";
  id: number;
  created_at: string | null;
  updated_at: string | null;
  counts: TableRowFragment_Attachment_counts | null;
  file_url: string | null;
  image_url: string | null;
  href: string | null;
  source: TableRowFragment_Attachment_source | null;
  title: string;
  user: TableRowFragment_Attachment_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: TableRowFragment_Attachment_connection | null;
}

export interface TableRowFragment_Embed_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface TableRowFragment_Embed_source {
  __typename: "ConnectableSource";
  url: string | null;
  provider_url: string | null;
}

export interface TableRowFragment_Embed_user {
  __typename: "User";
  name: string;
}

export interface TableRowFragment_Embed_connection {
  __typename: "Connection";
  id: number;
  created_at: string | null;
  selected: boolean;
}

export interface TableRowFragment_Embed {
  __typename: "Embed";
  id: number;
  created_at: string | null;
  updated_at: string | null;
  counts: TableRowFragment_Embed_counts | null;
  embed_html: string | null;
  image_url: string | null;
  href: string | null;
  source: TableRowFragment_Embed_source | null;
  title: string;
  user: TableRowFragment_Embed_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: TableRowFragment_Embed_connection | null;
}

export interface TableRowFragment_Image_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface TableRowFragment_Image_source {
  __typename: "ConnectableSource";
  url: string | null;
  provider_url: string | null;
}

export interface TableRowFragment_Image_user {
  __typename: "User";
  name: string;
}

export interface TableRowFragment_Image_connection {
  __typename: "Connection";
  id: number;
  created_at: string | null;
  selected: boolean;
}

export interface TableRowFragment_Image {
  __typename: "Image";
  id: number;
  created_at: string | null;
  updated_at: string | null;
  counts: TableRowFragment_Image_counts | null;
  image_url: string | null;
  href: string | null;
  /**
   * URL to find the original image on various services
   */
  find_original_url: string | null;
  source: TableRowFragment_Image_source | null;
  title: string;
  user: TableRowFragment_Image_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: TableRowFragment_Image_connection | null;
}

export interface TableRowFragment_Link_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface TableRowFragment_Link_source {
  __typename: "ConnectableSource";
  url: string | null;
  provider_url: string | null;
}

export interface TableRowFragment_Link_user {
  __typename: "User";
  name: string;
}

export interface TableRowFragment_Link_connection {
  __typename: "Connection";
  id: number;
  created_at: string | null;
  selected: boolean;
}

export interface TableRowFragment_Link {
  __typename: "Link";
  id: number;
  created_at: string | null;
  updated_at: string | null;
  counts: TableRowFragment_Link_counts | null;
  image_url: string | null;
  href: string | null;
  source: TableRowFragment_Link_source | null;
  title: string;
  user: TableRowFragment_Link_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: TableRowFragment_Link_connection | null;
}

export interface TableRowFragment_Text_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface TableRowFragment_Text_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface TableRowFragment_Text_user {
  __typename: "User";
  name: string;
}

export interface TableRowFragment_Text_connection {
  __typename: "Connection";
  id: number;
  created_at: string | null;
  selected: boolean;
}

export interface TableRowFragment_Text {
  __typename: "Text";
  id: number;
  created_at: string | null;
  updated_at: string | null;
  counts: TableRowFragment_Text_counts | null;
  content: string;
  html: string;
  /**
   * URL to find the original image on various services
   */
  find_original_url: string | null;
  href: string | null;
  source: TableRowFragment_Text_source | null;
  title: string;
  user: TableRowFragment_Text_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: TableRowFragment_Text_connection | null;
}

export interface TableRowFragment_Channel_counts {
  __typename: "ChannelCounts";
  connected_to_channels: number | null;
  contents: number | null;
}

export interface TableRowFragment_Channel_user {
  __typename: "User";
  name: string;
}

export interface TableRowFragment_Channel_connection {
  __typename: "Connection";
  id: number;
  created_at: string | null;
  selected: boolean;
}

export interface TableRowFragment_Channel {
  __typename: "Channel";
  id: number;
  created_at: string | null;
  updated_at: string | null;
  visibility: string;
  title: string;
  href: string | null;
  counts: TableRowFragment_Channel_counts | null;
  user: TableRowFragment_Channel_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: TableRowFragment_Channel_connection | null;
}

export type TableRowFragment = TableRowFragment_PendingBlock | TableRowFragment_Attachment | TableRowFragment_Embed | TableRowFragment_Image | TableRowFragment_Link | TableRowFragment_Text | TableRowFragment_Channel;
