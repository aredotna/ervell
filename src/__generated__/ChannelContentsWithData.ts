/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ChannelContentsWithData
// ====================================================

export interface ChannelContentsWithData_channel_skeleton {
  __typename: "SkeletalConnectable";
  id: number | null;
  type: string | null;
}

export interface ChannelContentsWithData_channel_can {
  __typename: "ChannelCan";
  add_to: boolean | null;
  reorder_connections: boolean | null;
  add_to_as_premium: boolean | null;
  remove_connections: boolean | null;
}

export interface ChannelContentsWithData_channel_initial_contents_Text_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ChannelContentsWithData_channel_initial_contents_Text_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ChannelContentsWithData_channel_initial_contents_Text_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
}

export interface ChannelContentsWithData_channel_initial_contents_Text_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ChannelContentsWithData_channel_initial_contents_Text_connection_user | null;
  can: ChannelContentsWithData_channel_initial_contents_Text_connection_can | null;
}

export interface ChannelContentsWithData_channel_initial_contents_Text_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelContentsWithData_channel_initial_contents_Text_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ChannelContentsWithData_channel_initial_contents_Text_can {
  __typename: "BlockCan";
  mute: boolean | null;
  remove: boolean | null;
}

export interface ChannelContentsWithData_channel_initial_contents_Text {
  __typename: "Text";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: ChannelContentsWithData_channel_initial_contents_Text_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelContentsWithData_channel_initial_contents_Text_connection | null;
  source: ChannelContentsWithData_channel_initial_contents_Text_source | null;
  counts: ChannelContentsWithData_channel_initial_contents_Text_counts | null;
  content: string | null;
  can: ChannelContentsWithData_channel_initial_contents_Text_can | null;
}

export interface ChannelContentsWithData_channel_initial_contents_Image_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ChannelContentsWithData_channel_initial_contents_Image_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ChannelContentsWithData_channel_initial_contents_Image_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
}

export interface ChannelContentsWithData_channel_initial_contents_Image_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ChannelContentsWithData_channel_initial_contents_Image_connection_user | null;
  can: ChannelContentsWithData_channel_initial_contents_Image_connection_can | null;
}

export interface ChannelContentsWithData_channel_initial_contents_Image_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelContentsWithData_channel_initial_contents_Image_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ChannelContentsWithData_channel_initial_contents_Image_original_dimensions {
  __typename: "Dimensions";
  width: number | null;
  height: number | null;
}

export interface ChannelContentsWithData_channel_initial_contents_Image_can {
  __typename: "BlockCan";
  mute: boolean | null;
  remove: boolean | null;
}

export interface ChannelContentsWithData_channel_initial_contents_Image {
  __typename: "Image";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: ChannelContentsWithData_channel_initial_contents_Image_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelContentsWithData_channel_initial_contents_Image_connection | null;
  source: ChannelContentsWithData_channel_initial_contents_Image_source | null;
  counts: ChannelContentsWithData_channel_initial_contents_Image_counts | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  original_dimensions: ChannelContentsWithData_channel_initial_contents_Image_original_dimensions | null;
  can: ChannelContentsWithData_channel_initial_contents_Image_can | null;
  find_original_url: string | null;
}

export interface ChannelContentsWithData_channel_initial_contents_Link_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ChannelContentsWithData_channel_initial_contents_Link_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ChannelContentsWithData_channel_initial_contents_Link_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
}

export interface ChannelContentsWithData_channel_initial_contents_Link_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ChannelContentsWithData_channel_initial_contents_Link_connection_user | null;
  can: ChannelContentsWithData_channel_initial_contents_Link_connection_can | null;
}

export interface ChannelContentsWithData_channel_initial_contents_Link_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelContentsWithData_channel_initial_contents_Link_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ChannelContentsWithData_channel_initial_contents_Link_can {
  __typename: "BlockCan";
  mute: boolean | null;
  remove: boolean | null;
}

export interface ChannelContentsWithData_channel_initial_contents_Link {
  __typename: "Link";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: ChannelContentsWithData_channel_initial_contents_Link_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelContentsWithData_channel_initial_contents_Link_connection | null;
  source: ChannelContentsWithData_channel_initial_contents_Link_source | null;
  counts: ChannelContentsWithData_channel_initial_contents_Link_counts | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  external_url: string | null;
  can: ChannelContentsWithData_channel_initial_contents_Link_can | null;
}

export interface ChannelContentsWithData_channel_initial_contents_Embed_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ChannelContentsWithData_channel_initial_contents_Embed_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ChannelContentsWithData_channel_initial_contents_Embed_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
}

export interface ChannelContentsWithData_channel_initial_contents_Embed_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ChannelContentsWithData_channel_initial_contents_Embed_connection_user | null;
  can: ChannelContentsWithData_channel_initial_contents_Embed_connection_can | null;
}

export interface ChannelContentsWithData_channel_initial_contents_Embed_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelContentsWithData_channel_initial_contents_Embed_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ChannelContentsWithData_channel_initial_contents_Embed_can {
  __typename: "BlockCan";
  mute: boolean | null;
  remove: boolean | null;
}

export interface ChannelContentsWithData_channel_initial_contents_Embed {
  __typename: "Embed";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: ChannelContentsWithData_channel_initial_contents_Embed_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelContentsWithData_channel_initial_contents_Embed_connection | null;
  source: ChannelContentsWithData_channel_initial_contents_Embed_source | null;
  counts: ChannelContentsWithData_channel_initial_contents_Embed_counts | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  can: ChannelContentsWithData_channel_initial_contents_Embed_can | null;
}

