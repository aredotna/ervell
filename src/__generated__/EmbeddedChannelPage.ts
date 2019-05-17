/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: EmbeddedChannelPage
// ====================================================

export interface EmbeddedChannelPage_channel_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
}

export interface EmbeddedChannelPage_channel_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  href: string | null;
}

export type EmbeddedChannelPage_channel_owner = EmbeddedChannelPage_channel_owner_User | EmbeddedChannelPage_channel_owner_Group;

export interface EmbeddedChannelPage_channel_contents_Text_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface EmbeddedChannelPage_channel_contents_Text_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface EmbeddedChannelPage_channel_contents_Text_connection {
  __typename: "Connection";
  created_at: string | null;
  user: EmbeddedChannelPage_channel_contents_Text_connection_user | null;
}

export interface EmbeddedChannelPage_channel_contents_Text_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface EmbeddedChannelPage_channel_contents_Text_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface EmbeddedChannelPage_channel_contents_Text {
  __typename: "Text";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: EmbeddedChannelPage_channel_contents_Text_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: EmbeddedChannelPage_channel_contents_Text_connection | null;
  source: EmbeddedChannelPage_channel_contents_Text_source | null;
  counts: EmbeddedChannelPage_channel_contents_Text_counts | null;
  content: string | null;
}

export interface EmbeddedChannelPage_channel_contents_Image_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface EmbeddedChannelPage_channel_contents_Image_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface EmbeddedChannelPage_channel_contents_Image_connection {
  __typename: "Connection";
  created_at: string | null;
  user: EmbeddedChannelPage_channel_contents_Image_connection_user | null;
}

export interface EmbeddedChannelPage_channel_contents_Image_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface EmbeddedChannelPage_channel_contents_Image_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface EmbeddedChannelPage_channel_contents_Image {
  __typename: "Image";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: EmbeddedChannelPage_channel_contents_Image_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: EmbeddedChannelPage_channel_contents_Image_connection | null;
  source: EmbeddedChannelPage_channel_contents_Image_source | null;
  counts: EmbeddedChannelPage_channel_contents_Image_counts | null;
  src: string | null;
}

export interface EmbeddedChannelPage_channel_contents_Link_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface EmbeddedChannelPage_channel_contents_Link_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface EmbeddedChannelPage_channel_contents_Link_connection {
  __typename: "Connection";
  created_at: string | null;
  user: EmbeddedChannelPage_channel_contents_Link_connection_user | null;
}

export interface EmbeddedChannelPage_channel_contents_Link_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface EmbeddedChannelPage_channel_contents_Link_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface EmbeddedChannelPage_channel_contents_Link {
  __typename: "Link";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: EmbeddedChannelPage_channel_contents_Link_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: EmbeddedChannelPage_channel_contents_Link_connection | null;
  source: EmbeddedChannelPage_channel_contents_Link_source | null;
  counts: EmbeddedChannelPage_channel_contents_Link_counts | null;
  src: string | null;
  external_url: string | null;
}

export interface EmbeddedChannelPage_channel_contents_Embed_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface EmbeddedChannelPage_channel_contents_Embed_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface EmbeddedChannelPage_channel_contents_Embed_connection {
  __typename: "Connection";
  created_at: string | null;
  user: EmbeddedChannelPage_channel_contents_Embed_connection_user | null;
}

export interface EmbeddedChannelPage_channel_contents_Embed_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface EmbeddedChannelPage_channel_contents_Embed_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface EmbeddedChannelPage_channel_contents_Embed {
  __typename: "Embed";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: EmbeddedChannelPage_channel_contents_Embed_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: EmbeddedChannelPage_channel_contents_Embed_connection | null;
  source: EmbeddedChannelPage_channel_contents_Embed_source | null;
  counts: EmbeddedChannelPage_channel_contents_Embed_counts | null;
  src: string | null;
}

export interface EmbeddedChannelPage_channel_contents_Attachment_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface EmbeddedChannelPage_channel_contents_Attachment_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface EmbeddedChannelPage_channel_contents_Attachment_connection {
  __typename: "Connection";
  created_at: string | null;
  user: EmbeddedChannelPage_channel_contents_Attachment_connection_user | null;
}

