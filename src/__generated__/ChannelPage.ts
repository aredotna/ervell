/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ChannelPage
// ====================================================

export interface ChannelPage_channel_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
}

export interface ChannelPage_channel_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  href: string | null;
}

export type ChannelPage_channel_owner = ChannelPage_channel_owner_User | ChannelPage_channel_owner_Group;

export interface ChannelPage_channel_counts {
  __typename: "ChannelCounts";
  collaborators: number | null;
  followers: number | null;
  contents: number | null;
}

export interface ChannelPage_channel_can {
  __typename: "ChannelCan";
  follow: boolean | null;
  update: boolean | null;
  destroy: boolean | null;
  mute: boolean | null;
  share: boolean | null;
  manage_collaborators: boolean | null;
  connect: boolean | null;
  add_to: boolean | null;
  reorder_connections: boolean | null;
  add_to_as_premium: boolean | null;
  remove_connections: boolean | null;
}

export interface ChannelPage_channel_user {
  __typename: "User";
  id: number | null;
  href: string | null;
  name: string | null;
}

export interface ChannelPage_channel_collaborators_User {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
}

export interface ChannelPage_channel_collaborators_Group_user {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
}

export interface ChannelPage_channel_collaborators_Group_users {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
}

export interface ChannelPage_channel_collaborators_Group_can {
  __typename: "GroupCan";
  manage: boolean | null;
  manage_users: boolean | null;
}

export interface ChannelPage_channel_collaborators_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  href: string | null;
  description: string | null;
  user: ChannelPage_channel_collaborators_Group_user | null;
  users: (ChannelPage_channel_collaborators_Group_users | null)[] | null;
  can: ChannelPage_channel_collaborators_Group_can | null;
  visibility: string | null;
}

export type ChannelPage_channel_collaborators = ChannelPage_channel_collaborators_User | ChannelPage_channel_collaborators_Group;

export interface ChannelPage_channel_connected_to_channels {
  __typename: "Channel";
  id: number | null;
  label: string | null;
  href: string | null;
}

export interface ChannelPage_channel_share {
  __typename: "ChannelShare";
  url: string | null;
  twitter_url: string | null;
  facebook_url: string | null;
}

export interface ChannelPage_channel_skeleton {
  __typename: "SkeletalConnectable";
  id: number | null;
  type: string | null;
}

export interface ChannelPage_channel_initial_contents_Text_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ChannelPage_channel_initial_contents_Text_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ChannelPage_channel_initial_contents_Text_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ChannelPage_channel_initial_contents_Text_connection_user | null;
}

export interface ChannelPage_channel_initial_contents_Text_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelPage_channel_initial_contents_Text_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ChannelPage_channel_initial_contents_Text_can {
  __typename: "BlockCan";
  mute: boolean | null;
}

export interface ChannelPage_channel_initial_contents_Text {
  __typename: "Text";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: ChannelPage_channel_initial_contents_Text_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelPage_channel_initial_contents_Text_connection | null;
  source: ChannelPage_channel_initial_contents_Text_source | null;
  counts: ChannelPage_channel_initial_contents_Text_counts | null;
  content: string | null;
  can: ChannelPage_channel_initial_contents_Text_can | null;
}

export interface ChannelPage_channel_initial_contents_Image_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ChannelPage_channel_initial_contents_Image_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ChannelPage_channel_initial_contents_Image_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ChannelPage_channel_initial_contents_Image_connection_user | null;
}

export interface ChannelPage_channel_initial_contents_Image_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelPage_channel_initial_contents_Image_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ChannelPage_channel_initial_contents_Image_can {
  __typename: "BlockCan";
  mute: boolean | null;
}

export interface ChannelPage_channel_initial_contents_Image {
  __typename: "Image";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: ChannelPage_channel_initial_contents_Image_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelPage_channel_initial_contents_Image_connection | null;
  source: ChannelPage_channel_initial_contents_Image_source | null;
  counts: ChannelPage_channel_initial_contents_Image_counts | null;
  src: string | null;
  can: ChannelPage_channel_initial_contents_Image_can | null;
  find_original_url: string | null;
  meta_image: string | null;
}

export interface ChannelPage_channel_initial_contents_Link_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ChannelPage_channel_initial_contents_Link_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ChannelPage_channel_initial_contents_Link_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ChannelPage_channel_initial_contents_Link_connection_user | null;
}

export interface ChannelPage_channel_initial_contents_Link_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelPage_channel_initial_contents_Link_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ChannelPage_channel_initial_contents_Link_can {
  __typename: "BlockCan";
  mute: boolean | null;
}

export interface ChannelPage_channel_initial_contents_Link {
  __typename: "Link";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: ChannelPage_channel_initial_contents_Link_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelPage_channel_initial_contents_Link_connection | null;
  source: ChannelPage_channel_initial_contents_Link_source | null;
  counts: ChannelPage_channel_initial_contents_Link_counts | null;
  src: string | null;
  external_url: string | null;
  can: ChannelPage_channel_initial_contents_Link_can | null;
  meta_image: string | null;
}

export interface ChannelPage_channel_initial_contents_Embed_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ChannelPage_channel_initial_contents_Embed_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ChannelPage_channel_initial_contents_Embed_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ChannelPage_channel_initial_contents_Embed_connection_user | null;
}

export interface ChannelPage_channel_initial_contents_Embed_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelPage_channel_initial_contents_Embed_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ChannelPage_channel_initial_contents_Embed_can {
  __typename: "BlockCan";
  mute: boolean | null;
}

