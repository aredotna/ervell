/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ConnectableTableBlokk
// ====================================================

export interface ConnectableTableBlokk_blokk_PendingBlock_user {
  __typename: "User";
  name: string;
}

export interface ConnectableTableBlokk_blokk_PendingBlock_connection {
  __typename: "Connection";
  id: number;
  created_at: string;
  selected: boolean;
}

export interface ConnectableTableBlokk_blokk_PendingBlock_counts {
  __typename: "BlockCounts";
  public_channels: number;
}

export interface ConnectableTableBlokk_blokk_PendingBlock {
  __typename: "PendingBlock";
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  user: ConnectableTableBlokk_blokk_PendingBlock_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ConnectableTableBlokk_blokk_PendingBlock_connection | null;
  href: string;
  counts: ConnectableTableBlokk_blokk_PendingBlock_counts;
}

export interface ConnectableTableBlokk_blokk_Attachment_user {
  __typename: "User";
  name: string;
}

export interface ConnectableTableBlokk_blokk_Attachment_connection {
  __typename: "Connection";
  id: number;
  created_at: string;
  selected: boolean;
}

export interface ConnectableTableBlokk_blokk_Attachment_counts {
  __typename: "BlockCounts";
  public_channels: number;
}

export interface ConnectableTableBlokk_blokk_Attachment_source {
  __typename: "ConnectableSource";
  url: string | null;
  provider_url: string | null;
}

export interface ConnectableTableBlokk_blokk_Attachment {
  __typename: "Attachment";
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  user: ConnectableTableBlokk_blokk_Attachment_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ConnectableTableBlokk_blokk_Attachment_connection | null;
  counts: ConnectableTableBlokk_blokk_Attachment_counts;
  file_url: string | null;
  image_url: string | null;
  href: string;
  source: ConnectableTableBlokk_blokk_Attachment_source | null;
}

export interface ConnectableTableBlokk_blokk_Embed_user {
  __typename: "User";
  name: string;
}

export interface ConnectableTableBlokk_blokk_Embed_connection {
  __typename: "Connection";
  id: number;
  created_at: string;
  selected: boolean;
}

export interface ConnectableTableBlokk_blokk_Embed_counts {
  __typename: "BlockCounts";
  public_channels: number;
}

export interface ConnectableTableBlokk_blokk_Embed_source {
  __typename: "ConnectableSource";
  url: string | null;
  provider_url: string | null;
}

export interface ConnectableTableBlokk_blokk_Embed {
  __typename: "Embed";
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  user: ConnectableTableBlokk_blokk_Embed_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ConnectableTableBlokk_blokk_Embed_connection | null;
  counts: ConnectableTableBlokk_blokk_Embed_counts;
  embed_html: string | null;
  image_url: string | null;
  href: string;
  source: ConnectableTableBlokk_blokk_Embed_source | null;
}

export interface ConnectableTableBlokk_blokk_Image_user {
  __typename: "User";
  name: string;
}

export interface ConnectableTableBlokk_blokk_Image_connection {
  __typename: "Connection";
  id: number;
  created_at: string;
  selected: boolean;
}

export interface ConnectableTableBlokk_blokk_Image_counts {
  __typename: "BlockCounts";
  public_channels: number;
}

export interface ConnectableTableBlokk_blokk_Image_source {
  __typename: "ConnectableSource";
  url: string | null;
  provider_url: string | null;
}

export interface ConnectableTableBlokk_blokk_Image {
  __typename: "Image";
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  user: ConnectableTableBlokk_blokk_Image_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ConnectableTableBlokk_blokk_Image_connection | null;
  counts: ConnectableTableBlokk_blokk_Image_counts;
  image_url: string | null;
  href: string;
  /**
   * URL to find the original image on various services
   */
  find_original_url: string | null;
  source: ConnectableTableBlokk_blokk_Image_source | null;
}

export interface ConnectableTableBlokk_blokk_Link_user {
  __typename: "User";
  name: string;
}

export interface ConnectableTableBlokk_blokk_Link_connection {
  __typename: "Connection";
  id: number;
  created_at: string;
  selected: boolean;
}

export interface ConnectableTableBlokk_blokk_Link_counts {
  __typename: "BlockCounts";
  public_channels: number;
}

export interface ConnectableTableBlokk_blokk_Link_source {
  __typename: "ConnectableSource";
  url: string | null;
  provider_url: string | null;
}

export interface ConnectableTableBlokk_blokk_Link {
  __typename: "Link";
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  user: ConnectableTableBlokk_blokk_Link_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ConnectableTableBlokk_blokk_Link_connection | null;
  counts: ConnectableTableBlokk_blokk_Link_counts;
  image_url: string | null;
  href: string;
  source: ConnectableTableBlokk_blokk_Link_source | null;
}

export interface ConnectableTableBlokk_blokk_Text_user {
  __typename: "User";
  name: string;
}

export interface ConnectableTableBlokk_blokk_Text_connection {
  __typename: "Connection";
  id: number;
  created_at: string;
  selected: boolean;
}

export interface ConnectableTableBlokk_blokk_Text_counts {
  __typename: "BlockCounts";
  public_channels: number;
}

export interface ConnectableTableBlokk_blokk_Text_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ConnectableTableBlokk_blokk_Text {
  __typename: "Text";
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  user: ConnectableTableBlokk_blokk_Text_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ConnectableTableBlokk_blokk_Text_connection | null;
  counts: ConnectableTableBlokk_blokk_Text_counts;
  content: string;
  html: string;
  /**
   * URL to find the original image on various services
   */
  find_original_url: string | null;
  href: string;
  source: ConnectableTableBlokk_blokk_Text_source | null;
}

export interface ConnectableTableBlokk_blokk_Channel_user {
  __typename: "User";
  name: string;
}

export interface ConnectableTableBlokk_blokk_Channel_connection {
  __typename: "Connection";
  id: number;
  created_at: string;
  selected: boolean;
}

export interface ConnectableTableBlokk_blokk_Channel_counts {
  __typename: "ChannelCounts";
  connected_to_channels: number;
  contents: number;
}

export interface ConnectableTableBlokk_blokk_Channel {
  __typename: "Channel";
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  user: ConnectableTableBlokk_blokk_Channel_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ConnectableTableBlokk_blokk_Channel_connection | null;
  visibility: string;
  href: string;
  counts: ConnectableTableBlokk_blokk_Channel_counts;
}

export type ConnectableTableBlokk_blokk = ConnectableTableBlokk_blokk_PendingBlock | ConnectableTableBlokk_blokk_Attachment | ConnectableTableBlokk_blokk_Embed | ConnectableTableBlokk_blokk_Image | ConnectableTableBlokk_blokk_Link | ConnectableTableBlokk_blokk_Text | ConnectableTableBlokk_blokk_Channel;

export interface ConnectableTableBlokk {
  blokk: ConnectableTableBlokk_blokk | null;
}

export interface ConnectableTableBlokkVariables {
  id: string;
  includeConnection: boolean;
}
