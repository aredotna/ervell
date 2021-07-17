/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SharedChannelPage
// ====================================================

export interface SharedChannelPage_channel_owner_User {
  __typename: "User";
  id: number;
  name: string;
  href: string | null;
  label: string;
}

export interface SharedChannelPage_channel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  href: string | null;
  label: string;
}

export type SharedChannelPage_channel_owner = SharedChannelPage_channel_owner_User | SharedChannelPage_channel_owner_Group;

export interface SharedChannelPage_channel_counts {
  __typename: "ChannelCounts";
  collaborators: number | null;
  followers: number;
  contents: number | null;
}

export interface SharedChannelPage_channel_can {
  __typename: "ChannelCan";
  follow: boolean | null;
  update: boolean | null;
  destroy: boolean | null;
  mute: boolean | null;
  share: boolean | null;
  manage_collaborators: boolean;
  connect: boolean | null;
  add_to: boolean | null;
  reorder_connections: boolean | null;
  add_to_as_premium: boolean | null;
  remove_connections: boolean | null;
}

export interface SharedChannelPage_channel_user {
  __typename: "User";
  id: number;
  href: string | null;
  name: string;
}

export interface SharedChannelPage_channel_collaborators_User {
  __typename: "User";
  id: number;
  name: string;
  href: string | null;
  label: string;
}

export interface SharedChannelPage_channel_collaborators_Group_user {
  __typename: "User";
  id: number;
  name: string;
  href: string | null;
}

export interface SharedChannelPage_channel_collaborators_Group_users {
  __typename: "User";
  id: number;
  name: string;
  href: string | null;
}

export interface SharedChannelPage_channel_collaborators_Group_can {
  __typename: "GroupCan";
  manage: boolean | null;
  manage_users: boolean | null;
}

export interface SharedChannelPage_channel_collaborators_Group {
  __typename: "Group";
  id: number;
  name: string;
  href: string | null;
  description: string | null;
  user: SharedChannelPage_channel_collaborators_Group_user;
  users: SharedChannelPage_channel_collaborators_Group_users[] | null;
  can: SharedChannelPage_channel_collaborators_Group_can | null;
  visibility: string;
  label: string;
}

export type SharedChannelPage_channel_collaborators = SharedChannelPage_channel_collaborators_User | SharedChannelPage_channel_collaborators_Group;

export interface SharedChannelPage_channel_connected_to_channels_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export interface SharedChannelPage_channel_connected_to_channels_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
}

export type SharedChannelPage_channel_connected_to_channels_owner = SharedChannelPage_channel_connected_to_channels_owner_User | SharedChannelPage_channel_connected_to_channels_owner_Group;

export interface SharedChannelPage_channel_connected_to_channels {
  __typename: "Channel";
  id: number;
  label: string;
  href: string | null;
  owner: SharedChannelPage_channel_connected_to_channels_owner;
}

export interface SharedChannelPage_channel_share {
  __typename: "ChannelShare";
  url: string | null;
  twitter_url: string | null;
  facebook_url: string | null;
}

export interface SharedChannelPage_channel_blokks_Attachment_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface SharedChannelPage_channel_blokks_Attachment_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface SharedChannelPage_channel_blokks_Attachment_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
}

export interface SharedChannelPage_channel_blokks_Attachment_connection {
  __typename: "Connection";
  created_at: string | null;
  user: SharedChannelPage_channel_blokks_Attachment_connection_user | null;
  can: SharedChannelPage_channel_blokks_Attachment_connection_can | null;
}

export interface SharedChannelPage_channel_blokks_Attachment_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface SharedChannelPage_channel_blokks_Attachment_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface SharedChannelPage_channel_blokks_Attachment_can {
  __typename: "BlockCan";
  mute: boolean | null;
  remove: boolean | null;
}

export interface SharedChannelPage_channel_blokks_Attachment {
  __typename: "Attachment";
  id: number;
  href: string | null;
  updated_at: string | null;
  title: string;
  user: SharedChannelPage_channel_blokks_Attachment_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: SharedChannelPage_channel_blokks_Attachment_connection | null;
  source: SharedChannelPage_channel_blokks_Attachment_source | null;
  counts: SharedChannelPage_channel_blokks_Attachment_counts | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  file_extension: string | null;
  can: SharedChannelPage_channel_blokks_Attachment_can | null;
}

export interface SharedChannelPage_channel_blokks_Embed_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface SharedChannelPage_channel_blokks_Embed_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface SharedChannelPage_channel_blokks_Embed_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
}

export interface SharedChannelPage_channel_blokks_Embed_connection {
  __typename: "Connection";
  created_at: string | null;
  user: SharedChannelPage_channel_blokks_Embed_connection_user | null;
  can: SharedChannelPage_channel_blokks_Embed_connection_can | null;
}

