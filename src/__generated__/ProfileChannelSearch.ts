/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProfileChannelSearch
// ====================================================

export interface ProfileChannelSearch_Group_channels_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface ProfileChannelSearch_Group_channels_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  visibility: string | null;
}

export interface ProfileChannelSearch_Group_channels_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export type ProfileChannelSearch_Group_channels_owner = ProfileChannelSearch_Group_channels_owner_Group | ProfileChannelSearch_Group_channels_owner_User;

export interface ProfileChannelSearch_Group_channels_blokks_Text_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ProfileChannelSearch_Group_channels_blokks_Text_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ProfileChannelSearch_Group_channels_blokks_Text_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ProfileChannelSearch_Group_channels_blokks_Text_connection_user | null;
}

export interface ProfileChannelSearch_Group_channels_blokks_Text_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ProfileChannelSearch_Group_channels_blokks_Text_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ProfileChannelSearch_Group_channels_blokks_Text {
  __typename: "Text";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: ProfileChannelSearch_Group_channels_blokks_Text_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileChannelSearch_Group_channels_blokks_Text_connection | null;
  source: ProfileChannelSearch_Group_channels_blokks_Text_source | null;
  counts: ProfileChannelSearch_Group_channels_blokks_Text_counts | null;
  content: string | null;
}

export interface ProfileChannelSearch_Group_channels_blokks_Image_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ProfileChannelSearch_Group_channels_blokks_Image_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ProfileChannelSearch_Group_channels_blokks_Image_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ProfileChannelSearch_Group_channels_blokks_Image_connection_user | null;
}

export interface ProfileChannelSearch_Group_channels_blokks_Image_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ProfileChannelSearch_Group_channels_blokks_Image_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ProfileChannelSearch_Group_channels_blokks_Image_original_dimensions {
  __typename: "Dimensions";
  width: number | null;
  height: number | null;
}

export interface ProfileChannelSearch_Group_channels_blokks_Image {
  __typename: "Image";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: ProfileChannelSearch_Group_channels_blokks_Image_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileChannelSearch_Group_channels_blokks_Image_connection | null;
  source: ProfileChannelSearch_Group_channels_blokks_Image_source | null;
  counts: ProfileChannelSearch_Group_channels_blokks_Image_counts | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  original_dimensions: ProfileChannelSearch_Group_channels_blokks_Image_original_dimensions | null;
}

export interface ProfileChannelSearch_Group_channels_blokks_Link_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ProfileChannelSearch_Group_channels_blokks_Link_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ProfileChannelSearch_Group_channels_blokks_Link_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ProfileChannelSearch_Group_channels_blokks_Link_connection_user | null;
}

export interface ProfileChannelSearch_Group_channels_blokks_Link_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ProfileChannelSearch_Group_channels_blokks_Link_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ProfileChannelSearch_Group_channels_blokks_Link {
  __typename: "Link";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: ProfileChannelSearch_Group_channels_blokks_Link_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileChannelSearch_Group_channels_blokks_Link_connection | null;
  source: ProfileChannelSearch_Group_channels_blokks_Link_source | null;
  counts: ProfileChannelSearch_Group_channels_blokks_Link_counts | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  external_url: string | null;
}

export interface ProfileChannelSearch_Group_channels_blokks_Embed_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ProfileChannelSearch_Group_channels_blokks_Embed_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ProfileChannelSearch_Group_channels_blokks_Embed_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ProfileChannelSearch_Group_channels_blokks_Embed_connection_user | null;
}

export interface ProfileChannelSearch_Group_channels_blokks_Embed_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ProfileChannelSearch_Group_channels_blokks_Embed_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ProfileChannelSearch_Group_channels_blokks_Embed {
  __typename: "Embed";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: ProfileChannelSearch_Group_channels_blokks_Embed_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileChannelSearch_Group_channels_blokks_Embed_connection | null;
  source: ProfileChannelSearch_Group_channels_blokks_Embed_source | null;
  counts: ProfileChannelSearch_Group_channels_blokks_Embed_counts | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
}

export interface ProfileChannelSearch_Group_channels_blokks_Attachment_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ProfileChannelSearch_Group_channels_blokks_Attachment_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ProfileChannelSearch_Group_channels_blokks_Attachment_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ProfileChannelSearch_Group_channels_blokks_Attachment_connection_user | null;
}

