/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ChannelContentsConnectable
// ====================================================

export interface ChannelContentsConnectable_Text_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ChannelContentsConnectable_Text_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ChannelContentsConnectable_Text_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
}

export interface ChannelContentsConnectable_Text_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ChannelContentsConnectable_Text_connection_user | null;
  can: ChannelContentsConnectable_Text_connection_can | null;
}

export interface ChannelContentsConnectable_Text_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelContentsConnectable_Text_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ChannelContentsConnectable_Text_can {
  __typename: "BlockCan";
  mute: boolean | null;
  remove: boolean | null;
}

export interface ChannelContentsConnectable_Text {
  __typename: "Text";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: ChannelContentsConnectable_Text_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelContentsConnectable_Text_connection | null;
  source: ChannelContentsConnectable_Text_source | null;
  counts: ChannelContentsConnectable_Text_counts | null;
  content: string | null;
  can: ChannelContentsConnectable_Text_can | null;
}

export interface ChannelContentsConnectable_Image_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ChannelContentsConnectable_Image_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ChannelContentsConnectable_Image_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
}

export interface ChannelContentsConnectable_Image_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ChannelContentsConnectable_Image_connection_user | null;
  can: ChannelContentsConnectable_Image_connection_can | null;
}

export interface ChannelContentsConnectable_Image_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelContentsConnectable_Image_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ChannelContentsConnectable_Image_original_dimensions {
  __typename: "Dimensions";
  width: number | null;
  height: number | null;
}

export interface ChannelContentsConnectable_Image_can {
  __typename: "BlockCan";
  mute: boolean | null;
  remove: boolean | null;
}

export interface ChannelContentsConnectable_Image {
  __typename: "Image";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: ChannelContentsConnectable_Image_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelContentsConnectable_Image_connection | null;
  source: ChannelContentsConnectable_Image_source | null;
  counts: ChannelContentsConnectable_Image_counts | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  original_dimensions: ChannelContentsConnectable_Image_original_dimensions | null;
  can: ChannelContentsConnectable_Image_can | null;
  find_original_url: string | null;
}

export interface ChannelContentsConnectable_Link_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ChannelContentsConnectable_Link_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ChannelContentsConnectable_Link_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
}

export interface ChannelContentsConnectable_Link_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ChannelContentsConnectable_Link_connection_user | null;
  can: ChannelContentsConnectable_Link_connection_can | null;
}

export interface ChannelContentsConnectable_Link_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelContentsConnectable_Link_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ChannelContentsConnectable_Link_can {
  __typename: "BlockCan";
  mute: boolean | null;
  remove: boolean | null;
}

export interface ChannelContentsConnectable_Link {
  __typename: "Link";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: ChannelContentsConnectable_Link_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelContentsConnectable_Link_connection | null;
  source: ChannelContentsConnectable_Link_source | null;
  counts: ChannelContentsConnectable_Link_counts | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  external_url: string | null;
  can: ChannelContentsConnectable_Link_can | null;
}

export interface ChannelContentsConnectable_Embed_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ChannelContentsConnectable_Embed_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ChannelContentsConnectable_Embed_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
}

export interface ChannelContentsConnectable_Embed_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ChannelContentsConnectable_Embed_connection_user | null;
  can: ChannelContentsConnectable_Embed_connection_can | null;
}

export interface ChannelContentsConnectable_Embed_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelContentsConnectable_Embed_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ChannelContentsConnectable_Embed_can {
  __typename: "BlockCan";
  mute: boolean | null;
  remove: boolean | null;
}

export interface ChannelContentsConnectable_Embed {
  __typename: "Embed";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: ChannelContentsConnectable_Embed_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelContentsConnectable_Embed_connection | null;
  source: ChannelContentsConnectable_Embed_source | null;
  counts: ChannelContentsConnectable_Embed_counts | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  can: ChannelContentsConnectable_Embed_can | null;
}

export interface ChannelContentsConnectable_Attachment_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ChannelContentsConnectable_Attachment_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ChannelContentsConnectable_Attachment_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
}

export interface ChannelContentsConnectable_Attachment_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ChannelContentsConnectable_Attachment_connection_user | null;
  can: ChannelContentsConnectable_Attachment_connection_can | null;
}

export interface ChannelContentsConnectable_Attachment_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelContentsConnectable_Attachment_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ChannelContentsConnectable_Attachment_can {
  __typename: "BlockCan";
  mute: boolean | null;
  remove: boolean | null;
}

export interface ChannelContentsConnectable_Attachment {
  __typename: "Attachment";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: ChannelContentsConnectable_Attachment_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelContentsConnectable_Attachment_connection | null;
  source: ChannelContentsConnectable_Attachment_source | null;
  counts: ChannelContentsConnectable_Attachment_counts | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  file_extension: string | null;
  can: ChannelContentsConnectable_Attachment_can | null;
}

export interface ChannelContentsConnectable_PendingBlock_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ChannelContentsConnectable_PendingBlock_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ChannelContentsConnectable_PendingBlock_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
}

export interface ChannelContentsConnectable_PendingBlock_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ChannelContentsConnectable_PendingBlock_connection_user | null;
  can: ChannelContentsConnectable_PendingBlock_connection_can | null;
}

export interface ChannelContentsConnectable_PendingBlock_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelContentsConnectable_PendingBlock_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ChannelContentsConnectable_PendingBlock_can {
  __typename: "BlockCan";
  mute: boolean | null;
  remove: boolean | null;
}

export interface ChannelContentsConnectable_PendingBlock {
  __typename: "PendingBlock";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: ChannelContentsConnectable_PendingBlock_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelContentsConnectable_PendingBlock_connection | null;
  source: ChannelContentsConnectable_PendingBlock_source | null;
  counts: ChannelContentsConnectable_PendingBlock_counts | null;
  can: ChannelContentsConnectable_PendingBlock_can | null;
}

export interface ChannelContentsConnectable_Channel_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ChannelContentsConnectable_Channel_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ChannelContentsConnectable_Channel_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
}

export interface ChannelContentsConnectable_Channel_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ChannelContentsConnectable_Channel_connection_user | null;
  can: ChannelContentsConnectable_Channel_connection_can | null;
}

export interface ChannelContentsConnectable_Channel_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelContentsConnectable_Channel_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface ChannelContentsConnectable_Channel_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  visibility: string | null;
}

export interface ChannelContentsConnectable_Channel_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export type ChannelContentsConnectable_Channel_owner = ChannelContentsConnectable_Channel_owner_Group | ChannelContentsConnectable_Channel_owner_User;

export interface ChannelContentsConnectable_Channel_can {
  __typename: "ChannelCan";
  mute: boolean | null;
}

export interface ChannelContentsConnectable_Channel {
  __typename: "Channel";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: ChannelContentsConnectable_Channel_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelContentsConnectable_Channel_connection | null;
  source: ChannelContentsConnectable_Channel_source | null;
  truncatedTitle: string | null;
  visibility: string | null;
  counts: ChannelContentsConnectable_Channel_counts | null;
  owner: ChannelContentsConnectable_Channel_owner | null;
  label: string | null;
  can: ChannelContentsConnectable_Channel_can | null;
}

export type ChannelContentsConnectable = ChannelContentsConnectable_Text | ChannelContentsConnectable_Image | ChannelContentsConnectable_Link | ChannelContentsConnectable_Embed | ChannelContentsConnectable_Attachment | ChannelContentsConnectable_PendingBlock | ChannelContentsConnectable_Channel;
