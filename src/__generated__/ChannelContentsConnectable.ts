/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ChannelContentsConnectable
// ====================================================

export interface ChannelContentsConnectable_Attachment_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelContentsConnectable_Attachment_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelContentsConnectable_Attachment_connection {
  __typename: "Connection";
  created_at: string;
  user: ChannelContentsConnectable_Attachment_connection_user | null;
}

export interface ChannelContentsConnectable_Attachment_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelContentsConnectable_Attachment_counts {
  __typename: "BlockCounts";
  comments: number;
}

export interface ChannelContentsConnectable_Attachment {
  __typename: "Attachment";
  id: number;
  href: string;
  updated_at: string;
  title: string;
  user: ChannelContentsConnectable_Attachment_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelContentsConnectable_Attachment_connection | null;
  source: ChannelContentsConnectable_Attachment_source | null;
  counts: ChannelContentsConnectable_Attachment_counts;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  file_extension: string | null;
}

export interface ChannelContentsConnectable_Embed_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelContentsConnectable_Embed_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelContentsConnectable_Embed_connection {
  __typename: "Connection";
  created_at: string;
  user: ChannelContentsConnectable_Embed_connection_user | null;
}

export interface ChannelContentsConnectable_Embed_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelContentsConnectable_Embed_counts {
  __typename: "BlockCounts";
  comments: number;
}

export interface ChannelContentsConnectable_Embed {
  __typename: "Embed";
  id: number;
  href: string;
  updated_at: string;
  title: string;
  user: ChannelContentsConnectable_Embed_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelContentsConnectable_Embed_connection | null;
  source: ChannelContentsConnectable_Embed_source | null;
  counts: ChannelContentsConnectable_Embed_counts;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
}

export interface ChannelContentsConnectable_Image_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelContentsConnectable_Image_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelContentsConnectable_Image_connection {
  __typename: "Connection";
  created_at: string;
  user: ChannelContentsConnectable_Image_connection_user | null;
}

export interface ChannelContentsConnectable_Image_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelContentsConnectable_Image_counts {
  __typename: "BlockCounts";
  comments: number;
}

export interface ChannelContentsConnectable_Image_original_dimensions {
  __typename: "Dimensions";
  width: number | null;
  height: number | null;
}

export interface ChannelContentsConnectable_Image {
  __typename: "Image";
  id: number;
  href: string;
  updated_at: string;
  title: string;
  user: ChannelContentsConnectable_Image_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelContentsConnectable_Image_connection | null;
  source: ChannelContentsConnectable_Image_source | null;
  counts: ChannelContentsConnectable_Image_counts;
  alt_text: string | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  original_dimensions: ChannelContentsConnectable_Image_original_dimensions | null;
}

export interface ChannelContentsConnectable_Link_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelContentsConnectable_Link_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelContentsConnectable_Link_connection {
  __typename: "Connection";
  created_at: string;
  user: ChannelContentsConnectable_Link_connection_user | null;
}

export interface ChannelContentsConnectable_Link_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelContentsConnectable_Link_counts {
  __typename: "BlockCounts";
  comments: number;
}

export interface ChannelContentsConnectable_Link {
  __typename: "Link";
  id: number;
  href: string;
  updated_at: string;
  title: string;
  user: ChannelContentsConnectable_Link_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelContentsConnectable_Link_connection | null;
  source: ChannelContentsConnectable_Link_source | null;
  counts: ChannelContentsConnectable_Link_counts;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  external_url: string | null;
  content: string | null;
  source_url: string | null;
}

export interface ChannelContentsConnectable_PendingBlock_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelContentsConnectable_PendingBlock_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelContentsConnectable_PendingBlock_connection {
  __typename: "Connection";
  created_at: string;
  user: ChannelContentsConnectable_PendingBlock_connection_user | null;
}

export interface ChannelContentsConnectable_PendingBlock_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelContentsConnectable_PendingBlock_counts {
  __typename: "BlockCounts";
  comments: number;
}

export interface ChannelContentsConnectable_PendingBlock {
  __typename: "PendingBlock";
  id: number;
  href: string;
  updated_at: string;
  title: string;
  user: ChannelContentsConnectable_PendingBlock_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelContentsConnectable_PendingBlock_connection | null;
  source: ChannelContentsConnectable_PendingBlock_source | null;
  counts: ChannelContentsConnectable_PendingBlock_counts;
}

export interface ChannelContentsConnectable_Text_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelContentsConnectable_Text_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelContentsConnectable_Text_connection {
  __typename: "Connection";
  created_at: string;
  user: ChannelContentsConnectable_Text_connection_user | null;
}

export interface ChannelContentsConnectable_Text_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelContentsConnectable_Text_counts {
  __typename: "BlockCounts";
  comments: number;
}

export interface ChannelContentsConnectable_Text {
  __typename: "Text";
  id: number;
  href: string;
  updated_at: string;
  title: string;
  user: ChannelContentsConnectable_Text_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelContentsConnectable_Text_connection | null;
  source: ChannelContentsConnectable_Text_source | null;
  counts: ChannelContentsConnectable_Text_counts;
  content: string;
  raw: string;
}

export interface ChannelContentsConnectable_Channel_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelContentsConnectable_Channel_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelContentsConnectable_Channel_connection {
  __typename: "Connection";
  created_at: string;
  user: ChannelContentsConnectable_Channel_connection_user | null;
}

export interface ChannelContentsConnectable_Channel_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelContentsConnectable_Channel_counts {
  __typename: "ChannelCounts";
  contents: number;
}

export interface ChannelContentsConnectable_Channel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface ChannelContentsConnectable_Channel_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type ChannelContentsConnectable_Channel_owner = ChannelContentsConnectable_Channel_owner_Group | ChannelContentsConnectable_Channel_owner_User;

export interface ChannelContentsConnectable_Channel {
  __typename: "Channel";
  id: number;
  href: string;
  updated_at: string;
  title: string;
  user: ChannelContentsConnectable_Channel_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelContentsConnectable_Channel_connection | null;
  source: ChannelContentsConnectable_Channel_source | null;
  truncatedTitle: string;
  visibility: string;
  counts: ChannelContentsConnectable_Channel_counts;
  owner: ChannelContentsConnectable_Channel_owner;
  label: string;
}

export type ChannelContentsConnectable = ChannelContentsConnectable_Attachment | ChannelContentsConnectable_Embed | ChannelContentsConnectable_Image | ChannelContentsConnectable_Link | ChannelContentsConnectable_PendingBlock | ChannelContentsConnectable_Text | ChannelContentsConnectable_Channel;