export interface SharedChannelPage_channel_blokks_Embed_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface SharedChannelPage_channel_blokks_Embed_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface SharedChannelPage_channel_blokks_Embed_can {
  __typename: "BlockCan";
  mute: boolean | null;
  remove: boolean | null;
}

export interface SharedChannelPage_channel_blokks_Embed {
  __typename: "Embed";
  id: number;
  href: string | null;
  updated_at: string | null;
  title: string;
  user: SharedChannelPage_channel_blokks_Embed_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: SharedChannelPage_channel_blokks_Embed_connection | null;
  source: SharedChannelPage_channel_blokks_Embed_source | null;
  counts: SharedChannelPage_channel_blokks_Embed_counts | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  can: SharedChannelPage_channel_blokks_Embed_can | null;
}

export interface SharedChannelPage_channel_blokks_Image_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface SharedChannelPage_channel_blokks_Image_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface SharedChannelPage_channel_blokks_Image_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
}

export interface SharedChannelPage_channel_blokks_Image_connection {
  __typename: "Connection";
  created_at: string | null;
  user: SharedChannelPage_channel_blokks_Image_connection_user | null;
  can: SharedChannelPage_channel_blokks_Image_connection_can | null;
}

export interface SharedChannelPage_channel_blokks_Image_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface SharedChannelPage_channel_blokks_Image_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface SharedChannelPage_channel_blokks_Image_original_dimensions {
  __typename: "Dimensions";
  width: number | null;
  height: number | null;
}

export interface SharedChannelPage_channel_blokks_Image_can {
  __typename: "BlockCan";
  mute: boolean | null;
  remove: boolean | null;
}

export interface SharedChannelPage_channel_blokks_Image {
  __typename: "Image";
  id: number;
  href: string | null;
  updated_at: string | null;
  title: string;
  user: SharedChannelPage_channel_blokks_Image_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: SharedChannelPage_channel_blokks_Image_connection | null;
  source: SharedChannelPage_channel_blokks_Image_source | null;
  counts: SharedChannelPage_channel_blokks_Image_counts | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  original_dimensions: SharedChannelPage_channel_blokks_Image_original_dimensions | null;
  can: SharedChannelPage_channel_blokks_Image_can | null;
  find_original_url: string | null;
}

export interface SharedChannelPage_channel_blokks_Link_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface SharedChannelPage_channel_blokks_Link_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface SharedChannelPage_channel_blokks_Link_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
}

export interface SharedChannelPage_channel_blokks_Link_connection {
  __typename: "Connection";
  created_at: string | null;
  user: SharedChannelPage_channel_blokks_Link_connection_user | null;
  can: SharedChannelPage_channel_blokks_Link_connection_can | null;
}

export interface SharedChannelPage_channel_blokks_Link_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface SharedChannelPage_channel_blokks_Link_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface SharedChannelPage_channel_blokks_Link_can {
  __typename: "BlockCan";
  mute: boolean | null;
  remove: boolean | null;
}

export interface SharedChannelPage_channel_blokks_Link {
  __typename: "Link";
  id: number;
  href: string | null;
  updated_at: string | null;
  title: string;
  user: SharedChannelPage_channel_blokks_Link_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: SharedChannelPage_channel_blokks_Link_connection | null;
  source: SharedChannelPage_channel_blokks_Link_source | null;
  counts: SharedChannelPage_channel_blokks_Link_counts | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  external_url: string | null;
  can: SharedChannelPage_channel_blokks_Link_can | null;
}

export interface SharedChannelPage_channel_blokks_PendingBlock_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface SharedChannelPage_channel_blokks_PendingBlock_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface SharedChannelPage_channel_blokks_PendingBlock_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
}

export interface SharedChannelPage_channel_blokks_PendingBlock_connection {
  __typename: "Connection";
  created_at: string | null;
  user: SharedChannelPage_channel_blokks_PendingBlock_connection_user | null;
  can: SharedChannelPage_channel_blokks_PendingBlock_connection_can | null;
}

export interface SharedChannelPage_channel_blokks_PendingBlock_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface SharedChannelPage_channel_blokks_PendingBlock_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface SharedChannelPage_channel_blokks_PendingBlock_can {
  __typename: "BlockCan";
  mute: boolean | null;
  remove: boolean | null;
}

