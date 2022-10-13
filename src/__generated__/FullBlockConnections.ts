/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FullBlockConnections
// ====================================================

export interface FullBlockConnections_Channel_current_user_channels_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface FullBlockConnections_Channel_current_user_channels_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type FullBlockConnections_Channel_current_user_channels_owner = FullBlockConnections_Channel_current_user_channels_owner_Group | FullBlockConnections_Channel_current_user_channels_owner_User;

export interface FullBlockConnections_Channel_current_user_channels_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface FullBlockConnections_Channel_current_user_channels {
  __typename: "Channel";
  id: number;
  href: string | null;
  visibility: string;
  title: string;
  owner: FullBlockConnections_Channel_current_user_channels_owner;
  counts: FullBlockConnections_Channel_current_user_channels_counts | null;
  label: string;
}

export interface FullBlockConnections_Channel_public_channels_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface FullBlockConnections_Channel_public_channels_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type FullBlockConnections_Channel_public_channels_owner = FullBlockConnections_Channel_public_channels_owner_Group | FullBlockConnections_Channel_public_channels_owner_User;

export interface FullBlockConnections_Channel_public_channels_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface FullBlockConnections_Channel_public_channels {
  __typename: "Channel";
  id: number;
  href: string | null;
  visibility: string;
  title: string;
  owner: FullBlockConnections_Channel_public_channels_owner;
  counts: FullBlockConnections_Channel_public_channels_counts | null;
  label: string;
}

export interface FullBlockConnections_Channel_private_channels_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface FullBlockConnections_Channel_private_channels_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type FullBlockConnections_Channel_private_channels_owner = FullBlockConnections_Channel_private_channels_owner_Group | FullBlockConnections_Channel_private_channels_owner_User;

export interface FullBlockConnections_Channel_private_channels_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface FullBlockConnections_Channel_private_channels {
  __typename: "Channel";
  id: number;
  href: string | null;
  visibility: string;
  title: string;
  owner: FullBlockConnections_Channel_private_channels_owner;
  counts: FullBlockConnections_Channel_private_channels_counts | null;
  label: string;
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
  private_channels: FullBlockConnections_Channel_private_channels[] | null;
  source: FullBlockConnections_Channel_source | null;
}

export interface FullBlockConnections_Attachment_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
  current_user_channels: number | null;
  private_channels: number | null;
}

export interface FullBlockConnections_Attachment_current_user_channels_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface FullBlockConnections_Attachment_current_user_channels_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type FullBlockConnections_Attachment_current_user_channels_owner = FullBlockConnections_Attachment_current_user_channels_owner_Group | FullBlockConnections_Attachment_current_user_channels_owner_User;

export interface FullBlockConnections_Attachment_current_user_channels_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface FullBlockConnections_Attachment_current_user_channels {
  __typename: "Channel";
  id: number;
  href: string | null;
  visibility: string;
  title: string;
  owner: FullBlockConnections_Attachment_current_user_channels_owner;
  counts: FullBlockConnections_Attachment_current_user_channels_counts | null;
  label: string;
}

export interface FullBlockConnections_Attachment_public_channels_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface FullBlockConnections_Attachment_public_channels_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type FullBlockConnections_Attachment_public_channels_owner = FullBlockConnections_Attachment_public_channels_owner_Group | FullBlockConnections_Attachment_public_channels_owner_User;

export interface FullBlockConnections_Attachment_public_channels_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface FullBlockConnections_Attachment_public_channels {
  __typename: "Channel";
  id: number;
  href: string | null;
  visibility: string;
  title: string;
  owner: FullBlockConnections_Attachment_public_channels_owner;
  counts: FullBlockConnections_Attachment_public_channels_counts | null;
  label: string;
}

export interface FullBlockConnections_Attachment_private_channels_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface FullBlockConnections_Attachment_private_channels_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type FullBlockConnections_Attachment_private_channels_owner = FullBlockConnections_Attachment_private_channels_owner_Group | FullBlockConnections_Attachment_private_channels_owner_User;

export interface FullBlockConnections_Attachment_private_channels_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface FullBlockConnections_Attachment_private_channels {
  __typename: "Channel";
  id: number;
  href: string | null;
  visibility: string;
  title: string;
  owner: FullBlockConnections_Attachment_private_channels_owner;
  counts: FullBlockConnections_Attachment_private_channels_counts | null;
  label: string;
}

export interface FullBlockConnections_Attachment_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface FullBlockConnections_Attachment {
  __typename: "Attachment" | "Embed" | "Image" | "Link" | "PendingBlock" | "Text";
  id: number;
  counts: FullBlockConnections_Attachment_counts | null;
  current_user_channels: FullBlockConnections_Attachment_current_user_channels[] | null;
  public_channels: FullBlockConnections_Attachment_public_channels[] | null;
  private_channels: FullBlockConnections_Attachment_private_channels[] | null;
  source: FullBlockConnections_Attachment_source | null;
}

export type FullBlockConnections = FullBlockConnections_Channel | FullBlockConnections_Attachment;