export interface ChannelPage_channel_initial_contents_Embed {
  __typename: "Embed";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: ChannelPage_channel_initial_contents_Embed_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelPage_channel_initial_contents_Embed_connection | null;
  source: ChannelPage_channel_initial_contents_Embed_source | null;
  counts: ChannelPage_channel_initial_contents_Embed_counts | null;
  src: string | null;
  can: ChannelPage_channel_initial_contents_Embed_can | null;
  meta_image: string | null;
}

export interface ChannelPage_channel_initial_contents_Attachment_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ChannelPage_channel_initial_contents_Attachment_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ChannelPage_channel_initial_contents_Attachment_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ChannelPage_channel_initial_contents_Attachment_connection_user | null;
}

export interface ChannelPage_channel_initial_contents_Attachment_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelPage_channel_initial_contents_Attachment_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ChannelPage_channel_initial_contents_Attachment_can {
  __typename: "BlockCan";
  mute: boolean | null;
}

export interface ChannelPage_channel_initial_contents_Attachment {
  __typename: "Attachment";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: ChannelPage_channel_initial_contents_Attachment_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelPage_channel_initial_contents_Attachment_connection | null;
  source: ChannelPage_channel_initial_contents_Attachment_source | null;
  counts: ChannelPage_channel_initial_contents_Attachment_counts | null;
  src: string | null;
  file_extension: string | null;
  can: ChannelPage_channel_initial_contents_Attachment_can | null;
  meta_image: string | null;
}

export interface ChannelPage_channel_initial_contents_PendingBlock_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ChannelPage_channel_initial_contents_PendingBlock_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ChannelPage_channel_initial_contents_PendingBlock_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ChannelPage_channel_initial_contents_PendingBlock_connection_user | null;
}

export interface ChannelPage_channel_initial_contents_PendingBlock_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelPage_channel_initial_contents_PendingBlock_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ChannelPage_channel_initial_contents_PendingBlock_can {
  __typename: "BlockCan";
  mute: boolean | null;
}

export interface ChannelPage_channel_initial_contents_PendingBlock {
  __typename: "PendingBlock";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: ChannelPage_channel_initial_contents_PendingBlock_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelPage_channel_initial_contents_PendingBlock_connection | null;
  source: ChannelPage_channel_initial_contents_PendingBlock_source | null;
  counts: ChannelPage_channel_initial_contents_PendingBlock_counts | null;
  can: ChannelPage_channel_initial_contents_PendingBlock_can | null;
}

export interface ChannelPage_channel_initial_contents_Channel_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ChannelPage_channel_initial_contents_Channel_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ChannelPage_channel_initial_contents_Channel_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ChannelPage_channel_initial_contents_Channel_connection_user | null;
}

export interface ChannelPage_channel_initial_contents_Channel_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelPage_channel_initial_contents_Channel_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface ChannelPage_channel_initial_contents_Channel_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  visibility: string | null;
}

export interface ChannelPage_channel_initial_contents_Channel_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export type ChannelPage_channel_initial_contents_Channel_owner = ChannelPage_channel_initial_contents_Channel_owner_Group | ChannelPage_channel_initial_contents_Channel_owner_User;

export interface ChannelPage_channel_initial_contents_Channel_can {
  __typename: "ChannelCan";
  mute: boolean | null;
}

export interface ChannelPage_channel_initial_contents_Channel {
  __typename: "Channel";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: ChannelPage_channel_initial_contents_Channel_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelPage_channel_initial_contents_Channel_connection | null;
  source: ChannelPage_channel_initial_contents_Channel_source | null;
  truncatedTitle: string | null;
  visibility: string | null;
  counts: ChannelPage_channel_initial_contents_Channel_counts | null;
  owner: ChannelPage_channel_initial_contents_Channel_owner | null;
  can: ChannelPage_channel_initial_contents_Channel_can | null;
}

export type ChannelPage_channel_initial_contents = ChannelPage_channel_initial_contents_Text | ChannelPage_channel_initial_contents_Image | ChannelPage_channel_initial_contents_Link | ChannelPage_channel_initial_contents_Embed | ChannelPage_channel_initial_contents_Attachment | ChannelPage_channel_initial_contents_PendingBlock | ChannelPage_channel_initial_contents_Channel;

export interface ChannelPage_channel {
  __typename: "Channel";
  id: number | null;
  title: string | null;
  truncatedTitle: string | null;
  href: string | null;
  visibility: string | null;
  owner: ChannelPage_channel_owner | null;
  counts: ChannelPage_channel_counts | null;
  can: ChannelPage_channel_can | null;
  is_muted: boolean | null;
  info: string | null;
  user: ChannelPage_channel_user | null;
  collaborators: (ChannelPage_channel_collaborators | null)[] | null;
  connected_to_channels: (ChannelPage_channel_connected_to_channels | null)[] | null;
  share: ChannelPage_channel_share | null;
  skeleton: (ChannelPage_channel_skeleton | null)[] | null;
  initial_contents: (ChannelPage_channel_initial_contents | null)[] | null;
  meta_title: string | null;
  meta_description: string | null;
  canonical: string | null;
  is_nsfw: boolean | null;
}

export interface ChannelPage {
  /**
   * A single channel
   */
  channel: ChannelPage_channel | null;
}

export interface ChannelPageVariables {
  id: string;
}