export interface EmbeddedChannelPage_channel_contents_Attachment_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface EmbeddedChannelPage_channel_contents_Attachment_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface EmbeddedChannelPage_channel_contents_Attachment {
  __typename: "Attachment";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: EmbeddedChannelPage_channel_contents_Attachment_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: EmbeddedChannelPage_channel_contents_Attachment_connection | null;
  source: EmbeddedChannelPage_channel_contents_Attachment_source | null;
  counts: EmbeddedChannelPage_channel_contents_Attachment_counts | null;
  src: string | null;
  file_extension: string | null;
}

export interface EmbeddedChannelPage_channel_contents_PendingBlock_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface EmbeddedChannelPage_channel_contents_PendingBlock_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface EmbeddedChannelPage_channel_contents_PendingBlock_connection {
  __typename: "Connection";
  created_at: string | null;
  user: EmbeddedChannelPage_channel_contents_PendingBlock_connection_user | null;
}

export interface EmbeddedChannelPage_channel_contents_PendingBlock_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface EmbeddedChannelPage_channel_contents_PendingBlock_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface EmbeddedChannelPage_channel_contents_PendingBlock {
  __typename: "PendingBlock";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: EmbeddedChannelPage_channel_contents_PendingBlock_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: EmbeddedChannelPage_channel_contents_PendingBlock_connection | null;
  source: EmbeddedChannelPage_channel_contents_PendingBlock_source | null;
  counts: EmbeddedChannelPage_channel_contents_PendingBlock_counts | null;
}

export interface EmbeddedChannelPage_channel_contents_Channel_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface EmbeddedChannelPage_channel_contents_Channel_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface EmbeddedChannelPage_channel_contents_Channel_connection {
  __typename: "Connection";
  created_at: string | null;
  user: EmbeddedChannelPage_channel_contents_Channel_connection_user | null;
}

export interface EmbeddedChannelPage_channel_contents_Channel_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface EmbeddedChannelPage_channel_contents_Channel_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface EmbeddedChannelPage_channel_contents_Channel_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  visibility: string | null;
}

export interface EmbeddedChannelPage_channel_contents_Channel_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export type EmbeddedChannelPage_channel_contents_Channel_owner = EmbeddedChannelPage_channel_contents_Channel_owner_Group | EmbeddedChannelPage_channel_contents_Channel_owner_User;

export interface EmbeddedChannelPage_channel_contents_Channel {
  __typename: "Channel";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: EmbeddedChannelPage_channel_contents_Channel_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: EmbeddedChannelPage_channel_contents_Channel_connection | null;
  source: EmbeddedChannelPage_channel_contents_Channel_source | null;
  truncatedTitle: string | null;
  visibility: string | null;
  counts: EmbeddedChannelPage_channel_contents_Channel_counts | null;
  owner: EmbeddedChannelPage_channel_contents_Channel_owner | null;
}

export type EmbeddedChannelPage_channel_contents = EmbeddedChannelPage_channel_contents_Text | EmbeddedChannelPage_channel_contents_Image | EmbeddedChannelPage_channel_contents_Link | EmbeddedChannelPage_channel_contents_Embed | EmbeddedChannelPage_channel_contents_Attachment | EmbeddedChannelPage_channel_contents_PendingBlock | EmbeddedChannelPage_channel_contents_Channel;

export interface EmbeddedChannelPage_channel {
  __typename: "Channel";
  id: number | null;
  title: string | null;
  truncatedTitle: string | null;
  href: string | null;
  visibility: string | null;
  owner: EmbeddedChannelPage_channel_owner | null;
  contents: (EmbeddedChannelPage_channel_contents | null)[] | null;
}

export interface EmbeddedChannelPage {
  /**
   * A single channel
   */
  channel: EmbeddedChannelPage_channel | null;
}

export interface EmbeddedChannelPageVariables {
  id: string;
}
