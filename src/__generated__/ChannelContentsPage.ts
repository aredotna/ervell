/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ChannelContentsPage
// ====================================================

export interface ChannelContentsPage_channel_contents_Text_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ChannelContentsPage_channel_contents_Text_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ChannelContentsPage_channel_contents_Text_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ChannelContentsPage_channel_contents_Text_connection_user | null;
}

export interface ChannelContentsPage_channel_contents_Text_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelContentsPage_channel_contents_Text_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ChannelContentsPage_channel_contents_Text {
  __typename: "Text";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: ChannelContentsPage_channel_contents_Text_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelContentsPage_channel_contents_Text_connection | null;
  source: ChannelContentsPage_channel_contents_Text_source | null;
  counts: ChannelContentsPage_channel_contents_Text_counts | null;
  content: string | null;
}

export interface ChannelContentsPage_channel_contents_Image_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ChannelContentsPage_channel_contents_Image_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ChannelContentsPage_channel_contents_Image_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ChannelContentsPage_channel_contents_Image_connection_user | null;
}

export interface ChannelContentsPage_channel_contents_Image_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelContentsPage_channel_contents_Image_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ChannelContentsPage_channel_contents_Image {
  __typename: "Image";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: ChannelContentsPage_channel_contents_Image_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelContentsPage_channel_contents_Image_connection | null;
  source: ChannelContentsPage_channel_contents_Image_source | null;
  counts: ChannelContentsPage_channel_contents_Image_counts | null;
  src: string | null;
}

export interface ChannelContentsPage_channel_contents_Link_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ChannelContentsPage_channel_contents_Link_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ChannelContentsPage_channel_contents_Link_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ChannelContentsPage_channel_contents_Link_connection_user | null;
}

export interface ChannelContentsPage_channel_contents_Link_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelContentsPage_channel_contents_Link_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ChannelContentsPage_channel_contents_Link {
  __typename: "Link";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: ChannelContentsPage_channel_contents_Link_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelContentsPage_channel_contents_Link_connection | null;
  source: ChannelContentsPage_channel_contents_Link_source | null;
  counts: ChannelContentsPage_channel_contents_Link_counts | null;
  src: string | null;
  external_url: string | null;
}

export interface ChannelContentsPage_channel_contents_Embed_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ChannelContentsPage_channel_contents_Embed_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ChannelContentsPage_channel_contents_Embed_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ChannelContentsPage_channel_contents_Embed_connection_user | null;
}

export interface ChannelContentsPage_channel_contents_Embed_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelContentsPage_channel_contents_Embed_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ChannelContentsPage_channel_contents_Embed {
  __typename: "Embed";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: ChannelContentsPage_channel_contents_Embed_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelContentsPage_channel_contents_Embed_connection | null;
  source: ChannelContentsPage_channel_contents_Embed_source | null;
  counts: ChannelContentsPage_channel_contents_Embed_counts | null;
  src: string | null;
}

export interface ChannelContentsPage_channel_contents_Attachment_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ChannelContentsPage_channel_contents_Attachment_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ChannelContentsPage_channel_contents_Attachment_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ChannelContentsPage_channel_contents_Attachment_connection_user | null;
}

export interface ChannelContentsPage_channel_contents_Attachment_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelContentsPage_channel_contents_Attachment_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ChannelContentsPage_channel_contents_Attachment {
  __typename: "Attachment";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: ChannelContentsPage_channel_contents_Attachment_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelContentsPage_channel_contents_Attachment_connection | null;
  source: ChannelContentsPage_channel_contents_Attachment_source | null;
  counts: ChannelContentsPage_channel_contents_Attachment_counts | null;
  src: string | null;
  file_extension: string | null;
}

export interface ChannelContentsPage_channel_contents_PendingBlock_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ChannelContentsPage_channel_contents_PendingBlock_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ChannelContentsPage_channel_contents_PendingBlock_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ChannelContentsPage_channel_contents_PendingBlock_connection_user | null;
}

export interface ChannelContentsPage_channel_contents_PendingBlock_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelContentsPage_channel_contents_PendingBlock_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ChannelContentsPage_channel_contents_PendingBlock {
  __typename: "PendingBlock";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: ChannelContentsPage_channel_contents_PendingBlock_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelContentsPage_channel_contents_PendingBlock_connection | null;
  source: ChannelContentsPage_channel_contents_PendingBlock_source | null;
  counts: ChannelContentsPage_channel_contents_PendingBlock_counts | null;
}

export interface ChannelContentsPage_channel_contents_Channel_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ChannelContentsPage_channel_contents_Channel_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ChannelContentsPage_channel_contents_Channel_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ChannelContentsPage_channel_contents_Channel_connection_user | null;
}

export interface ChannelContentsPage_channel_contents_Channel_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelContentsPage_channel_contents_Channel_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface ChannelContentsPage_channel_contents_Channel_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  visibility: string | null;
}

export interface ChannelContentsPage_channel_contents_Channel_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export type ChannelContentsPage_channel_contents_Channel_owner = ChannelContentsPage_channel_contents_Channel_owner_Group | ChannelContentsPage_channel_contents_Channel_owner_User;

export interface ChannelContentsPage_channel_contents_Channel {
  __typename: "Channel";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: ChannelContentsPage_channel_contents_Channel_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelContentsPage_channel_contents_Channel_connection | null;
  source: ChannelContentsPage_channel_contents_Channel_source | null;
  truncatedTitle: string | null;
  visibility: string | null;
  counts: ChannelContentsPage_channel_contents_Channel_counts | null;
  owner: ChannelContentsPage_channel_contents_Channel_owner | null;
}

export type ChannelContentsPage_channel_contents = ChannelContentsPage_channel_contents_Text | ChannelContentsPage_channel_contents_Image | ChannelContentsPage_channel_contents_Link | ChannelContentsPage_channel_contents_Embed | ChannelContentsPage_channel_contents_Attachment | ChannelContentsPage_channel_contents_PendingBlock | ChannelContentsPage_channel_contents_Channel;

export interface ChannelContentsPage_channel {
  __typename: "Channel";
  id: number | null;
  contents: (ChannelContentsPage_channel_contents | null)[] | null;
}

export interface ChannelContentsPage {
  /**
   * A single channel
   */
  channel: ChannelContentsPage_channel | null;
}

export interface ChannelContentsPageVariables {
  id: string;
  per: number;
  page: number;
}
