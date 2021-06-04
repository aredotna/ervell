/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchSorts } from "./globalTypes";

// ====================================================
// GraphQL query operation: ProfileChannelsSearch
// ====================================================

export interface ProfileChannelsSearch_identity_identifiable_Group_channels_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface ProfileChannelsSearch_identity_identifiable_Group_channels_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  visibility: string | null;
}

export interface ProfileChannelsSearch_identity_identifiable_Group_channels_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export type ProfileChannelsSearch_identity_identifiable_Group_channels_owner = ProfileChannelsSearch_identity_identifiable_Group_channels_owner_Group | ProfileChannelsSearch_identity_identifiable_Group_channels_owner_User;

export interface ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Text_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Text_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Text_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Text_connection_user | null;
}

export interface ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Text_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Text_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Text {
  __typename: "Text";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Text_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Text_connection | null;
  source: ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Text_source | null;
  counts: ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Text_counts | null;
  content: string | null;
}

export interface ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Image_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Image_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Image_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Image_connection_user | null;
}

export interface ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Image_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Image_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Image_original_dimensions {
  __typename: "Dimensions";
  width: number | null;
  height: number | null;
}

export interface ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Image {
  __typename: "Image";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Image_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Image_connection | null;
  source: ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Image_source | null;
  counts: ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Image_counts | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  original_dimensions: ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Image_original_dimensions | null;
}

export interface ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Link_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Link_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Link_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Link_connection_user | null;
}

export interface ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Link_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Link_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Link {
  __typename: "Link";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Link_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Link_connection | null;
  source: ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Link_source | null;
  counts: ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Link_counts | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  external_url: string | null;
}

export interface ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Embed_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Embed_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Embed_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Embed_connection_user | null;
}

export interface ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Embed_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Embed_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Embed {
  __typename: "Embed";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Embed_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Embed_connection | null;
  source: ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Embed_source | null;
  counts: ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Embed_counts | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
}

export interface ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Attachment_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Attachment_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Attachment_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Attachment_connection_user | null;
}

export interface ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Attachment_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Attachment_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Attachment {
  __typename: "Attachment";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Attachment_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Attachment_connection | null;
  source: ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Attachment_source | null;
  counts: ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Attachment_counts | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  file_extension: string | null;
}

export interface ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_PendingBlock_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_PendingBlock_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_PendingBlock_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_PendingBlock_connection_user | null;
}

export interface ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_PendingBlock_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_PendingBlock_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_PendingBlock {
  __typename: "PendingBlock";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_PendingBlock_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_PendingBlock_connection | null;
  source: ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_PendingBlock_source | null;
  counts: ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_PendingBlock_counts | null;
}

export interface ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Channel_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Channel_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Channel_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Channel_connection_user | null;
}

export interface ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Channel_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Channel_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Channel_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  visibility: string | null;
}

export interface ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Channel_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export type ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Channel_owner = ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Channel_owner_Group | ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Channel_owner_User;

export interface ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Channel {
  __typename: "Channel";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Channel_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Channel_connection | null;
  source: ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Channel_source | null;
  truncatedTitle: string | null;
  visibility: string | null;
  counts: ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Channel_counts | null;
  owner: ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Channel_owner | null;
  label: string | null;
}

export type ProfileChannelsSearch_identity_identifiable_Group_channels_blokks = ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Text | ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Image | ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Link | ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Embed | ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Attachment | ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_PendingBlock | ProfileChannelsSearch_identity_identifiable_Group_channels_blokks_Channel;

export interface ProfileChannelsSearch_identity_identifiable_Group_channels {
  __typename: "Channel";
  id: number | null;
  href: string | null;
  truncatedTitle: string | null;
  visibility: string | null;
  updated_at: string | null;
  counts: ProfileChannelsSearch_identity_identifiable_Group_channels_counts | null;
  owner: ProfileChannelsSearch_identity_identifiable_Group_channels_owner | null;
  label: string | null;
  blokks: (ProfileChannelsSearch_identity_identifiable_Group_channels_blokks | null)[] | null;
}

export interface ProfileChannelsSearch_identity_identifiable_Group_counts {
  __typename: "GroupCounts";
  channels: number | null;
}

export interface ProfileChannelsSearch_identity_identifiable_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  channels: (ProfileChannelsSearch_identity_identifiable_Group_channels | null)[] | null;
  counts: ProfileChannelsSearch_identity_identifiable_Group_counts | null;
}

export interface ProfileChannelsSearch_identity_identifiable_User_counts {
  __typename: "UserCounts";
  channels: number | null;
}

export interface ProfileChannelsSearch_identity_identifiable_User_channels_Text {
  __typename: "Text" | "Image" | "Link" | "Embed" | "Attachment" | "PendingBlock";
}

export interface ProfileChannelsSearch_identity_identifiable_User_channels_Channel_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface ProfileChannelsSearch_identity_identifiable_User_channels_Channel_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  visibility: string | null;
}

