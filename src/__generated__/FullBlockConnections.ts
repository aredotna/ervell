/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FullBlockConnections
// ====================================================

export interface FullBlockConnections_Channel_current_user_channels_channel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface FullBlockConnections_Channel_current_user_channels_channel_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type FullBlockConnections_Channel_current_user_channels_channel_owner = FullBlockConnections_Channel_current_user_channels_channel_owner_Group | FullBlockConnections_Channel_current_user_channels_channel_owner_User;

export interface FullBlockConnections_Channel_current_user_channels_channel_counts {
  __typename: "ChannelCounts";
  contents: number;
}

export interface FullBlockConnections_Channel_current_user_channels_channel {
  __typename: "Channel";
  id: number;
  href: string;
  visibility: string;
  title: string;
  owner: FullBlockConnections_Channel_current_user_channels_channel_owner;
  counts: FullBlockConnections_Channel_current_user_channels_channel_counts;
  label: string;
}

export interface FullBlockConnections_Channel_current_user_channels {
  __typename: "Connection";
  id: number;
  created_at: string;
  channel: FullBlockConnections_Channel_current_user_channels_channel;
}

export interface FullBlockConnections_Channel_public_channels_channel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface FullBlockConnections_Channel_public_channels_channel_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type FullBlockConnections_Channel_public_channels_channel_owner = FullBlockConnections_Channel_public_channels_channel_owner_Group | FullBlockConnections_Channel_public_channels_channel_owner_User;

export interface FullBlockConnections_Channel_public_channels_channel_counts {
  __typename: "ChannelCounts";
  contents: number;
}

export interface FullBlockConnections_Channel_public_channels_channel {
  __typename: "Channel";
  id: number;
  href: string;
  visibility: string;
  title: string;
  owner: FullBlockConnections_Channel_public_channels_channel_owner;
  counts: FullBlockConnections_Channel_public_channels_channel_counts;
  label: string;
}

export interface FullBlockConnections_Channel_public_channels {
  __typename: "Connection";
  id: number;
  created_at: string;
  channel: FullBlockConnections_Channel_public_channels_channel;
}

export interface FullBlockConnections_Channel_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface FullBlockConnections_Channel {
  __typename: "Channel";
  id: number;
  current_user_channels: FullBlockConnections_Channel_current_user_channels[] | null;
  public_channels: FullBlockConnections_Channel_public_channels[] | null;
  source: FullBlockConnections_Channel_source | null;
}

export interface FullBlockConnections_Attachment_counts {
  __typename: "BlockCounts";
  public_channels: number;
  current_user_channels: number;
  private_channels: number;
  channels_with_same_source: number;
}

export interface FullBlockConnections_Attachment_current_user_channels_channel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface FullBlockConnections_Attachment_current_user_channels_channel_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type FullBlockConnections_Attachment_current_user_channels_channel_owner = FullBlockConnections_Attachment_current_user_channels_channel_owner_Group | FullBlockConnections_Attachment_current_user_channels_channel_owner_User;

export interface FullBlockConnections_Attachment_current_user_channels_channel_counts {
  __typename: "ChannelCounts";
  contents: number;
}

export interface FullBlockConnections_Attachment_current_user_channels_channel {
  __typename: "Channel";
  id: number;
  href: string;
  visibility: string;
  title: string;
  owner: FullBlockConnections_Attachment_current_user_channels_channel_owner;
  counts: FullBlockConnections_Attachment_current_user_channels_channel_counts;
  label: string;
}

export interface FullBlockConnections_Attachment_current_user_channels {
  __typename: "Connection";
  id: number;
  created_at: string;
  channel: FullBlockConnections_Attachment_current_user_channels_channel;
}

export interface FullBlockConnections_Attachment_public_channels_channel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface FullBlockConnections_Attachment_public_channels_channel_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type FullBlockConnections_Attachment_public_channels_channel_owner = FullBlockConnections_Attachment_public_channels_channel_owner_Group | FullBlockConnections_Attachment_public_channels_channel_owner_User;

export interface FullBlockConnections_Attachment_public_channels_channel_counts {
  __typename: "ChannelCounts";
  contents: number;
}

export interface FullBlockConnections_Attachment_public_channels_channel {
  __typename: "Channel";
  id: number;
  href: string;
  visibility: string;
  title: string;
  owner: FullBlockConnections_Attachment_public_channels_channel_owner;
  counts: FullBlockConnections_Attachment_public_channels_channel_counts;
  label: string;
}

export interface FullBlockConnections_Attachment_public_channels {
  __typename: "Connection";
  id: number;
  created_at: string;
  channel: FullBlockConnections_Attachment_public_channels_channel;
}

export interface FullBlockConnections_Attachment_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface FullBlockConnections_Attachment_channels_with_same_source_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface FullBlockConnections_Attachment_channels_with_same_source_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type FullBlockConnections_Attachment_channels_with_same_source_owner = FullBlockConnections_Attachment_channels_with_same_source_owner_Group | FullBlockConnections_Attachment_channels_with_same_source_owner_User;

export interface FullBlockConnections_Attachment_channels_with_same_source_counts {
  __typename: "ChannelCounts";
  contents: number;
}

export interface FullBlockConnections_Attachment_channels_with_same_source {
  __typename: "Channel";
  id: number;
  href: string;
  visibility: string;
  title: string;
  owner: FullBlockConnections_Attachment_channels_with_same_source_owner;
  counts: FullBlockConnections_Attachment_channels_with_same_source_counts;
  label: string;
}

export interface FullBlockConnections_Attachment {
  __typename: "Attachment" | "Embed" | "Image" | "Link" | "PendingBlock" | "Text";
  id: number;
  counts: FullBlockConnections_Attachment_counts;
  current_user_channels: FullBlockConnections_Attachment_current_user_channels[] | null;
  public_channels: FullBlockConnections_Attachment_public_channels[] | null;
  source: FullBlockConnections_Attachment_source | null;
  channels_with_same_source: FullBlockConnections_Attachment_channels_with_same_source[];
}

export type FullBlockConnections = FullBlockConnections_Channel | FullBlockConnections_Attachment;
