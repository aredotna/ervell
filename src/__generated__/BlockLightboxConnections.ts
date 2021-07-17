/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BlockLightboxConnections
// ====================================================

export interface BlockLightboxConnections_Channel_current_user_channels_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface BlockLightboxConnections_Channel_current_user_channels_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type BlockLightboxConnections_Channel_current_user_channels_owner = BlockLightboxConnections_Channel_current_user_channels_owner_Group | BlockLightboxConnections_Channel_current_user_channels_owner_User;

export interface BlockLightboxConnections_Channel_current_user_channels_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface BlockLightboxConnections_Channel_current_user_channels {
  __typename: "Channel";
  id: number;
  href: string | null;
  visibility: string;
  title: string;
  owner: BlockLightboxConnections_Channel_current_user_channels_owner;
  counts: BlockLightboxConnections_Channel_current_user_channels_counts | null;
  label: string;
}

export interface BlockLightboxConnections_Channel_public_channels_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface BlockLightboxConnections_Channel_public_channels_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type BlockLightboxConnections_Channel_public_channels_owner = BlockLightboxConnections_Channel_public_channels_owner_Group | BlockLightboxConnections_Channel_public_channels_owner_User;

export interface BlockLightboxConnections_Channel_public_channels_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface BlockLightboxConnections_Channel_public_channels {
  __typename: "Channel";
  id: number;
  href: string | null;
  visibility: string;
  title: string;
  owner: BlockLightboxConnections_Channel_public_channels_owner;
  counts: BlockLightboxConnections_Channel_public_channels_counts | null;
  label: string;
}

export interface BlockLightboxConnections_Channel_private_channels_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface BlockLightboxConnections_Channel_private_channels_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type BlockLightboxConnections_Channel_private_channels_owner = BlockLightboxConnections_Channel_private_channels_owner_Group | BlockLightboxConnections_Channel_private_channels_owner_User;

export interface BlockLightboxConnections_Channel_private_channels_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface BlockLightboxConnections_Channel_private_channels {
  __typename: "Channel";
  id: number;
  href: string | null;
  visibility: string;
  title: string;
  owner: BlockLightboxConnections_Channel_private_channels_owner;
  counts: BlockLightboxConnections_Channel_private_channels_counts | null;
  label: string;
}

export interface BlockLightboxConnections_Channel_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface BlockLightboxConnections_Channel {
  __typename: "Channel";
  id: number;
  current_user_channels: BlockLightboxConnections_Channel_current_user_channels[] | null;
  public_channels: BlockLightboxConnections_Channel_public_channels[] | null;
  private_channels: BlockLightboxConnections_Channel_private_channels[] | null;
  source: BlockLightboxConnections_Channel_source | null;
}

export interface BlockLightboxConnections_Attachment_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
  current_user_channels: number | null;
  private_channels: number | null;
  channels_with_same_source: number | null;
}

export interface BlockLightboxConnections_Attachment_current_user_channels_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface BlockLightboxConnections_Attachment_current_user_channels_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type BlockLightboxConnections_Attachment_current_user_channels_owner = BlockLightboxConnections_Attachment_current_user_channels_owner_Group | BlockLightboxConnections_Attachment_current_user_channels_owner_User;

export interface BlockLightboxConnections_Attachment_current_user_channels_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface BlockLightboxConnections_Attachment_current_user_channels {
  __typename: "Channel";
  id: number;
  href: string | null;
  visibility: string;
  title: string;
  owner: BlockLightboxConnections_Attachment_current_user_channels_owner;
  counts: BlockLightboxConnections_Attachment_current_user_channels_counts | null;
  label: string;
}

export interface BlockLightboxConnections_Attachment_public_channels_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface BlockLightboxConnections_Attachment_public_channels_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type BlockLightboxConnections_Attachment_public_channels_owner = BlockLightboxConnections_Attachment_public_channels_owner_Group | BlockLightboxConnections_Attachment_public_channels_owner_User;

export interface BlockLightboxConnections_Attachment_public_channels_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface BlockLightboxConnections_Attachment_public_channels {
  __typename: "Channel";
  id: number;
  href: string | null;
  visibility: string;
  title: string;
  owner: BlockLightboxConnections_Attachment_public_channels_owner;
  counts: BlockLightboxConnections_Attachment_public_channels_counts | null;
  label: string;
}

export interface BlockLightboxConnections_Attachment_private_channels_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface BlockLightboxConnections_Attachment_private_channels_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type BlockLightboxConnections_Attachment_private_channels_owner = BlockLightboxConnections_Attachment_private_channels_owner_Group | BlockLightboxConnections_Attachment_private_channels_owner_User;

export interface BlockLightboxConnections_Attachment_private_channels_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface BlockLightboxConnections_Attachment_private_channels {
  __typename: "Channel";
  id: number;
  href: string | null;
  visibility: string;
  title: string;
  owner: BlockLightboxConnections_Attachment_private_channels_owner;
  counts: BlockLightboxConnections_Attachment_private_channels_counts | null;
  label: string;
}

export interface BlockLightboxConnections_Attachment_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface BlockLightboxConnections_Attachment_channels_with_same_source_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface BlockLightboxConnections_Attachment_channels_with_same_source_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type BlockLightboxConnections_Attachment_channels_with_same_source_owner = BlockLightboxConnections_Attachment_channels_with_same_source_owner_Group | BlockLightboxConnections_Attachment_channels_with_same_source_owner_User;

export interface BlockLightboxConnections_Attachment_channels_with_same_source_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface BlockLightboxConnections_Attachment_channels_with_same_source {
  __typename: "Channel";
  id: number;
  href: string | null;
  visibility: string;
  title: string;
  owner: BlockLightboxConnections_Attachment_channels_with_same_source_owner;
  counts: BlockLightboxConnections_Attachment_channels_with_same_source_counts | null;
  label: string;
}

export interface BlockLightboxConnections_Attachment {
  __typename: "Attachment" | "Embed" | "Image" | "Link" | "PendingBlock" | "Text";
  id: number;
  counts: BlockLightboxConnections_Attachment_counts | null;
  current_user_channels: BlockLightboxConnections_Attachment_current_user_channels[] | null;
  public_channels: BlockLightboxConnections_Attachment_public_channels[] | null;
  private_channels: BlockLightboxConnections_Attachment_private_channels[] | null;
  source: BlockLightboxConnections_Attachment_source | null;
  channels_with_same_source: BlockLightboxConnections_Attachment_channels_with_same_source[] | null;
}

export type BlockLightboxConnections = BlockLightboxConnections_Channel | BlockLightboxConnections_Attachment;
