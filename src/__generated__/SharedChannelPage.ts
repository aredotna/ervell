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
  href: string | null;
  label: string;
}

export interface SharedChannelPage_channel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  href: string | null;
  label: string;
}

export type SharedChannelPage_channel_owner = SharedChannelPage_channel_owner_User | SharedChannelPage_channel_owner_Group;

export interface SharedChannelPage_channel_counts {
  __typename: "ChannelCounts";
  collaborators: number | null;
  followers: number;
  contents: number | null;
}

export interface SharedChannelPage_channel_can {
  __typename: "ChannelCan";
  follow: boolean | null;
  update: boolean | null;
  destroy: boolean | null;
  mute: boolean | null;
  share: boolean | null;
  manage_collaborators: boolean;
  connect: boolean | null;
  add_to: boolean | null;
  reorder_connections: boolean | null;
  add_to_as_premium: boolean | null;
  remove_connections: boolean | null;
}

export interface SharedChannelPage_channel_user {
  __typename: "User";
  id: number;
  href: string | null;
  name: string;
}

export interface SharedChannelPage_channel_collaborators_User {
  __typename: "User";
  id: number;
  name: string;
  href: string | null;
  label: string;
}

export interface SharedChannelPage_channel_collaborators_Group_user {
  __typename: "User";
  id: number;
  name: string;
  href: string | null;
}

export interface SharedChannelPage_channel_collaborators_Group_users {
  __typename: "User";
  id: number;
  name: string;
  href: string | null;
}

export interface SharedChannelPage_channel_collaborators_Group_can {
  __typename: "GroupCan";
  manage: boolean | null;
  manage_users: boolean | null;
}

export interface SharedChannelPage_channel_collaborators_Group {
  __typename: "Group";
  id: number;
  name: string;
  href: string | null;
  description: string | null;
  user: SharedChannelPage_channel_collaborators_Group_user;
  users: SharedChannelPage_channel_collaborators_Group_users[] | null;
  can: SharedChannelPage_channel_collaborators_Group_can | null;
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
  href: string | null;
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
  href: string | null;
  visibility: string;
  owner: SharedChannelPage_channel_owner;
  counts: SharedChannelPage_channel_counts | null;
  label: string;
  can: SharedChannelPage_channel_can | null;
  is_muted: boolean | null;
  info: string | null;
  user: SharedChannelPage_channel_user | null;
  collaborators: SharedChannelPage_channel_collaborators[] | null;
  connected_to_channels: SharedChannelPage_channel_connected_to_channels[] | null;
  share: SharedChannelPage_channel_share | null;
  meta_title: string;
  meta_description: string | null;
  canonical: string | null;
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