export interface ProfileChannelSearch_Group_channels_blokks_Attachment_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ProfileChannelSearch_Group_channels_blokks_Attachment_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ProfileChannelSearch_Group_channels_blokks_Attachment {
  __typename: "Attachment";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: ProfileChannelSearch_Group_channels_blokks_Attachment_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileChannelSearch_Group_channels_blokks_Attachment_connection | null;
  source: ProfileChannelSearch_Group_channels_blokks_Attachment_source | null;
  counts: ProfileChannelSearch_Group_channels_blokks_Attachment_counts | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  file_extension: string | null;
}

export interface ProfileChannelSearch_Group_channels_blokks_PendingBlock_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ProfileChannelSearch_Group_channels_blokks_PendingBlock_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ProfileChannelSearch_Group_channels_blokks_PendingBlock_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ProfileChannelSearch_Group_channels_blokks_PendingBlock_connection_user | null;
}

export interface ProfileChannelSearch_Group_channels_blokks_PendingBlock_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ProfileChannelSearch_Group_channels_blokks_PendingBlock_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ProfileChannelSearch_Group_channels_blokks_PendingBlock {
  __typename: "PendingBlock";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: ProfileChannelSearch_Group_channels_blokks_PendingBlock_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileChannelSearch_Group_channels_blokks_PendingBlock_connection | null;
  source: ProfileChannelSearch_Group_channels_blokks_PendingBlock_source | null;
  counts: ProfileChannelSearch_Group_channels_blokks_PendingBlock_counts | null;
}

export interface ProfileChannelSearch_Group_channels_blokks_Channel_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ProfileChannelSearch_Group_channels_blokks_Channel_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ProfileChannelSearch_Group_channels_blokks_Channel_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ProfileChannelSearch_Group_channels_blokks_Channel_connection_user | null;
}

export interface ProfileChannelSearch_Group_channels_blokks_Channel_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ProfileChannelSearch_Group_channels_blokks_Channel_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface ProfileChannelSearch_Group_channels_blokks_Channel_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  visibility: string | null;
}

export interface ProfileChannelSearch_Group_channels_blokks_Channel_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export type ProfileChannelSearch_Group_channels_blokks_Channel_owner = ProfileChannelSearch_Group_channels_blokks_Channel_owner_Group | ProfileChannelSearch_Group_channels_blokks_Channel_owner_User;

export interface ProfileChannelSearch_Group_channels_blokks_Channel {
  __typename: "Channel";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: ProfileChannelSearch_Group_channels_blokks_Channel_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileChannelSearch_Group_channels_blokks_Channel_connection | null;
  source: ProfileChannelSearch_Group_channels_blokks_Channel_source | null;
  truncatedTitle: string | null;
  visibility: string | null;
  counts: ProfileChannelSearch_Group_channels_blokks_Channel_counts | null;
  owner: ProfileChannelSearch_Group_channels_blokks_Channel_owner | null;
  label: string | null;
}

export type ProfileChannelSearch_Group_channels_blokks = ProfileChannelSearch_Group_channels_blokks_Text | ProfileChannelSearch_Group_channels_blokks_Image | ProfileChannelSearch_Group_channels_blokks_Link | ProfileChannelSearch_Group_channels_blokks_Embed | ProfileChannelSearch_Group_channels_blokks_Attachment | ProfileChannelSearch_Group_channels_blokks_PendingBlock | ProfileChannelSearch_Group_channels_blokks_Channel;

export interface ProfileChannelSearch_Group_channels {
  __typename: "Channel";
  id: number | null;
  href: string | null;
  truncatedTitle: string | null;
  visibility: string | null;
  updated_at: string | null;
  counts: ProfileChannelSearch_Group_channels_counts | null;
  owner: ProfileChannelSearch_Group_channels_owner | null;
  label: string | null;
  blokks: (ProfileChannelSearch_Group_channels_blokks | null)[] | null;
}

export interface ProfileChannelSearch_Group_counts {
  __typename: "GroupCounts";
  channels: number | null;
}

export interface ProfileChannelSearch_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  channels: (ProfileChannelSearch_Group_channels | null)[] | null;
  counts: ProfileChannelSearch_Group_counts | null;
}

export interface ProfileChannelSearch_User_counts {
  __typename: "UserCounts";
  channels: number | null;
}

export interface ProfileChannelSearch_User_channels_Text {
  __typename: "Text" | "Image" | "Link" | "Embed" | "Attachment" | "PendingBlock";
}

export interface ProfileChannelSearch_User_channels_Channel_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface ProfileChannelSearch_User_channels_Channel_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  visibility: string | null;
}

export interface ProfileChannelSearch_User_channels_Channel_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export type ProfileChannelSearch_User_channels_Channel_owner = ProfileChannelSearch_User_channels_Channel_owner_Group | ProfileChannelSearch_User_channels_Channel_owner_User;

