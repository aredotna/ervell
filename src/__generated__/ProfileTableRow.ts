/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProfileTableRow
// ====================================================

export interface ProfileTableRow_Attachment_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
}

export interface ProfileTableRow_Attachment_connection {
  __typename: "Connection";
  can: ProfileTableRow_Attachment_connection_can | null;
}

export interface ProfileTableRow_Attachment_can {
  __typename: "BlockCan";
  mute: boolean | null;
  remove: boolean | null;
  manage: boolean | null;
}

export interface ProfileTableRow_Attachment_source {
  __typename: "ConnectableSource";
  url: string | null;
  provider_url: string | null;
}

export interface ProfileTableRow_Attachment_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface ProfileTableRow_Attachment_user {
  __typename: "User";
  name: string;
}

export interface ProfileTableRow_Attachment {
  __typename: "Attachment";
  id: number;
  href: string | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileTableRow_Attachment_connection | null;
  can: ProfileTableRow_Attachment_can | null;
  source: ProfileTableRow_Attachment_source | null;
  counts: ProfileTableRow_Attachment_counts | null;
  created_at: string | null;
  updated_at: string | null;
  file_url: string | null;
  image_url: string | null;
  title: string;
  user: ProfileTableRow_Attachment_user | null;
}

export interface ProfileTableRow_Embed_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
}

export interface ProfileTableRow_Embed_connection {
  __typename: "Connection";
  can: ProfileTableRow_Embed_connection_can | null;
}

export interface ProfileTableRow_Embed_can {
  __typename: "BlockCan";
  mute: boolean | null;
  remove: boolean | null;
  manage: boolean | null;
}

export interface ProfileTableRow_Embed_source {
  __typename: "ConnectableSource";
  url: string | null;
  provider_url: string | null;
}

export interface ProfileTableRow_Embed_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface ProfileTableRow_Embed_user {
  __typename: "User";
  name: string;
}

export interface ProfileTableRow_Embed {
  __typename: "Embed";
  id: number;
  href: string | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileTableRow_Embed_connection | null;
  can: ProfileTableRow_Embed_can | null;
  source: ProfileTableRow_Embed_source | null;
  counts: ProfileTableRow_Embed_counts | null;
  created_at: string | null;
  updated_at: string | null;
  embed_html: string | null;
  image_url: string | null;
  title: string;
  user: ProfileTableRow_Embed_user | null;
}

export interface ProfileTableRow_Image_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
}

export interface ProfileTableRow_Image_connection {
  __typename: "Connection";
  can: ProfileTableRow_Image_connection_can | null;
}

export interface ProfileTableRow_Image_can {
  __typename: "BlockCan";
  mute: boolean | null;
  remove: boolean | null;
  manage: boolean | null;
}

export interface ProfileTableRow_Image_source {
  __typename: "ConnectableSource";
  url: string | null;
  provider_url: string | null;
}

export interface ProfileTableRow_Image_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface ProfileTableRow_Image_user {
  __typename: "User";
  name: string;
}

export interface ProfileTableRow_Image {
  __typename: "Image";
  id: number;
  href: string | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileTableRow_Image_connection | null;
  can: ProfileTableRow_Image_can | null;
  source: ProfileTableRow_Image_source | null;
  find_original_url: string | null;
  counts: ProfileTableRow_Image_counts | null;
  created_at: string | null;
  updated_at: string | null;
  image_url: string | null;
  title: string;
  user: ProfileTableRow_Image_user | null;
}

export interface ProfileTableRow_Link_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
}

export interface ProfileTableRow_Link_connection {
  __typename: "Connection";
  can: ProfileTableRow_Link_connection_can | null;
}

export interface ProfileTableRow_Link_can {
  __typename: "BlockCan";
  mute: boolean | null;
  remove: boolean | null;
  manage: boolean | null;
}

export interface ProfileTableRow_Link_source {
  __typename: "ConnectableSource";
  url: string | null;
  provider_url: string | null;
}

export interface ProfileTableRow_Link_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface ProfileTableRow_Link_user {
  __typename: "User";
  name: string;
}

export interface ProfileTableRow_Link {
  __typename: "Link";
  id: number;
  href: string | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileTableRow_Link_connection | null;
  can: ProfileTableRow_Link_can | null;
  source: ProfileTableRow_Link_source | null;
  counts: ProfileTableRow_Link_counts | null;
  created_at: string | null;
  updated_at: string | null;
  image_url: string | null;
  title: string;
  user: ProfileTableRow_Link_user | null;
}

export interface ProfileTableRow_PendingBlock_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
}

export interface ProfileTableRow_PendingBlock_connection {
  __typename: "Connection";
  can: ProfileTableRow_PendingBlock_connection_can | null;
}

export interface ProfileTableRow_PendingBlock_can {
  __typename: "BlockCan";
  mute: boolean | null;
  remove: boolean | null;
  manage: boolean | null;
}

export interface ProfileTableRow_PendingBlock_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface ProfileTableRow_PendingBlock_user {
  __typename: "User";
  name: string;
}

export interface ProfileTableRow_PendingBlock {
  __typename: "PendingBlock";
  id: number;
  href: string | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileTableRow_PendingBlock_connection | null;
  can: ProfileTableRow_PendingBlock_can | null;
  counts: ProfileTableRow_PendingBlock_counts | null;
  created_at: string | null;
  updated_at: string | null;
  title: string;
  user: ProfileTableRow_PendingBlock_user | null;
}

export interface ProfileTableRow_Text_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
}

export interface ProfileTableRow_Text_connection {
  __typename: "Connection";
  can: ProfileTableRow_Text_connection_can | null;
}

export interface ProfileTableRow_Text_can {
  __typename: "BlockCan";
  mute: boolean | null;
  remove: boolean | null;
  manage: boolean | null;
}

export interface ProfileTableRow_Text_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ProfileTableRow_Text_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface ProfileTableRow_Text_user {
  __typename: "User";
  name: string;
}

export interface ProfileTableRow_Text {
  __typename: "Text";
  id: number;
  href: string | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileTableRow_Text_connection | null;
  can: ProfileTableRow_Text_can | null;
  source: ProfileTableRow_Text_source | null;
  counts: ProfileTableRow_Text_counts | null;
  created_at: string | null;
  updated_at: string | null;
  content: string;
  html: string;
  title: string;
  user: ProfileTableRow_Text_user | null;
}

export interface ProfileTableRow_Channel_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
}

export interface ProfileTableRow_Channel_connection {
  __typename: "Connection";
  can: ProfileTableRow_Channel_connection_can | null;
}

export interface ProfileTableRow_Channel_can {
  __typename: "ChannelCan";
  mute: boolean | null;
}

export interface ProfileTableRow_Channel_counts {
  __typename: "ChannelCounts";
  connected_to_channels: number | null;
  contents: number | null;
}

export interface ProfileTableRow_Channel_user {
  __typename: "User";
  name: string;
}

export interface ProfileTableRow_Channel {
  __typename: "Channel";
  id: number;
  href: string | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileTableRow_Channel_connection | null;
  can: ProfileTableRow_Channel_can | null;
  visibility: string;
  title: string;
  counts: ProfileTableRow_Channel_counts | null;
  created_at: string | null;
  updated_at: string | null;
  user: ProfileTableRow_Channel_user | null;
}

export type ProfileTableRow = ProfileTableRow_Attachment | ProfileTableRow_Embed | ProfileTableRow_Image | ProfileTableRow_Link | ProfileTableRow_PendingBlock | ProfileTableRow_Text | ProfileTableRow_Channel;
