/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: EmbeddedChannelContents
// ====================================================

export interface EmbeddedChannelContents_contents_Text_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface EmbeddedChannelContents_contents_Text_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface EmbeddedChannelContents_contents_Text_connection {
  __typename: "Connection";
  created_at: string | null;
  user: EmbeddedChannelContents_contents_Text_connection_user | null;
}

export interface EmbeddedChannelContents_contents_Text_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface EmbeddedChannelContents_contents_Text_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface EmbeddedChannelContents_contents_Text {
  __typename: "Text";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: EmbeddedChannelContents_contents_Text_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: EmbeddedChannelContents_contents_Text_connection | null;
  source: EmbeddedChannelContents_contents_Text_source | null;
  counts: EmbeddedChannelContents_contents_Text_counts | null;
  content: string | null;
}

export interface EmbeddedChannelContents_contents_Image_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface EmbeddedChannelContents_contents_Image_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface EmbeddedChannelContents_contents_Image_connection {
  __typename: "Connection";
  created_at: string | null;
  user: EmbeddedChannelContents_contents_Image_connection_user | null;
}

export interface EmbeddedChannelContents_contents_Image_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface EmbeddedChannelContents_contents_Image_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface EmbeddedChannelContents_contents_Image {
  __typename: "Image";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: EmbeddedChannelContents_contents_Image_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: EmbeddedChannelContents_contents_Image_connection | null;
  source: EmbeddedChannelContents_contents_Image_source | null;
  counts: EmbeddedChannelContents_contents_Image_counts | null;
  src: string | null;
}

export interface EmbeddedChannelContents_contents_Link_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface EmbeddedChannelContents_contents_Link_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface EmbeddedChannelContents_contents_Link_connection {
  __typename: "Connection";
  created_at: string | null;
  user: EmbeddedChannelContents_contents_Link_connection_user | null;
}

export interface EmbeddedChannelContents_contents_Link_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface EmbeddedChannelContents_contents_Link_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface EmbeddedChannelContents_contents_Link {
  __typename: "Link";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: EmbeddedChannelContents_contents_Link_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: EmbeddedChannelContents_contents_Link_connection | null;
  source: EmbeddedChannelContents_contents_Link_source | null;
  counts: EmbeddedChannelContents_contents_Link_counts | null;
  src: string | null;
  external_url: string | null;
}

export interface EmbeddedChannelContents_contents_Embed_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface EmbeddedChannelContents_contents_Embed_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface EmbeddedChannelContents_contents_Embed_connection {
  __typename: "Connection";
  created_at: string | null;
  user: EmbeddedChannelContents_contents_Embed_connection_user | null;
}

export interface EmbeddedChannelContents_contents_Embed_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface EmbeddedChannelContents_contents_Embed_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface EmbeddedChannelContents_contents_Embed {
  __typename: "Embed";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: EmbeddedChannelContents_contents_Embed_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: EmbeddedChannelContents_contents_Embed_connection | null;
  source: EmbeddedChannelContents_contents_Embed_source | null;
  counts: EmbeddedChannelContents_contents_Embed_counts | null;
  src: string | null;
}

export interface EmbeddedChannelContents_contents_Attachment_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface EmbeddedChannelContents_contents_Attachment_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface EmbeddedChannelContents_contents_Attachment_connection {
  __typename: "Connection";
  created_at: string | null;
  user: EmbeddedChannelContents_contents_Attachment_connection_user | null;
}

export interface EmbeddedChannelContents_contents_Attachment_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface EmbeddedChannelContents_contents_Attachment_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface EmbeddedChannelContents_contents_Attachment {
  __typename: "Attachment";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: EmbeddedChannelContents_contents_Attachment_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: EmbeddedChannelContents_contents_Attachment_connection | null;
  source: EmbeddedChannelContents_contents_Attachment_source | null;
  counts: EmbeddedChannelContents_contents_Attachment_counts | null;
  src: string | null;
  file_extension: string | null;
}

export interface EmbeddedChannelContents_contents_PendingBlock_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface EmbeddedChannelContents_contents_PendingBlock_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface EmbeddedChannelContents_contents_PendingBlock_connection {
  __typename: "Connection";
  created_at: string | null;
  user: EmbeddedChannelContents_contents_PendingBlock_connection_user | null;
}

export interface EmbeddedChannelContents_contents_PendingBlock_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface EmbeddedChannelContents_contents_PendingBlock_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface EmbeddedChannelContents_contents_PendingBlock {
  __typename: "PendingBlock";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: EmbeddedChannelContents_contents_PendingBlock_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: EmbeddedChannelContents_contents_PendingBlock_connection | null;
  source: EmbeddedChannelContents_contents_PendingBlock_source | null;
  counts: EmbeddedChannelContents_contents_PendingBlock_counts | null;
}

export interface EmbeddedChannelContents_contents_Channel_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface EmbeddedChannelContents_contents_Channel_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface EmbeddedChannelContents_contents_Channel_connection {
  __typename: "Connection";
  created_at: string | null;
  user: EmbeddedChannelContents_contents_Channel_connection_user | null;
}

export interface EmbeddedChannelContents_contents_Channel_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface EmbeddedChannelContents_contents_Channel_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface EmbeddedChannelContents_contents_Channel_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  visibility: string | null;
}

export interface EmbeddedChannelContents_contents_Channel_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export type EmbeddedChannelContents_contents_Channel_owner = EmbeddedChannelContents_contents_Channel_owner_Group | EmbeddedChannelContents_contents_Channel_owner_User;

export interface EmbeddedChannelContents_contents_Channel {
  __typename: "Channel";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: EmbeddedChannelContents_contents_Channel_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: EmbeddedChannelContents_contents_Channel_connection | null;
  source: EmbeddedChannelContents_contents_Channel_source | null;
  truncatedTitle: string | null;
  visibility: string | null;
  counts: EmbeddedChannelContents_contents_Channel_counts | null;
  owner: EmbeddedChannelContents_contents_Channel_owner | null;
}

export type EmbeddedChannelContents_contents = EmbeddedChannelContents_contents_Text | EmbeddedChannelContents_contents_Image | EmbeddedChannelContents_contents_Link | EmbeddedChannelContents_contents_Embed | EmbeddedChannelContents_contents_Attachment | EmbeddedChannelContents_contents_PendingBlock | EmbeddedChannelContents_contents_Channel;

export interface EmbeddedChannelContents {
  __typename: "Channel";
  id: number | null;
  contents: (EmbeddedChannelContents_contents | null)[] | null;
}
