/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProfileContents
// ====================================================

export interface ProfileContents_Group {
  __typename: "Group";
}

export interface ProfileContents_User_contents_Attachment_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
}

export interface ProfileContents_User_contents_Attachment_connection {
  __typename: "Connection";
  can: ProfileContents_User_contents_Attachment_connection_can | null;
}

export interface ProfileContents_User_contents_Attachment_user {
  __typename: "User";
  name: string;
}

export interface ProfileContents_User_contents_Attachment_can {
  __typename: "BlockCan";
  mute: boolean | null;
  remove: boolean | null;
  manage: boolean | null;
}

export interface ProfileContents_User_contents_Attachment_source {
  __typename: "ConnectableSource";
  url: string | null;
  provider_url: string | null;
}

export interface ProfileContents_User_contents_Attachment_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface ProfileContents_User_contents_Attachment {
  __typename: "Attachment";
  id: number;
  href: string | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileContents_User_contents_Attachment_connection | null;
  created_at: string | null;
  updated_at: string | null;
  title: string;
  user: ProfileContents_User_contents_Attachment_user | null;
  can: ProfileContents_User_contents_Attachment_can | null;
  source: ProfileContents_User_contents_Attachment_source | null;
  counts: ProfileContents_User_contents_Attachment_counts | null;
  file_url: string | null;
  image_url: string | null;
}

export interface ProfileContents_User_contents_Embed_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
}

export interface ProfileContents_User_contents_Embed_connection {
  __typename: "Connection";
  can: ProfileContents_User_contents_Embed_connection_can | null;
}

export interface ProfileContents_User_contents_Embed_user {
  __typename: "User";
  name: string;
}

export interface ProfileContents_User_contents_Embed_can {
  __typename: "BlockCan";
  mute: boolean | null;
  remove: boolean | null;
  manage: boolean | null;
}

export interface ProfileContents_User_contents_Embed_source {
  __typename: "ConnectableSource";
  url: string | null;
  provider_url: string | null;
}

export interface ProfileContents_User_contents_Embed_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface ProfileContents_User_contents_Embed {
  __typename: "Embed";
  id: number;
  href: string | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileContents_User_contents_Embed_connection | null;
  created_at: string | null;
  updated_at: string | null;
  title: string;
  user: ProfileContents_User_contents_Embed_user | null;
  can: ProfileContents_User_contents_Embed_can | null;
  source: ProfileContents_User_contents_Embed_source | null;
  counts: ProfileContents_User_contents_Embed_counts | null;
  embed_html: string | null;
  image_url: string | null;
}

export interface ProfileContents_User_contents_Image_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
}

export interface ProfileContents_User_contents_Image_connection {
  __typename: "Connection";
  can: ProfileContents_User_contents_Image_connection_can | null;
}

export interface ProfileContents_User_contents_Image_user {
  __typename: "User";
  name: string;
}

export interface ProfileContents_User_contents_Image_can {
  __typename: "BlockCan";
  mute: boolean | null;
  remove: boolean | null;
  manage: boolean | null;
}

export interface ProfileContents_User_contents_Image_source {
  __typename: "ConnectableSource";
  url: string | null;
  provider_url: string | null;
}

export interface ProfileContents_User_contents_Image_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface ProfileContents_User_contents_Image {
  __typename: "Image";
  id: number;
  href: string | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileContents_User_contents_Image_connection | null;
  created_at: string | null;
  updated_at: string | null;
  title: string;
  user: ProfileContents_User_contents_Image_user | null;
  can: ProfileContents_User_contents_Image_can | null;
  source: ProfileContents_User_contents_Image_source | null;
  find_original_url: string | null;
  counts: ProfileContents_User_contents_Image_counts | null;
  image_url: string | null;
}

export interface ProfileContents_User_contents_Link_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
}

export interface ProfileContents_User_contents_Link_connection {
  __typename: "Connection";
  can: ProfileContents_User_contents_Link_connection_can | null;
}

export interface ProfileContents_User_contents_Link_user {
  __typename: "User";
  name: string;
}

export interface ProfileContents_User_contents_Link_can {
  __typename: "BlockCan";
  mute: boolean | null;
  remove: boolean | null;
  manage: boolean | null;
}

