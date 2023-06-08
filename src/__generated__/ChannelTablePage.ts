/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ChannelTablePage
// ====================================================

export interface ChannelTablePage_channel_owner_User {
  __typename: "User";
  id: number;
  name: string;
  href: string;
  label: string;
  is_indexable: boolean;
}

export interface ChannelTablePage_channel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  href: string;
  label: string;
}

export type ChannelTablePage_channel_owner = ChannelTablePage_channel_owner_User | ChannelTablePage_channel_owner_Group;

export interface ChannelTablePage_channel_counts {
  __typename: "ChannelCounts";
  collaborators: number;
  followers: number;
  contents: number;
}

export interface ChannelTablePage_channel_can {
  __typename: "ChannelCan";
  follow: boolean;
  update: boolean;
  destroy: boolean;
  mute: boolean;
  share: boolean;
  manage_collaborators: boolean;
  connect: boolean;
  add_to: boolean;
  add_to_as_premium: boolean;
}

export interface ChannelTablePage_channel_user {
  __typename: "User";
  id: number;
  href: string;
  name: string;
}

export interface ChannelTablePage_channel_collaborators_User {
  __typename: "User";
  id: number;
  name: string;
  href: string;
  label: string;
}

export interface ChannelTablePage_channel_collaborators_Group_user {
  __typename: "User";
  id: number;
  name: string;
  href: string;
}

export interface ChannelTablePage_channel_collaborators_Group_users {
  __typename: "User";
  id: number;
  name: string;
  href: string;
}

export interface ChannelTablePage_channel_collaborators_Group_can {
  __typename: "GroupCan";
  manage: boolean;
  manage_users: boolean;
}

export interface ChannelTablePage_channel_collaborators_Group {
  __typename: "Group";
  id: number;
  name: string;
  href: string;
  description: string | null;
  user: ChannelTablePage_channel_collaborators_Group_user;
  users: ChannelTablePage_channel_collaborators_Group_users[];
  can: ChannelTablePage_channel_collaborators_Group_can;
  visibility: string;
  label: string;
}

export type ChannelTablePage_channel_collaborators = ChannelTablePage_channel_collaborators_User | ChannelTablePage_channel_collaborators_Group;

export interface ChannelTablePage_channel_connected_to_channels_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelTablePage_channel_connected_to_channels_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
}

export type ChannelTablePage_channel_connected_to_channels_owner = ChannelTablePage_channel_connected_to_channels_owner_User | ChannelTablePage_channel_connected_to_channels_owner_Group;

export interface ChannelTablePage_channel_connected_to_channels {
  __typename: "Channel";
  id: number;
  label: string;
  href: string;
  owner: ChannelTablePage_channel_connected_to_channels_owner;
}

export interface ChannelTablePage_channel_share {
  __typename: "ChannelShare";
  url: string | null;
  twitter_url: string | null;
  facebook_url: string | null;
}

export interface ChannelTablePage_channel {
  __typename: "Channel";
  id: number;
  title: string;
  truncatedTitle: string;
  href: string;
  visibility: string;
  owner: ChannelTablePage_channel_owner;
  counts: ChannelTablePage_channel_counts;
  label: string;
  can: ChannelTablePage_channel_can;
  is_muted: boolean;
  info: string | null;
  user: ChannelTablePage_channel_user | null;
  collaborators: ChannelTablePage_channel_collaborators[];
  connected_to_channels: ChannelTablePage_channel_connected_to_channels[];
  share: ChannelTablePage_channel_share | null;
  slug: string;
  meta_title: string;
  meta_description: string | null;
  canonical: string;
  is_nsfw: boolean;
  image_url: string | null;
}

export interface ChannelTablePage {
  /**
   * A single channel
   */
  channel: ChannelTablePage_channel | null;
}

export interface ChannelTablePageVariables {
  id: string;
}