export interface ProfileChannelSearch_User_channels_Channel_blokks_Text_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ProfileChannelSearch_User_channels_Channel_blokks_Text_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ProfileChannelSearch_User_channels_Channel_blokks_Text_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ProfileChannelSearch_User_channels_Channel_blokks_Text_connection_user | null;
}

export interface ProfileChannelSearch_User_channels_Channel_blokks_Text_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ProfileChannelSearch_User_channels_Channel_blokks_Text_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ProfileChannelSearch_User_channels_Channel_blokks_Text {
  __typename: "Text";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: ProfileChannelSearch_User_channels_Channel_blokks_Text_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileChannelSearch_User_channels_Channel_blokks_Text_connection | null;
  source: ProfileChannelSearch_User_channels_Channel_blokks_Text_source | null;
  counts: ProfileChannelSearch_User_channels_Channel_blokks_Text_counts | null;
  content: string | null;
}

export interface ProfileChannelSearch_User_channels_Channel_blokks_Image_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ProfileChannelSearch_User_channels_Channel_blokks_Image_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ProfileChannelSearch_User_channels_Channel_blokks_Image_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ProfileChannelSearch_User_channels_Channel_blokks_Image_connection_user | null;
}

export interface ProfileChannelSearch_User_channels_Channel_blokks_Image_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ProfileChannelSearch_User_channels_Channel_blokks_Image_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ProfileChannelSearch_User_channels_Channel_blokks_Image_original_dimensions {
  __typename: "Dimensions";
  width: number | null;
  height: number | null;
}

export interface ProfileChannelSearch_User_channels_Channel_blokks_Image {
  __typename: "Image";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: ProfileChannelSearch_User_channels_Channel_blokks_Image_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileChannelSearch_User_channels_Channel_blokks_Image_connection | null;
  source: ProfileChannelSearch_User_channels_Channel_blokks_Image_source | null;
  counts: ProfileChannelSearch_User_channels_Channel_blokks_Image_counts | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  original_dimensions: ProfileChannelSearch_User_channels_Channel_blokks_Image_original_dimensions | null;
}

export interface ProfileChannelSearch_User_channels_Channel_blokks_Link_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ProfileChannelSearch_User_channels_Channel_blokks_Link_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ProfileChannelSearch_User_channels_Channel_blokks_Link_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ProfileChannelSearch_User_channels_Channel_blokks_Link_connection_user | null;
}

export interface ProfileChannelSearch_User_channels_Channel_blokks_Link_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ProfileChannelSearch_User_channels_Channel_blokks_Link_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ProfileChannelSearch_User_channels_Channel_blokks_Link {
  __typename: "Link";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: ProfileChannelSearch_User_channels_Channel_blokks_Link_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileChannelSearch_User_channels_Channel_blokks_Link_connection | null;
  source: ProfileChannelSearch_User_channels_Channel_blokks_Link_source | null;
  counts: ProfileChannelSearch_User_channels_Channel_blokks_Link_counts | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  external_url: string | null;
}

export interface ProfileChannelSearch_User_channels_Channel_blokks_Embed_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ProfileChannelSearch_User_channels_Channel_blokks_Embed_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ProfileChannelSearch_User_channels_Channel_blokks_Embed_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ProfileChannelSearch_User_channels_Channel_blokks_Embed_connection_user | null;
}

export interface ProfileChannelSearch_User_channels_Channel_blokks_Embed_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ProfileChannelSearch_User_channels_Channel_blokks_Embed_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ProfileChannelSearch_User_channels_Channel_blokks_Embed {
  __typename: "Embed";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: ProfileChannelSearch_User_channels_Channel_blokks_Embed_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileChannelSearch_User_channels_Channel_blokks_Embed_connection | null;
  source: ProfileChannelSearch_User_channels_Channel_blokks_Embed_source | null;
  counts: ProfileChannelSearch_User_channels_Channel_blokks_Embed_counts | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
}

export interface ProfileChannelSearch_User_channels_Channel_blokks_Attachment_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ProfileChannelSearch_User_channels_Channel_blokks_Attachment_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ProfileChannelSearch_User_channels_Channel_blokks_Attachment_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ProfileChannelSearch_User_channels_Channel_blokks_Attachment_connection_user | null;
}