export interface SharedChannelPage_channel_blokks_PendingBlock {
  __typename: "PendingBlock";
  id: number;
  href: string | null;
  updated_at: string | null;
  title: string;
  user: SharedChannelPage_channel_blokks_PendingBlock_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: SharedChannelPage_channel_blokks_PendingBlock_connection | null;
  source: SharedChannelPage_channel_blokks_PendingBlock_source | null;
  counts: SharedChannelPage_channel_blokks_PendingBlock_counts | null;
  can: SharedChannelPage_channel_blokks_PendingBlock_can | null;
}

export interface SharedChannelPage_channel_blokks_Text_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface SharedChannelPage_channel_blokks_Text_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface SharedChannelPage_channel_blokks_Text_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
}

export interface SharedChannelPage_channel_blokks_Text_connection {
  __typename: "Connection";
  created_at: string | null;
  user: SharedChannelPage_channel_blokks_Text_connection_user | null;
  can: SharedChannelPage_channel_blokks_Text_connection_can | null;
}

export interface SharedChannelPage_channel_blokks_Text_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface SharedChannelPage_channel_blokks_Text_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface SharedChannelPage_channel_blokks_Text_can {
  __typename: "BlockCan";
  mute: boolean | null;
  remove: boolean | null;
}

export interface SharedChannelPage_channel_blokks_Text {
  __typename: "Text";
  id: number;
  href: string | null;
  updated_at: string | null;
  title: string;
  user: SharedChannelPage_channel_blokks_Text_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: SharedChannelPage_channel_blokks_Text_connection | null;
  source: SharedChannelPage_channel_blokks_Text_source | null;
  counts: SharedChannelPage_channel_blokks_Text_counts | null;
  content: string;
  can: SharedChannelPage_channel_blokks_Text_can | null;
}

export interface SharedChannelPage_channel_blokks_Channel_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface SharedChannelPage_channel_blokks_Channel_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface SharedChannelPage_channel_blokks_Channel_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
}

export interface SharedChannelPage_channel_blokks_Channel_connection {
  __typename: "Connection";
  created_at: string | null;
  user: SharedChannelPage_channel_blokks_Channel_connection_user | null;
  can: SharedChannelPage_channel_blokks_Channel_connection_can | null;
}

export interface SharedChannelPage_channel_blokks_Channel_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface SharedChannelPage_channel_blokks_Channel_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface SharedChannelPage_channel_blokks_Channel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface SharedChannelPage_channel_blokks_Channel_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type SharedChannelPage_channel_blokks_Channel_owner = SharedChannelPage_channel_blokks_Channel_owner_Group | SharedChannelPage_channel_blokks_Channel_owner_User;

export interface SharedChannelPage_channel_blokks_Channel_can {
  __typename: "ChannelCan";
  mute: boolean | null;
}

export interface SharedChannelPage_channel_blokks_Channel {
  __typename: "Channel";
  id: number;
  href: string | null;
  updated_at: string | null;
  title: string;
  user: SharedChannelPage_channel_blokks_Channel_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: SharedChannelPage_channel_blokks_Channel_connection | null;
  source: SharedChannelPage_channel_blokks_Channel_source | null;
  truncatedTitle: string;
  visibility: string;
  counts: SharedChannelPage_channel_blokks_Channel_counts | null;
  owner: SharedChannelPage_channel_blokks_Channel_owner;
  label: string;
  can: SharedChannelPage_channel_blokks_Channel_can | null;
}

export type SharedChannelPage_channel_blokks = SharedChannelPage_channel_blokks_Attachment | SharedChannelPage_channel_blokks_Embed | SharedChannelPage_channel_blokks_Image | SharedChannelPage_channel_blokks_Link | SharedChannelPage_channel_blokks_PendingBlock | SharedChannelPage_channel_blokks_Text | SharedChannelPage_channel_blokks_Channel;

export interface SharedChannelPage_channel {
  __typename: "Channel";
  id: number;
  title: string;
  truncatedTitle: string;
  href: string | null;
  visibility: string;
  owner: SharedChannelPage_channel_owner;
  counts: SharedChannelPage_channel_counts | null;
  label: string;
  can: SharedChannelPage_channel_can | null;
  is_muted: boolean | null;
  info: string | null;
  user: SharedChannelPage_channel_user | null;
  collaborators: SharedChannelPage_channel_collaborators[] | null;
  connected_to_channels: SharedChannelPage_channel_connected_to_channels[] | null;
  share: SharedChannelPage_channel_share | null;
  blokks: SharedChannelPage_channel_blokks[] | null;
  meta_title: string;
  meta_description: string | null;
  canonical: string | null;
  is_nsfw: boolean;
  image_url: string | null;
}

export interface SharedChannelPage {
  /**
   * An otherwise private channel that is accessible via the shared token
   */
  channel: SharedChannelPage_channel | null;
}

export interface SharedChannelPageVariables {
  token: string;
}
