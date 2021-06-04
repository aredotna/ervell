/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BlockLightboxConnections
// ====================================================

export interface BlockLightboxConnections_Channel_current_user_channels_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  visibility: string | null;
}

export interface BlockLightboxConnections_Channel_current_user_channels_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export type BlockLightboxConnections_Channel_current_user_channels_owner = BlockLightboxConnections_Channel_current_user_channels_owner_Group | BlockLightboxConnections_Channel_current_user_channels_owner_User;

export interface BlockLightboxConnections_Channel_current_user_channels_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface BlockLightboxConnections_Channel_current_user_channels {
  __typename: "Channel";
  id: number | null;
  href: string | null;
  visibility: string | null;
  title: string | null;
  owner: BlockLightboxConnections_Channel_current_user_channels_owner | null;
  counts: BlockLightboxConnections_Channel_current_user_channels_counts | null;
  label: string | null;
}

export interface BlockLightboxConnections_Channel_public_channels_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  visibility: string | null;
}

export interface BlockLightboxConnections_Channel_public_channels_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export type BlockLightboxConnections_Channel_public_channels_owner = BlockLightboxConnections_Channel_public_channels_owner_Group | BlockLightboxConnections_Channel_public_channels_owner_User;

export interface BlockLightboxConnections_Channel_public_channels_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface BlockLightboxConnections_Channel_public_channels {
  __typename: "Channel";
  id: number | null;
  href: string | null;
  visibility: string | null;
  title: string | null;
  owner: BlockLightboxConnections_Channel_public_channels_owner | null;
  counts: BlockLightboxConnections_Channel_public_channels_counts | null;
  label: string | null;
}

export interface BlockLightboxConnections_Channel_private_channels_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  visibility: string | null;
}

export interface BlockLightboxConnections_Channel_private_channels_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export type BlockLightboxConnections_Channel_private_channels_owner = BlockLightboxConnections_Channel_private_channels_owner_Group | BlockLightboxConnections_Channel_private_channels_owner_User;

export interface BlockLightboxConnections_Channel_private_channels_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface BlockLightboxConnections_Channel_private_channels {
  __typename: "Channel";
  id: number | null;
  href: string | null;
  visibility: string | null;
  title: string | null;
  owner: BlockLightboxConnections_Channel_private_channels_owner | null;
  counts: BlockLightboxConnections_Channel_private_channels_counts | null;
  label: string | null;
}

export interface BlockLightboxConnections_Channel_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface BlockLightboxConnections_Channel {
  __typename: "Channel";
  id: number | null;
  current_user_channels: (BlockLightboxConnections_Channel_current_user_channels | null)[] | null;
  public_channels: (BlockLightboxConnections_Channel_public_channels | null)[] | null;
  private_channels: (BlockLightboxConnections_Channel_private_channels | null)[] | null;
  source: BlockLightboxConnections_Channel_source | null;
}

export interface BlockLightboxConnections_Text_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
  current_user_channels: number | null;
  private_channels: number | null;
  channels_with_same_source: number | null;
}

export interface BlockLightboxConnections_Text_current_user_channels_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  visibility: string | null;
}

export interface BlockLightboxConnections_Text_current_user_channels_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export type BlockLightboxConnections_Text_current_user_channels_owner = BlockLightboxConnections_Text_current_user_channels_owner_Group | BlockLightboxConnections_Text_current_user_channels_owner_User;

export interface BlockLightboxConnections_Text_current_user_channels_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface BlockLightboxConnections_Text_current_user_channels {
  __typename: "Channel";
  id: number | null;
  href: string | null;
  visibility: string | null;
  title: string | null;
  owner: BlockLightboxConnections_Text_current_user_channels_owner | null;
  counts: BlockLightboxConnections_Text_current_user_channels_counts | null;
  label: string | null;
}

export interface BlockLightboxConnections_Text_public_channels_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  visibility: string | null;
}

export interface BlockLightboxConnections_Text_public_channels_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export type BlockLightboxConnections_Text_public_channels_owner = BlockLightboxConnections_Text_public_channels_owner_Group | BlockLightboxConnections_Text_public_channels_owner_User;

export interface BlockLightboxConnections_Text_public_channels_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface BlockLightboxConnections_Text_public_channels {
  __typename: "Channel";
  id: number | null;
  href: string | null;
  visibility: string | null;
  title: string | null;
  owner: BlockLightboxConnections_Text_public_channels_owner | null;
  counts: BlockLightboxConnections_Text_public_channels_counts | null;
  label: string | null;
}

export interface BlockLightboxConnections_Text_private_channels_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  visibility: string | null;
}

export interface BlockLightboxConnections_Text_private_channels_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export type BlockLightboxConnections_Text_private_channels_owner = BlockLightboxConnections_Text_private_channels_owner_Group | BlockLightboxConnections_Text_private_channels_owner_User;

export interface BlockLightboxConnections_Text_private_channels_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface BlockLightboxConnections_Text_private_channels {
  __typename: "Channel";
  id: number | null;
  href: string | null;
  visibility: string | null;
  title: string | null;
  owner: BlockLightboxConnections_Text_private_channels_owner | null;
  counts: BlockLightboxConnections_Text_private_channels_counts | null;
  label: string | null;
}

export interface BlockLightboxConnections_Text_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface BlockLightboxConnections_Text_channels_with_same_source_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  visibility: string | null;
}

export interface BlockLightboxConnections_Text_channels_with_same_source_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export type BlockLightboxConnections_Text_channels_with_same_source_owner = BlockLightboxConnections_Text_channels_with_same_source_owner_Group | BlockLightboxConnections_Text_channels_with_same_source_owner_User;

export interface BlockLightboxConnections_Text_channels_with_same_source_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface BlockLightboxConnections_Text_channels_with_same_source {
  __typename: "Channel";
  id: number | null;
  href: string | null;
  visibility: string | null;
  title: string | null;
  owner: BlockLightboxConnections_Text_channels_with_same_source_owner | null;
  counts: BlockLightboxConnections_Text_channels_with_same_source_counts | null;
  label: string | null;
}

export interface BlockLightboxConnections_Text {
  __typename: "Text" | "Image" | "Link" | "Embed" | "Attachment" | "PendingBlock";
  id: number | null;
  counts: BlockLightboxConnections_Text_counts | null;
  current_user_channels: (BlockLightboxConnections_Text_current_user_channels | null)[] | null;
  public_channels: (BlockLightboxConnections_Text_public_channels | null)[] | null;
  private_channels: (BlockLightboxConnections_Text_private_channels | null)[] | null;
  source: BlockLightboxConnections_Text_source | null;
  channels_with_same_source: (BlockLightboxConnections_Text_channels_with_same_source | null)[] | null;
}

export type BlockLightboxConnections = BlockLightboxConnections_Channel | BlockLightboxConnections_Text;
