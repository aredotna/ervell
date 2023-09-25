/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SharedChannelPage
// ====================================================

export interface SharedChannelPage_channel_owner_User {
  __typename: "User";
  id: number;
  name: string;
  href: string;
  label: string;
  is_indexable: boolean;
}

export interface SharedChannelPage_channel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  href: string;
  label: string;
}

export type SharedChannelPage_channel_owner = SharedChannelPage_channel_owner_User | SharedChannelPage_channel_owner_Group;

export interface SharedChannelPage_channel_counts {
  __typename: "ChannelCounts";
  collaborators: number;
  followers: number;
  contents: number;
}

export interface SharedChannelPage_channel_can {
  __typename: "ChannelCan";
  follow: boolean;
  update: boolean;
  destroy: boolean;
  mute: boolean;
  share: boolean;
  manage_collaborators: boolean;
  connect: boolean;
  add_to: boolean;
  reorder_connections: boolean;
  add_to_as_premium: boolean;
}

export interface SharedChannelPage_channel_user {
  __typename: "User";
  id: number;
  href: string;
  name: string;
}

export interface SharedChannelPage_channel_collaborators_User {
  __typename: "User";
  id: number;
  name: string;
  href: string;
  label: string;
}

export interface SharedChannelPage_channel_collaborators_Group_user {
  __typename: "User";
  id: number;
  name: string;
  href: string;
}

export interface SharedChannelPage_channel_collaborators_Group_users {
  __typename: "User";
  id: number;
  name: string;
  href: string;
}

export interface SharedChannelPage_channel_collaborators_Group_can {
  __typename: "GroupCan";
  manage: boolean;
  manage_users: boolean;
}

export interface SharedChannelPage_channel_collaborators_Group {
  __typename: "Group";
  id: number;
  name: string;
  href: string;
  description: string | null;
  user: SharedChannelPage_channel_collaborators_Group_user;
  users: SharedChannelPage_channel_collaborators_Group_users[];
  can: SharedChannelPage_channel_collaborators_Group_can;
  visibility: string;
  label: string;
}

export type SharedChannelPage_channel_collaborators = SharedChannelPage_channel_collaborators_User | SharedChannelPage_channel_collaborators_Group;

export interface SharedChannelPage_channel_connected_to_channels_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export interface SharedChannelPage_channel_connected_to_channels_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
}

export type SharedChannelPage_channel_connected_to_channels_owner = SharedChannelPage_channel_connected_to_channels_owner_User | SharedChannelPage_channel_connected_to_channels_owner_Group;

export interface SharedChannelPage_channel_connected_to_channels {
  __typename: "Channel";
  id: number;
  label: string;
  href: string;
  owner: SharedChannelPage_channel_connected_to_channels_owner;
}

export interface SharedChannelPage_channel_share {
  __typename: "ChannelShare";
  url: string | null;
  twitter_url: string | null;
  facebook_url: string | null;
}

export interface SharedChannelPage_channel {
  __typename: "Channel";
  id: number;
  title: string;
  truncatedTitle: string;
  href: string;
  visibility: string;
  owner: SharedChannelPage_channel_owner;
  counts: SharedChannelPage_channel_counts;
  label: string;
  can: SharedChannelPage_channel_can;
  is_muted: boolean;
  info: string | null;
  user: SharedChannelPage_channel_user;
  collaborators: SharedChannelPage_channel_collaborators[];
  connected_to_channels: SharedChannelPage_channel_connected_to_channels[];
  share: SharedChannelPage_channel_share | null;
  slug: string;
  meta_title: string;
  meta_description: string | null;
  canonical: string;
  is_nsfw: boolean;
  image_url: string | null;
}

export interface SharedChannelPage {
  /**
   * An otherwise private channel that is accessible via the shared token
   */
  channel: SharedChannelPage_channel | null;
}

export interface SharedChannelPageVariables {
  token: string;
}
