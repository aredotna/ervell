/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ConnectableBlokk
// ====================================================

export interface ConnectableBlokk_blokk_Attachment_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ConnectableBlokk_blokk_Attachment_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ConnectableBlokk_blokk_Attachment_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
}

export interface ConnectableBlokk_blokk_Attachment_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ConnectableBlokk_blokk_Attachment_connection_user | null;
  can: ConnectableBlokk_blokk_Attachment_connection_can | null;
}

export interface ConnectableBlokk_blokk_Attachment_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ConnectableBlokk_blokk_Attachment_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ConnectableBlokk_blokk_Attachment_can {
  __typename: "BlockCan";
  mute: boolean | null;
  remove: boolean | null;
  manage: boolean | null;
}

export interface ConnectableBlokk_blokk_Attachment {
  __typename: "Attachment";
  id: number;
  href: string | null;
  updated_at: string | null;
  title: string;
  user: ConnectableBlokk_blokk_Attachment_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ConnectableBlokk_blokk_Attachment_connection | null;
  source: ConnectableBlokk_blokk_Attachment_source | null;
  counts: ConnectableBlokk_blokk_Attachment_counts | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  file_extension: string | null;
  can: ConnectableBlokk_blokk_Attachment_can | null;
}

export interface ConnectableBlokk_blokk_Embed_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ConnectableBlokk_blokk_Embed_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ConnectableBlokk_blokk_Embed_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
}

export interface ConnectableBlokk_blokk_Embed_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ConnectableBlokk_blokk_Embed_connection_user | null;
  can: ConnectableBlokk_blokk_Embed_connection_can | null;
}

export interface ConnectableBlokk_blokk_Embed_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ConnectableBlokk_blokk_Embed_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ConnectableBlokk_blokk_Embed_can {
  __typename: "BlockCan";
  mute: boolean | null;
  remove: boolean | null;
  manage: boolean | null;
}

export interface ConnectableBlokk_blokk_Embed {
  __typename: "Embed";
  id: number;
  href: string | null;
  updated_at: string | null;
  title: string;
  user: ConnectableBlokk_blokk_Embed_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ConnectableBlokk_blokk_Embed_connection | null;
  source: ConnectableBlokk_blokk_Embed_source | null;
  counts: ConnectableBlokk_blokk_Embed_counts | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  can: ConnectableBlokk_blokk_Embed_can | null;
}

export interface ConnectableBlokk_blokk_Image_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ConnectableBlokk_blokk_Image_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ConnectableBlokk_blokk_Image_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
}

export interface ConnectableBlokk_blokk_Image_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ConnectableBlokk_blokk_Image_connection_user | null;
  can: ConnectableBlokk_blokk_Image_connection_can | null;
}

export interface ConnectableBlokk_blokk_Image_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ConnectableBlokk_blokk_Image_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ConnectableBlokk_blokk_Image_original_dimensions {
  __typename: "Dimensions";
  width: number | null;
  height: number | null;
}

export interface ConnectableBlokk_blokk_Image_can {
  __typename: "BlockCan";
  mute: boolean | null;
  remove: boolean | null;
  manage: boolean | null;
}

export interface ConnectableBlokk_blokk_Image {
  __typename: "Image";
  id: number;
  href: string | null;
  updated_at: string | null;
  title: string;
  user: ConnectableBlokk_blokk_Image_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ConnectableBlokk_blokk_Image_connection | null;
  source: ConnectableBlokk_blokk_Image_source | null;
  counts: ConnectableBlokk_blokk_Image_counts | null;
  alt_text: string | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  original_dimensions: ConnectableBlokk_blokk_Image_original_dimensions | null;
  can: ConnectableBlokk_blokk_Image_can | null;
  /**
   * URL to find the original image on various services
   */
  find_original_url: string | null;
}

export interface ConnectableBlokk_blokk_Link_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ConnectableBlokk_blokk_Link_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ConnectableBlokk_blokk_Link_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
}

export interface ConnectableBlokk_blokk_Link_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ConnectableBlokk_blokk_Link_connection_user | null;
  can: ConnectableBlokk_blokk_Link_connection_can | null;
}

export interface ConnectableBlokk_blokk_Link_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ConnectableBlokk_blokk_Link_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ConnectableBlokk_blokk_Link_can {
  __typename: "BlockCan";
  mute: boolean | null;
  remove: boolean | null;
  manage: boolean | null;
}