export interface ChannelContentsWithData_channel_initial_contents_Attachment_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ChannelContentsWithData_channel_initial_contents_Attachment_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ChannelContentsWithData_channel_initial_contents_Attachment_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
}

export interface ChannelContentsWithData_channel_initial_contents_Attachment_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ChannelContentsWithData_channel_initial_contents_Attachment_connection_user | null;
  can: ChannelContentsWithData_channel_initial_contents_Attachment_connection_can | null;
}

export interface ChannelContentsWithData_channel_initial_contents_Attachment_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelContentsWithData_channel_initial_contents_Attachment_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ChannelContentsWithData_channel_initial_contents_Attachment_can {
  __typename: "BlockCan";
  mute: boolean | null;
  remove: boolean | null;
}

export interface ChannelContentsWithData_channel_initial_contents_Attachment {
  __typename: "Attachment";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: ChannelContentsWithData_channel_initial_contents_Attachment_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelContentsWithData_channel_initial_contents_Attachment_connection | null;
  source: ChannelContentsWithData_channel_initial_contents_Attachment_source | null;
  counts: ChannelContentsWithData_channel_initial_contents_Attachment_counts | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  file_extension: string | null;
  can: ChannelContentsWithData_channel_initial_contents_Attachment_can | null;
}

export interface ChannelContentsWithData_channel_initial_contents_PendingBlock_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ChannelContentsWithData_channel_initial_contents_PendingBlock_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ChannelContentsWithData_channel_initial_contents_PendingBlock_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
}

export interface ChannelContentsWithData_channel_initial_contents_PendingBlock_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ChannelContentsWithData_channel_initial_contents_PendingBlock_connection_user | null;
  can: ChannelContentsWithData_channel_initial_contents_PendingBlock_connection_can | null;
}

export interface ChannelContentsWithData_channel_initial_contents_PendingBlock_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelContentsWithData_channel_initial_contents_PendingBlock_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ChannelContentsWithData_channel_initial_contents_PendingBlock_can {
  __typename: "BlockCan";
  mute: boolean | null;
  remove: boolean | null;
}

export interface ChannelContentsWithData_channel_initial_contents_PendingBlock {
  __typename: "PendingBlock";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: ChannelContentsWithData_channel_initial_contents_PendingBlock_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelContentsWithData_channel_initial_contents_PendingBlock_connection | null;
  source: ChannelContentsWithData_channel_initial_contents_PendingBlock_source | null;
  counts: ChannelContentsWithData_channel_initial_contents_PendingBlock_counts | null;
  can: ChannelContentsWithData_channel_initial_contents_PendingBlock_can | null;
}

export interface ChannelContentsWithData_channel_initial_contents_Channel_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ChannelContentsWithData_channel_initial_contents_Channel_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ChannelContentsWithData_channel_initial_contents_Channel_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
}

export interface ChannelContentsWithData_channel_initial_contents_Channel_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ChannelContentsWithData_channel_initial_contents_Channel_connection_user | null;
  can: ChannelContentsWithData_channel_initial_contents_Channel_connection_can | null;
}

export interface ChannelContentsWithData_channel_initial_contents_Channel_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelContentsWithData_channel_initial_contents_Channel_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface ChannelContentsWithData_channel_initial_contents_Channel_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  visibility: string | null;
}

export interface ChannelContentsWithData_channel_initial_contents_Channel_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export type ChannelContentsWithData_channel_initial_contents_Channel_owner = ChannelContentsWithData_channel_initial_contents_Channel_owner_Group | ChannelContentsWithData_channel_initial_contents_Channel_owner_User;

export interface ChannelContentsWithData_channel_initial_contents_Channel_can {
  __typename: "ChannelCan";
  mute: boolean | null;
}

export interface ChannelContentsWithData_channel_initial_contents_Channel {
  __typename: "Channel";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: ChannelContentsWithData_channel_initial_contents_Channel_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelContentsWithData_channel_initial_contents_Channel_connection | null;
  source: ChannelContentsWithData_channel_initial_contents_Channel_source | null;
  truncatedTitle: string | null;
  visibility: string | null;
  counts: ChannelContentsWithData_channel_initial_contents_Channel_counts | null;
  owner: ChannelContentsWithData_channel_initial_contents_Channel_owner | null;
  label: string | null;
  can: ChannelContentsWithData_channel_initial_contents_Channel_can | null;
}

export type ChannelContentsWithData_channel_initial_contents = ChannelContentsWithData_channel_initial_contents_Text | ChannelContentsWithData_channel_initial_contents_Image | ChannelContentsWithData_channel_initial_contents_Link | ChannelContentsWithData_channel_initial_contents_Embed | ChannelContentsWithData_channel_initial_contents_Attachment | ChannelContentsWithData_channel_initial_contents_PendingBlock | ChannelContentsWithData_channel_initial_contents_Channel;

export interface ChannelContentsWithData_channel {
  __typename: "Channel";
  id: number | null;
  skeleton: (ChannelContentsWithData_channel_skeleton | null)[] | null;
  can: ChannelContentsWithData_channel_can | null;
  initial_contents: (ChannelContentsWithData_channel_initial_contents | null)[] | null;
  visibility: string | null;
}

export interface ChannelContentsWithData {
  /**
   * A single channel
   */
  channel: ChannelContentsWithData_channel | null;
}

export interface ChannelContentsWithDataVariables {
  id: string;
}
