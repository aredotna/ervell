/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ChannelsSort } from "./globalTypes";

// ====================================================
// GraphQL query operation: ProfileChannelsQuery
// ====================================================

export interface ProfileChannelsQuery_identity_identifiable_Group_channels_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface ProfileChannelsQuery_identity_identifiable_Group_channels_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface ProfileChannelsQuery_identity_identifiable_Group_channels_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type ProfileChannelsQuery_identity_identifiable_Group_channels_owner = ProfileChannelsQuery_identity_identifiable_Group_channels_owner_Group | ProfileChannelsQuery_identity_identifiable_Group_channels_owner_User;

export interface ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Attachment_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Attachment_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Attachment_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Attachment_connection_user | null;
}

export interface ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Attachment_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Attachment_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Attachment {
  __typename: "Attachment";
  id: number;
  href: string | null;
  updated_at: string | null;
  title: string;
  user: ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Attachment_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Attachment_connection | null;
  source: ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Attachment_source | null;
  counts: ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Attachment_counts | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  file_extension: string | null;
}

export interface ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Embed_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Embed_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Embed_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Embed_connection_user | null;
}

export interface ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Embed_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Embed_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Embed {
  __typename: "Embed";
  id: number;
  href: string | null;
  updated_at: string | null;
  title: string;
  user: ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Embed_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Embed_connection | null;
  source: ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Embed_source | null;
  counts: ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Embed_counts | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
}

export interface ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Image_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Image_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Image_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Image_connection_user | null;
}

export interface ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Image_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Image_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Image_original_dimensions {
  __typename: "Dimensions";
  width: number | null;
  height: number | null;
}

export interface ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Image {
  __typename: "Image";
  id: number;
  href: string | null;
  updated_at: string | null;
  title: string;
  user: ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Image_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Image_connection | null;
  source: ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Image_source | null;
  counts: ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Image_counts | null;
  alt_text: string | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  original_dimensions: ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Image_original_dimensions | null;
}

export interface ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Link_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Link_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Link_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Link_connection_user | null;
}

export interface ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Link_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Link_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Link {
  __typename: "Link";
  id: number;
  href: string | null;
  updated_at: string | null;
  title: string;
  user: ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Link_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Link_connection | null;
  source: ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Link_source | null;
  counts: ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Link_counts | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  external_url: string | null;
}

export interface ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_PendingBlock_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_PendingBlock_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_PendingBlock_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_PendingBlock_connection_user | null;
}

export interface ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_PendingBlock_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_PendingBlock_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_PendingBlock {
  __typename: "PendingBlock";
  id: number;
  href: string | null;
  updated_at: string | null;
  title: string;
  user: ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_PendingBlock_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_PendingBlock_connection | null;
  source: ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_PendingBlock_source | null;
  counts: ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_PendingBlock_counts | null;
}

export interface ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Text_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Text_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Text_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Text_connection_user | null;
}

export interface ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Text_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Text_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Text {
  __typename: "Text";
  id: number;
  href: string | null;
  updated_at: string | null;
  title: string;
  user: ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Text_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Text_connection | null;
  source: ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Text_source | null;
  counts: ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Text_counts | null;
  content: string;
  raw: string;
}

export interface ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Channel_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Channel_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Channel_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Channel_connection_user | null;
}

export interface ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Channel_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Channel_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Channel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Channel_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Channel_owner = ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Channel_owner_Group | ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Channel_owner_User;

export interface ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Channel {
  __typename: "Channel";
  id: number;
  href: string | null;
  updated_at: string | null;
  title: string;
  user: ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Channel_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Channel_connection | null;
  source: ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Channel_source | null;
  truncatedTitle: string;
  visibility: string;
  counts: ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Channel_counts | null;
  owner: ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Channel_owner;
  label: string;
}

export type ProfileChannelsQuery_identity_identifiable_Group_channels_blokks = ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Attachment | ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Embed | ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Image | ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Link | ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_PendingBlock | ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Text | ProfileChannelsQuery_identity_identifiable_Group_channels_blokks_Channel;

export interface ProfileChannelsQuery_identity_identifiable_Group_channels {
  __typename: "Channel";
  id: number;
  href: string | null;
  truncatedTitle: string;
  visibility: string;
  updated_at: string | null;
  counts: ProfileChannelsQuery_identity_identifiable_Group_channels_counts | null;
  owner: ProfileChannelsQuery_identity_identifiable_Group_channels_owner;
  label: string;
  blokks: ProfileChannelsQuery_identity_identifiable_Group_channels_blokks[] | null;
}

export interface ProfileChannelsQuery_identity_identifiable_Group_counts {
  __typename: "GroupCounts";
  channels: number | null;
}

export interface ProfileChannelsQuery_identity_identifiable_Group {
  __typename: "Group";
  id: number;
  name: string;
  channels: ProfileChannelsQuery_identity_identifiable_Group_channels[] | null;
  counts: ProfileChannelsQuery_identity_identifiable_Group_counts | null;
}

export interface ProfileChannelsQuery_identity_identifiable_User_counts {
  __typename: "UserCounts";
  channels: number | null;
}

export interface ProfileChannelsQuery_identity_identifiable_User_channels_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface ProfileChannelsQuery_identity_identifiable_User_channels_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface ProfileChannelsQuery_identity_identifiable_User_channels_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type ProfileChannelsQuery_identity_identifiable_User_channels_owner = ProfileChannelsQuery_identity_identifiable_User_channels_owner_Group | ProfileChannelsQuery_identity_identifiable_User_channels_owner_User;

