/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ChannelMetadata
// ====================================================

export interface ChannelMetadata_owner_User {
  __typename: "User";
  id: number;
  name: string;
  href: string;
  label: string;
}

export interface ChannelMetadata_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  href: string;
  label: string;
}

export type ChannelMetadata_owner = ChannelMetadata_owner_User | ChannelMetadata_owner_Group;

export interface ChannelMetadata_counts {
  __typename: "ChannelCounts";
  collaborators: number;
  followers: number;
}

export interface ChannelMetadata_can {
  __typename: "ChannelCan";
  follow: boolean;
  update: boolean;
  destroy: boolean;
  mute: boolean;
  share: boolean;
  manage_collaborators: boolean;
  connect: boolean;
}

export interface ChannelMetadata_user {
  __typename: "User";
  id: number;
  href: string;
  name: string;
}

export interface ChannelMetadata_collaborators_User {
  __typename: "User";
  id: number;
  name: string;
  href: string;
  label: string;
}

export interface ChannelMetadata_collaborators_Group_user {
  __typename: "User";
  id: number;
  name: string;
  href: string;
}

export interface ChannelMetadata_collaborators_Group_users {
  __typename: "User";
  id: number;
  name: string;
  href: string;
}

export interface ChannelMetadata_collaborators_Group_can {
  __typename: "GroupCan";
  manage: boolean;
  manage_users: boolean;
}

export interface ChannelMetadata_collaborators_Group {
  __typename: "Group";
  id: number;
  name: string;
  href: string;
  description: string | null;
  user: ChannelMetadata_collaborators_Group_user;
  users: ChannelMetadata_collaborators_Group_users[] | null;
  can: ChannelMetadata_collaborators_Group_can;
  visibility: string;
  label: string;
}

export type ChannelMetadata_collaborators = ChannelMetadata_collaborators_User | ChannelMetadata_collaborators_Group;

export interface ChannelMetadata_connected_to_channels_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelMetadata_connected_to_channels_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
}

export type ChannelMetadata_connected_to_channels_owner = ChannelMetadata_connected_to_channels_owner_User | ChannelMetadata_connected_to_channels_owner_Group;

export interface ChannelMetadata_connected_to_channels {
  __typename: "Channel";
  id: number;
  label: string;
  href: string;
  owner: ChannelMetadata_connected_to_channels_owner;
}

export interface ChannelMetadata_share {
  __typename: "ChannelShare";
  url: string | null;
  twitter_url: string | null;
  facebook_url: string | null;
}

export interface ChannelMetadata {
  __typename: "Channel";
  id: number;
  title: string;
  truncatedTitle: string;
  href: string;
  visibility: string;
  owner: ChannelMetadata_owner;
  counts: ChannelMetadata_counts;
  label: string;
  can: ChannelMetadata_can;
  is_muted: boolean;
  info: string | null;
  user: ChannelMetadata_user | null;
  collaborators: ChannelMetadata_collaborators[];
  connected_to_channels: ChannelMetadata_connected_to_channels[];
  share: ChannelMetadata_share | null;
  slug: string;
}
