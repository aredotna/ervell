/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ChannelMetadata
// ====================================================

export interface ChannelMetadata_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
  label: string | null;
}

export interface ChannelMetadata_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  href: string | null;
  label: string | null;
}

export type ChannelMetadata_owner = ChannelMetadata_owner_User | ChannelMetadata_owner_Group;

export interface ChannelMetadata_counts {
  __typename: "ChannelCounts";
  collaborators: number | null;
  followers: number | null;
}

export interface ChannelMetadata_can {
  __typename: "ChannelCan";
  follow: boolean | null;
  update: boolean | null;
  destroy: boolean | null;
  mute: boolean | null;
  share: boolean | null;
  manage_collaborators: boolean | null;
  connect: boolean | null;
}

export interface ChannelMetadata_user {
  __typename: "User";
  id: number | null;
  href: string | null;
  name: string | null;
}

export interface ChannelMetadata_collaborators_User {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
  label: string | null;
}

export interface ChannelMetadata_collaborators_Group_user {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
}

export interface ChannelMetadata_collaborators_Group_users {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
}

export interface ChannelMetadata_collaborators_Group_can {
  __typename: "GroupCan";
  manage: boolean | null;
  manage_users: boolean | null;
}

export interface ChannelMetadata_collaborators_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  href: string | null;
  description: string | null;
  user: ChannelMetadata_collaborators_Group_user | null;
  users: (ChannelMetadata_collaborators_Group_users | null)[] | null;
  can: ChannelMetadata_collaborators_Group_can | null;
  visibility: string | null;
  label: string | null;
}

export type ChannelMetadata_collaborators = ChannelMetadata_collaborators_User | ChannelMetadata_collaborators_Group;

export interface ChannelMetadata_connected_to_channels_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ChannelMetadata_connected_to_channels_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
}

export type ChannelMetadata_connected_to_channels_owner = ChannelMetadata_connected_to_channels_owner_User | ChannelMetadata_connected_to_channels_owner_Group;

export interface ChannelMetadata_connected_to_channels {
  __typename: "Channel";
  id: number | null;
  label: string | null;
  href: string | null;
  owner: ChannelMetadata_connected_to_channels_owner | null;
}

export interface ChannelMetadata_share {
  __typename: "ChannelShare";
  url: string | null;
  twitter_url: string | null;
  facebook_url: string | null;
}

export interface ChannelMetadata {
  __typename: "Channel";
  id: number | null;
  title: string | null;
  truncatedTitle: string | null;
  href: string | null;
  visibility: string | null;
  owner: ChannelMetadata_owner | null;
  counts: ChannelMetadata_counts | null;
  label: string | null;
  can: ChannelMetadata_can | null;
  is_muted: boolean | null;
  info: string | null;
  user: ChannelMetadata_user | null;
  collaborators: (ChannelMetadata_collaborators | null)[] | null;
  connected_to_channels: (ChannelMetadata_connected_to_channels | null)[] | null;
  share: ChannelMetadata_share | null;
}
