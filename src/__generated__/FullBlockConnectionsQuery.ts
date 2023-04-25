/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FullBlockConnectionsQuery
// ====================================================

export interface FullBlockConnectionsQuery_block_Channel_current_user_channels_channel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface FullBlockConnectionsQuery_block_Channel_current_user_channels_channel_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type FullBlockConnectionsQuery_block_Channel_current_user_channels_channel_owner = FullBlockConnectionsQuery_block_Channel_current_user_channels_channel_owner_Group | FullBlockConnectionsQuery_block_Channel_current_user_channels_channel_owner_User;

export interface FullBlockConnectionsQuery_block_Channel_current_user_channels_channel_counts {
  __typename: "ChannelCounts";
  contents: number;
}

export interface FullBlockConnectionsQuery_block_Channel_current_user_channels_channel {
  __typename: "Channel";
  id: number;
  href: string;
  visibility: string;
  title: string;
  owner: FullBlockConnectionsQuery_block_Channel_current_user_channels_channel_owner;
  counts: FullBlockConnectionsQuery_block_Channel_current_user_channels_channel_counts;
  label: string;
}

export interface FullBlockConnectionsQuery_block_Channel_current_user_channels {
  __typename: "Connection";
  id: number;
  created_at: string;
  channel: FullBlockConnectionsQuery_block_Channel_current_user_channels_channel;
}

export interface FullBlockConnectionsQuery_block_Channel_public_channels_channel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface FullBlockConnectionsQuery_block_Channel_public_channels_channel_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type FullBlockConnectionsQuery_block_Channel_public_channels_channel_owner = FullBlockConnectionsQuery_block_Channel_public_channels_channel_owner_Group | FullBlockConnectionsQuery_block_Channel_public_channels_channel_owner_User;

export interface FullBlockConnectionsQuery_block_Channel_public_channels_channel_counts {
  __typename: "ChannelCounts";
  contents: number;
}

export interface FullBlockConnectionsQuery_block_Channel_public_channels_channel {
  __typename: "Channel";
  id: number;
  href: string;
  visibility: string;
  title: string;
  owner: FullBlockConnectionsQuery_block_Channel_public_channels_channel_owner;
  counts: FullBlockConnectionsQuery_block_Channel_public_channels_channel_counts;
  label: string;
}

export interface FullBlockConnectionsQuery_block_Channel_public_channels {
  __typename: "Connection";
  id: number;
  created_at: string;
  channel: FullBlockConnectionsQuery_block_Channel_public_channels_channel;
}

export interface FullBlockConnectionsQuery_block_Channel_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface FullBlockConnectionsQuery_block_Channel {
  __typename: "Channel";
  id: number;
  current_user_channels: FullBlockConnectionsQuery_block_Channel_current_user_channels[] | null;
  public_channels: FullBlockConnectionsQuery_block_Channel_public_channels[] | null;
  source: FullBlockConnectionsQuery_block_Channel_source | null;
}

export interface FullBlockConnectionsQuery_block_Attachment_current_user_channels_channel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface FullBlockConnectionsQuery_block_Attachment_current_user_channels_channel_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type FullBlockConnectionsQuery_block_Attachment_current_user_channels_channel_owner = FullBlockConnectionsQuery_block_Attachment_current_user_channels_channel_owner_Group | FullBlockConnectionsQuery_block_Attachment_current_user_channels_channel_owner_User;

export interface FullBlockConnectionsQuery_block_Attachment_current_user_channels_channel_counts {
  __typename: "ChannelCounts";
  contents: number;
}

export interface FullBlockConnectionsQuery_block_Attachment_current_user_channels_channel {
  __typename: "Channel";
  id: number;
  href: string;
  visibility: string;
  title: string;
  owner: FullBlockConnectionsQuery_block_Attachment_current_user_channels_channel_owner;
  counts: FullBlockConnectionsQuery_block_Attachment_current_user_channels_channel_counts;
  label: string;
}

export interface FullBlockConnectionsQuery_block_Attachment_current_user_channels {
  __typename: "Connection";
  id: number;
  created_at: string;
  channel: FullBlockConnectionsQuery_block_Attachment_current_user_channels_channel;
}

export interface FullBlockConnectionsQuery_block_Attachment_public_channels_channel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface FullBlockConnectionsQuery_block_Attachment_public_channels_channel_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type FullBlockConnectionsQuery_block_Attachment_public_channels_channel_owner = FullBlockConnectionsQuery_block_Attachment_public_channels_channel_owner_Group | FullBlockConnectionsQuery_block_Attachment_public_channels_channel_owner_User;

export interface FullBlockConnectionsQuery_block_Attachment_public_channels_channel_counts {
  __typename: "ChannelCounts";
  contents: number;
}

export interface FullBlockConnectionsQuery_block_Attachment_public_channels_channel {
  __typename: "Channel";
  id: number;
  href: string;
  visibility: string;
  title: string;
  owner: FullBlockConnectionsQuery_block_Attachment_public_channels_channel_owner;
  counts: FullBlockConnectionsQuery_block_Attachment_public_channels_channel_counts;
  label: string;
}

export interface FullBlockConnectionsQuery_block_Attachment_public_channels {
  __typename: "Connection";
  id: number;
  created_at: string;
  channel: FullBlockConnectionsQuery_block_Attachment_public_channels_channel;
}

export interface FullBlockConnectionsQuery_block_Attachment_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface FullBlockConnectionsQuery_block_Attachment_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
  current_user_channels: number | null;
  private_channels: number | null;
  channels_with_same_source: number | null;
}

export interface FullBlockConnectionsQuery_block_Attachment_channels_with_same_source_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface FullBlockConnectionsQuery_block_Attachment_channels_with_same_source_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type FullBlockConnectionsQuery_block_Attachment_channels_with_same_source_owner = FullBlockConnectionsQuery_block_Attachment_channels_with_same_source_owner_Group | FullBlockConnectionsQuery_block_Attachment_channels_with_same_source_owner_User;

export interface FullBlockConnectionsQuery_block_Attachment_channels_with_same_source_counts {
  __typename: "ChannelCounts";
  contents: number;
}

export interface FullBlockConnectionsQuery_block_Attachment_channels_with_same_source {
  __typename: "Channel";
  id: number;
  href: string;
  visibility: string;
  title: string;
  owner: FullBlockConnectionsQuery_block_Attachment_channels_with_same_source_owner;
  counts: FullBlockConnectionsQuery_block_Attachment_channels_with_same_source_counts;
  label: string;
}

export interface FullBlockConnectionsQuery_block_Attachment {
  __typename: "Attachment" | "Embed" | "Image" | "Link" | "PendingBlock" | "Text";
  id: number;
  current_user_channels: FullBlockConnectionsQuery_block_Attachment_current_user_channels[] | null;
  public_channels: FullBlockConnectionsQuery_block_Attachment_public_channels[] | null;
  source: FullBlockConnectionsQuery_block_Attachment_source | null;
  counts: FullBlockConnectionsQuery_block_Attachment_counts | null;
  channels_with_same_source: FullBlockConnectionsQuery_block_Attachment_channels_with_same_source[];
}

export type FullBlockConnectionsQuery_block = FullBlockConnectionsQuery_block_Channel | FullBlockConnectionsQuery_block_Attachment;

export interface FullBlockConnectionsQuery {
  block: FullBlockConnectionsQuery_block | null;
}

export interface FullBlockConnectionsQueryVariables {
  id: string;
  page?: number | null;
  per?: number | null;
}