export interface ConnectableBlokk_blokk_Link {
  __typename: "Link";
  id: number;
  href: string | null;
  updated_at: string | null;
  title: string;
  user: ConnectableBlokk_blokk_Link_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ConnectableBlokk_blokk_Link_connection | null;
  source: ConnectableBlokk_blokk_Link_source | null;
  counts: ConnectableBlokk_blokk_Link_counts | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  external_url: string | null;
  content: string | null;
  source_url: string | null;
  can: ConnectableBlokk_blokk_Link_can | null;
}

export interface ConnectableBlokk_blokk_PendingBlock_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ConnectableBlokk_blokk_PendingBlock_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ConnectableBlokk_blokk_PendingBlock_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
}

export interface ConnectableBlokk_blokk_PendingBlock_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ConnectableBlokk_blokk_PendingBlock_connection_user | null;
  can: ConnectableBlokk_blokk_PendingBlock_connection_can | null;
}

export interface ConnectableBlokk_blokk_PendingBlock_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ConnectableBlokk_blokk_PendingBlock_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ConnectableBlokk_blokk_PendingBlock_can {
  __typename: "BlockCan";
  mute: boolean | null;
  remove: boolean | null;
  manage: boolean | null;
}

export interface ConnectableBlokk_blokk_PendingBlock {
  __typename: "PendingBlock";
  id: number;
  href: string | null;
  updated_at: string | null;
  title: string;
  user: ConnectableBlokk_blokk_PendingBlock_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ConnectableBlokk_blokk_PendingBlock_connection | null;
  source: ConnectableBlokk_blokk_PendingBlock_source | null;
  counts: ConnectableBlokk_blokk_PendingBlock_counts | null;
  can: ConnectableBlokk_blokk_PendingBlock_can | null;
}

export interface ConnectableBlokk_blokk_Text_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ConnectableBlokk_blokk_Text_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ConnectableBlokk_blokk_Text_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
}

export interface ConnectableBlokk_blokk_Text_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ConnectableBlokk_blokk_Text_connection_user | null;
  can: ConnectableBlokk_blokk_Text_connection_can | null;
}

export interface ConnectableBlokk_blokk_Text_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ConnectableBlokk_blokk_Text_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ConnectableBlokk_blokk_Text_can {
  __typename: "BlockCan";
  mute: boolean | null;
  remove: boolean | null;
  manage: boolean | null;
}

export interface ConnectableBlokk_blokk_Text {
  __typename: "Text";
  id: number;
  href: string | null;
  updated_at: string | null;
  title: string;
  user: ConnectableBlokk_blokk_Text_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ConnectableBlokk_blokk_Text_connection | null;
  source: ConnectableBlokk_blokk_Text_source | null;
  counts: ConnectableBlokk_blokk_Text_counts | null;
  content: string;
  raw: string;
  can: ConnectableBlokk_blokk_Text_can | null;
}

export interface ConnectableBlokk_blokk_Channel_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ConnectableBlokk_blokk_Channel_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ConnectableBlokk_blokk_Channel_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
}

export interface ConnectableBlokk_blokk_Channel_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ConnectableBlokk_blokk_Channel_connection_user | null;
  can: ConnectableBlokk_blokk_Channel_connection_can | null;
}

export interface ConnectableBlokk_blokk_Channel_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ConnectableBlokk_blokk_Channel_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface ConnectableBlokk_blokk_Channel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface ConnectableBlokk_blokk_Channel_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type ConnectableBlokk_blokk_Channel_owner = ConnectableBlokk_blokk_Channel_owner_Group | ConnectableBlokk_blokk_Channel_owner_User;

export interface ConnectableBlokk_blokk_Channel_can {
  __typename: "ChannelCan";
  mute: boolean | null;
}

export interface ConnectableBlokk_blokk_Channel {
  __typename: "Channel";
  id: number;
  href: string | null;
  updated_at: string | null;
  title: string;
  user: ConnectableBlokk_blokk_Channel_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ConnectableBlokk_blokk_Channel_connection | null;
  source: ConnectableBlokk_blokk_Channel_source | null;
  truncatedTitle: string;
  visibility: string;
  counts: ConnectableBlokk_blokk_Channel_counts | null;
  owner: ConnectableBlokk_blokk_Channel_owner;
  label: string;
  can: ConnectableBlokk_blokk_Channel_can | null;
}

export type ConnectableBlokk_blokk = ConnectableBlokk_blokk_Attachment | ConnectableBlokk_blokk_Embed | ConnectableBlokk_blokk_Image | ConnectableBlokk_blokk_Link | ConnectableBlokk_blokk_PendingBlock | ConnectableBlokk_blokk_Text | ConnectableBlokk_blokk_Channel;

export interface ConnectableBlokk {
  blokk: ConnectableBlokk_blokk | null;
}

export interface ConnectableBlokkVariables {
  id: string;
}