export interface ProfileChannelSearch_User_channels_Channel_blokks_Attachment_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ProfileChannelSearch_User_channels_Channel_blokks_Attachment_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ProfileChannelSearch_User_channels_Channel_blokks_Attachment {
  __typename: "Attachment";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: ProfileChannelSearch_User_channels_Channel_blokks_Attachment_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileChannelSearch_User_channels_Channel_blokks_Attachment_connection | null;
  source: ProfileChannelSearch_User_channels_Channel_blokks_Attachment_source | null;
  counts: ProfileChannelSearch_User_channels_Channel_blokks_Attachment_counts | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  file_extension: string | null;
}

export interface ProfileChannelSearch_User_channels_Channel_blokks_PendingBlock_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ProfileChannelSearch_User_channels_Channel_blokks_PendingBlock_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ProfileChannelSearch_User_channels_Channel_blokks_PendingBlock_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ProfileChannelSearch_User_channels_Channel_blokks_PendingBlock_connection_user | null;
}

export interface ProfileChannelSearch_User_channels_Channel_blokks_PendingBlock_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ProfileChannelSearch_User_channels_Channel_blokks_PendingBlock_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ProfileChannelSearch_User_channels_Channel_blokks_PendingBlock {
  __typename: "PendingBlock";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: ProfileChannelSearch_User_channels_Channel_blokks_PendingBlock_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileChannelSearch_User_channels_Channel_blokks_PendingBlock_connection | null;
  source: ProfileChannelSearch_User_channels_Channel_blokks_PendingBlock_source | null;
  counts: ProfileChannelSearch_User_channels_Channel_blokks_PendingBlock_counts | null;
}

export interface ProfileChannelSearch_User_channels_Channel_blokks_Channel_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ProfileChannelSearch_User_channels_Channel_blokks_Channel_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ProfileChannelSearch_User_channels_Channel_blokks_Channel_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ProfileChannelSearch_User_channels_Channel_blokks_Channel_connection_user | null;
}

export interface ProfileChannelSearch_User_channels_Channel_blokks_Channel_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ProfileChannelSearch_User_channels_Channel_blokks_Channel_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface ProfileChannelSearch_User_channels_Channel_blokks_Channel_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  visibility: string | null;
}

export interface ProfileChannelSearch_User_channels_Channel_blokks_Channel_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export type ProfileChannelSearch_User_channels_Channel_blokks_Channel_owner = ProfileChannelSearch_User_channels_Channel_blokks_Channel_owner_Group | ProfileChannelSearch_User_channels_Channel_blokks_Channel_owner_User;

export interface ProfileChannelSearch_User_channels_Channel_blokks_Channel {
  __typename: "Channel";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: ProfileChannelSearch_User_channels_Channel_blokks_Channel_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileChannelSearch_User_channels_Channel_blokks_Channel_connection | null;
  source: ProfileChannelSearch_User_channels_Channel_blokks_Channel_source | null;
  truncatedTitle: string | null;
  visibility: string | null;
  counts: ProfileChannelSearch_User_channels_Channel_blokks_Channel_counts | null;
  owner: ProfileChannelSearch_User_channels_Channel_blokks_Channel_owner | null;
  label: string | null;
}

export type ProfileChannelSearch_User_channels_Channel_blokks = ProfileChannelSearch_User_channels_Channel_blokks_Text | ProfileChannelSearch_User_channels_Channel_blokks_Image | ProfileChannelSearch_User_channels_Channel_blokks_Link | ProfileChannelSearch_User_channels_Channel_blokks_Embed | ProfileChannelSearch_User_channels_Channel_blokks_Attachment | ProfileChannelSearch_User_channels_Channel_blokks_PendingBlock | ProfileChannelSearch_User_channels_Channel_blokks_Channel;

export interface ProfileChannelSearch_User_channels_Channel {
  __typename: "Channel";
  id: number | null;
  href: string | null;
  truncatedTitle: string | null;
  visibility: string | null;
  updated_at: string | null;
  counts: ProfileChannelSearch_User_channels_Channel_counts | null;
  owner: ProfileChannelSearch_User_channels_Channel_owner | null;
  label: string | null;
  blokks: (ProfileChannelSearch_User_channels_Channel_blokks | null)[] | null;
}

export type ProfileChannelSearch_User_channels = ProfileChannelSearch_User_channels_Text | ProfileChannelSearch_User_channels_Channel;

export interface ProfileChannelSearch_User {
  __typename: "User";
  id: number | null;
  name: string | null;
  counts: ProfileChannelSearch_User_counts | null;
  channels: (ProfileChannelSearch_User_channels | null)[] | null;
}

export type ProfileChannelSearch = ProfileChannelSearch_Group | ProfileChannelSearch_User;