export interface ProfileChannelsSearch_identity_identifiable_User_channels_Channel_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export type ProfileChannelsSearch_identity_identifiable_User_channels_Channel_owner = ProfileChannelsSearch_identity_identifiable_User_channels_Channel_owner_Group | ProfileChannelsSearch_identity_identifiable_User_channels_Channel_owner_User;

export interface ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Text_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Text_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Text_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Text_connection_user | null;
}

export interface ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Text_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Text_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Text {
  __typename: "Text";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Text_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Text_connection | null;
  source: ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Text_source | null;
  counts: ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Text_counts | null;
  content: string | null;
}

export interface ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Image_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Image_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Image_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Image_connection_user | null;
}

export interface ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Image_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Image_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Image_original_dimensions {
  __typename: "Dimensions";
  width: number | null;
  height: number | null;
}

export interface ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Image {
  __typename: "Image";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Image_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Image_connection | null;
  source: ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Image_source | null;
  counts: ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Image_counts | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  original_dimensions: ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Image_original_dimensions | null;
}

export interface ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Link_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Link_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Link_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Link_connection_user | null;
}

export interface ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Link_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Link_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Link {
  __typename: "Link";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Link_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Link_connection | null;
  source: ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Link_source | null;
  counts: ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Link_counts | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  external_url: string | null;
}

export interface ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Embed_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Embed_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Embed_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Embed_connection_user | null;
}

export interface ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Embed_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Embed_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Embed {
  __typename: "Embed";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Embed_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Embed_connection | null;
  source: ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Embed_source | null;
  counts: ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Embed_counts | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
}

export interface ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Attachment_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Attachment_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Attachment_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Attachment_connection_user | null;
}

export interface ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Attachment_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Attachment_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Attachment {
  __typename: "Attachment";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Attachment_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Attachment_connection | null;
  source: ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Attachment_source | null;
  counts: ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Attachment_counts | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  file_extension: string | null;
}

export interface ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_PendingBlock_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_PendingBlock_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_PendingBlock_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_PendingBlock_connection_user | null;
}

export interface ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_PendingBlock_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_PendingBlock_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_PendingBlock {
  __typename: "PendingBlock";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_PendingBlock_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_PendingBlock_connection | null;
  source: ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_PendingBlock_source | null;
  counts: ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_PendingBlock_counts | null;
}

export interface ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Channel_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Channel_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Channel_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Channel_connection_user | null;
}

export interface ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Channel_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Channel_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Channel_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  visibility: string | null;
}

export interface ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Channel_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export type ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Channel_owner = ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Channel_owner_Group | ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Channel_owner_User;

export interface ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Channel {
  __typename: "Channel";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Channel_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Channel_connection | null;
  source: ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Channel_source | null;
  truncatedTitle: string | null;
  visibility: string | null;
  counts: ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Channel_counts | null;
  owner: ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Channel_owner | null;
  label: string | null;
}

export type ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks = ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Text | ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Image | ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Link | ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Embed | ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Attachment | ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_PendingBlock | ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks_Channel;

export interface ProfileChannelsSearch_identity_identifiable_User_channels_Channel {
  __typename: "Channel";
  id: number | null;
  href: string | null;
  truncatedTitle: string | null;
  visibility: string | null;
  updated_at: string | null;
  counts: ProfileChannelsSearch_identity_identifiable_User_channels_Channel_counts | null;
  owner: ProfileChannelsSearch_identity_identifiable_User_channels_Channel_owner | null;
  label: string | null;
  blokks: (ProfileChannelsSearch_identity_identifiable_User_channels_Channel_blokks | null)[] | null;
}

export type ProfileChannelsSearch_identity_identifiable_User_channels = ProfileChannelsSearch_identity_identifiable_User_channels_Text | ProfileChannelsSearch_identity_identifiable_User_channels_Channel;

export interface ProfileChannelsSearch_identity_identifiable_User {
  __typename: "User";
  id: number | null;
  name: string | null;
  counts: ProfileChannelsSearch_identity_identifiable_User_counts | null;
  channels: (ProfileChannelsSearch_identity_identifiable_User_channels | null)[] | null;
}

export type ProfileChannelsSearch_identity_identifiable = ProfileChannelsSearch_identity_identifiable_Group | ProfileChannelsSearch_identity_identifiable_User;

export interface ProfileChannelsSearch_identity {
  __typename: "Identity";
  identifiable: ProfileChannelsSearch_identity_identifiable;
}

export interface ProfileChannelsSearch {
  identity: ProfileChannelsSearch_identity | null;
}

export interface ProfileChannelsSearchVariables {
  id: string;
  page?: number | null;
  per?: number | null;
  sort?: SearchSorts | null;
  q?: string | null;
  seed?: number | null;
}