export interface ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Attachment_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Attachment_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Attachment_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Attachment_connection_user | null;
}

export interface ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Attachment_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Attachment_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Attachment {
  __typename: "Attachment";
  id: number;
  href: string | null;
  updated_at: string | null;
  title: string;
  user: ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Attachment_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Attachment_connection | null;
  source: ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Attachment_source | null;
  counts: ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Attachment_counts | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  file_extension: string | null;
}

export interface ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Embed_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Embed_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Embed_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Embed_connection_user | null;
}

export interface ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Embed_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Embed_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Embed {
  __typename: "Embed";
  id: number;
  href: string | null;
  updated_at: string | null;
  title: string;
  user: ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Embed_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Embed_connection | null;
  source: ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Embed_source | null;
  counts: ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Embed_counts | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
}

export interface ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Image_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Image_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Image_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Image_connection_user | null;
}

export interface ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Image_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Image_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Image_original_dimensions {
  __typename: "Dimensions";
  width: number | null;
  height: number | null;
}

export interface ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Image {
  __typename: "Image";
  id: number;
  href: string | null;
  updated_at: string | null;
  title: string;
  user: ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Image_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Image_connection | null;
  source: ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Image_source | null;
  counts: ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Image_counts | null;
  alt_text: string | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  original_dimensions: ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Image_original_dimensions | null;
}

export interface ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Link_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Link_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Link_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Link_connection_user | null;
}

export interface ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Link_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Link_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Link {
  __typename: "Link";
  id: number;
  href: string | null;
  updated_at: string | null;
  title: string;
  user: ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Link_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Link_connection | null;
  source: ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Link_source | null;
  counts: ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Link_counts | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  external_url: string | null;
}

export interface ProfileChannelsQuery_identity_identifiable_User_channels_blokks_PendingBlock_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ProfileChannelsQuery_identity_identifiable_User_channels_blokks_PendingBlock_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ProfileChannelsQuery_identity_identifiable_User_channels_blokks_PendingBlock_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ProfileChannelsQuery_identity_identifiable_User_channels_blokks_PendingBlock_connection_user | null;
}

export interface ProfileChannelsQuery_identity_identifiable_User_channels_blokks_PendingBlock_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ProfileChannelsQuery_identity_identifiable_User_channels_blokks_PendingBlock_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ProfileChannelsQuery_identity_identifiable_User_channels_blokks_PendingBlock {
  __typename: "PendingBlock";
  id: number;
  href: string | null;
  updated_at: string | null;
  title: string;
  user: ProfileChannelsQuery_identity_identifiable_User_channels_blokks_PendingBlock_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileChannelsQuery_identity_identifiable_User_channels_blokks_PendingBlock_connection | null;
  source: ProfileChannelsQuery_identity_identifiable_User_channels_blokks_PendingBlock_source | null;
  counts: ProfileChannelsQuery_identity_identifiable_User_channels_blokks_PendingBlock_counts | null;
}

export interface ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Text_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Text_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Text_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Text_connection_user | null;
}

export interface ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Text_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Text_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Text {
  __typename: "Text";
  id: number;
  href: string | null;
  updated_at: string | null;
  title: string;
  user: ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Text_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Text_connection | null;
  source: ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Text_source | null;
  counts: ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Text_counts | null;
  content: string;
  raw: string;
}

export interface ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Channel_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Channel_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Channel_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Channel_connection_user | null;
}

export interface ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Channel_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Channel_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Channel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Channel_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Channel_owner = ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Channel_owner_Group | ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Channel_owner_User;

export interface ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Channel {
  __typename: "Channel";
  id: number;
  href: string | null;
  updated_at: string | null;
  title: string;
  user: ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Channel_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Channel_connection | null;
  source: ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Channel_source | null;
  truncatedTitle: string;
  visibility: string;
  counts: ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Channel_counts | null;
  owner: ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Channel_owner;
  label: string;
}

export type ProfileChannelsQuery_identity_identifiable_User_channels_blokks = ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Attachment | ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Embed | ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Image | ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Link | ProfileChannelsQuery_identity_identifiable_User_channels_blokks_PendingBlock | ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Text | ProfileChannelsQuery_identity_identifiable_User_channels_blokks_Channel;

export interface ProfileChannelsQuery_identity_identifiable_User_channels {
  __typename: "Channel";
  id: number;
  href: string | null;
  truncatedTitle: string;
  visibility: string;
  updated_at: string | null;
  counts: ProfileChannelsQuery_identity_identifiable_User_channels_counts | null;
  owner: ProfileChannelsQuery_identity_identifiable_User_channels_owner;
  label: string;
  blokks: ProfileChannelsQuery_identity_identifiable_User_channels_blokks[] | null;
}

export interface ProfileChannelsQuery_identity_identifiable_User {
  __typename: "User";
  id: number;
  name: string;
  counts: ProfileChannelsQuery_identity_identifiable_User_counts | null;
  channels: ProfileChannelsQuery_identity_identifiable_User_channels[] | null;
}

export type ProfileChannelsQuery_identity_identifiable = ProfileChannelsQuery_identity_identifiable_Group | ProfileChannelsQuery_identity_identifiable_User;

export interface ProfileChannelsQuery_identity {
  __typename: "Identity";
  identifiable: ProfileChannelsQuery_identity_identifiable;
}

export interface ProfileChannelsQuery {
  identity: ProfileChannelsQuery_identity | null;
}

export interface ProfileChannelsQueryVariables {
  id: string;
  page?: number | null;
  per?: number | null;
  sort?: ChannelsSort | null;
}