export interface ProfileContents_User_contents_Link_source {
  __typename: "ConnectableSource";
  url: string | null;
  provider_url: string | null;
}

export interface ProfileContents_User_contents_Link_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface ProfileContents_User_contents_Link {
  __typename: "Link";
  id: number;
  href: string | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileContents_User_contents_Link_connection | null;
  created_at: string | null;
  updated_at: string | null;
  title: string;
  user: ProfileContents_User_contents_Link_user | null;
  can: ProfileContents_User_contents_Link_can | null;
  source: ProfileContents_User_contents_Link_source | null;
  counts: ProfileContents_User_contents_Link_counts | null;
  image_url: string | null;
}

export interface ProfileContents_User_contents_PendingBlock_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
}

export interface ProfileContents_User_contents_PendingBlock_connection {
  __typename: "Connection";
  can: ProfileContents_User_contents_PendingBlock_connection_can | null;
}

export interface ProfileContents_User_contents_PendingBlock_user {
  __typename: "User";
  name: string;
}

export interface ProfileContents_User_contents_PendingBlock_can {
  __typename: "BlockCan";
  mute: boolean | null;
  remove: boolean | null;
  manage: boolean | null;
}

export interface ProfileContents_User_contents_PendingBlock_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface ProfileContents_User_contents_PendingBlock {
  __typename: "PendingBlock";
  id: number;
  href: string | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileContents_User_contents_PendingBlock_connection | null;
  created_at: string | null;
  updated_at: string | null;
  title: string;
  user: ProfileContents_User_contents_PendingBlock_user | null;
  can: ProfileContents_User_contents_PendingBlock_can | null;
  counts: ProfileContents_User_contents_PendingBlock_counts | null;
}

export interface ProfileContents_User_contents_Text_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
}

export interface ProfileContents_User_contents_Text_connection {
  __typename: "Connection";
  can: ProfileContents_User_contents_Text_connection_can | null;
}

export interface ProfileContents_User_contents_Text_user {
  __typename: "User";
  name: string;
}

export interface ProfileContents_User_contents_Text_can {
  __typename: "BlockCan";
  mute: boolean | null;
  remove: boolean | null;
  manage: boolean | null;
}

export interface ProfileContents_User_contents_Text_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ProfileContents_User_contents_Text_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface ProfileContents_User_contents_Text {
  __typename: "Text";
  id: number;
  href: string | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileContents_User_contents_Text_connection | null;
  created_at: string | null;
  updated_at: string | null;
  title: string;
  user: ProfileContents_User_contents_Text_user | null;
  can: ProfileContents_User_contents_Text_can | null;
  source: ProfileContents_User_contents_Text_source | null;
  counts: ProfileContents_User_contents_Text_counts | null;
  content: string;
  html: string;
}

export interface ProfileContents_User_contents_Channel_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
}

export interface ProfileContents_User_contents_Channel_connection {
  __typename: "Connection";
  can: ProfileContents_User_contents_Channel_connection_can | null;
}

export interface ProfileContents_User_contents_Channel_user {
  __typename: "User";
  name: string;
}

export interface ProfileContents_User_contents_Channel_can {
  __typename: "ChannelCan";
  mute: boolean | null;
}

export interface ProfileContents_User_contents_Channel_counts {
  __typename: "ChannelCounts";
  connected_to_channels: number | null;
  contents: number | null;
}

export interface ProfileContents_User_contents_Channel {
  __typename: "Channel";
  id: number;
  href: string | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileContents_User_contents_Channel_connection | null;
  created_at: string | null;
  updated_at: string | null;
  title: string;
  user: ProfileContents_User_contents_Channel_user | null;
  can: ProfileContents_User_contents_Channel_can | null;
  visibility: string;
  counts: ProfileContents_User_contents_Channel_counts | null;
}

export type ProfileContents_User_contents = ProfileContents_User_contents_Attachment | ProfileContents_User_contents_Embed | ProfileContents_User_contents_Image | ProfileContents_User_contents_Link | ProfileContents_User_contents_PendingBlock | ProfileContents_User_contents_Text | ProfileContents_User_contents_Channel;

export interface ProfileContents_User {
  __typename: "User";
  id: number;
  name: string;
  contents: ProfileContents_User_contents[] | null;
}

export type ProfileContents = ProfileContents_Group | ProfileContents_User;
