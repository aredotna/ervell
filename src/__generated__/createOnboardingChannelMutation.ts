/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ChannelVisibility } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createOnboardingChannelMutation
// ====================================================

export interface createOnboardingChannelMutation_create_channel_channel_owner_User {
  __typename: "User";
  id: number;
  name: string;
  href: string | null;
  label: string;
}

export interface createOnboardingChannelMutation_create_channel_channel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  href: string | null;
  label: string;
}

export type createOnboardingChannelMutation_create_channel_channel_owner = createOnboardingChannelMutation_create_channel_channel_owner_User | createOnboardingChannelMutation_create_channel_channel_owner_Group;

export interface createOnboardingChannelMutation_create_channel_channel_counts {
  __typename: "ChannelCounts";
  collaborators: number | null;
  followers: number;
}

export interface createOnboardingChannelMutation_create_channel_channel_can {
  __typename: "ChannelCan";
  follow: boolean | null;
  update: boolean | null;
  destroy: boolean | null;
  mute: boolean | null;
  share: boolean | null;
  manage_collaborators: boolean;
  connect: boolean | null;
}

export interface createOnboardingChannelMutation_create_channel_channel_user {
  __typename: "User";
  id: number;
  href: string | null;
  name: string;
}

export interface createOnboardingChannelMutation_create_channel_channel_collaborators_User {
  __typename: "User";
  id: number;
  name: string;
  href: string | null;
  label: string;
}

export interface createOnboardingChannelMutation_create_channel_channel_collaborators_Group_user {
  __typename: "User";
  id: number;
  name: string;
  href: string | null;
}

export interface createOnboardingChannelMutation_create_channel_channel_collaborators_Group_users {
  __typename: "User";
  id: number;
  name: string;
  href: string | null;
}

export interface createOnboardingChannelMutation_create_channel_channel_collaborators_Group_can {
  __typename: "GroupCan";
  manage: boolean | null;
  manage_users: boolean | null;
}

export interface createOnboardingChannelMutation_create_channel_channel_collaborators_Group {
  __typename: "Group";
  id: number;
  name: string;
  href: string | null;
  description: string | null;
  user: createOnboardingChannelMutation_create_channel_channel_collaborators_Group_user;
  users: createOnboardingChannelMutation_create_channel_channel_collaborators_Group_users[] | null;
  can: createOnboardingChannelMutation_create_channel_channel_collaborators_Group_can | null;
  visibility: string;
  label: string;
}

export type createOnboardingChannelMutation_create_channel_channel_collaborators = createOnboardingChannelMutation_create_channel_channel_collaborators_User | createOnboardingChannelMutation_create_channel_channel_collaborators_Group;

export interface createOnboardingChannelMutation_create_channel_channel_connected_to_channels_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export interface createOnboardingChannelMutation_create_channel_channel_connected_to_channels_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
}

export type createOnboardingChannelMutation_create_channel_channel_connected_to_channels_owner = createOnboardingChannelMutation_create_channel_channel_connected_to_channels_owner_User | createOnboardingChannelMutation_create_channel_channel_connected_to_channels_owner_Group;

export interface createOnboardingChannelMutation_create_channel_channel_connected_to_channels {
  __typename: "Channel";
  id: number;
  label: string;
  href: string | null;
  owner: createOnboardingChannelMutation_create_channel_channel_connected_to_channels_owner;
}

export interface createOnboardingChannelMutation_create_channel_channel_share {
  __typename: "ChannelShare";
  url: string | null;
  twitter_url: string | null;
  facebook_url: string | null;
}

export interface createOnboardingChannelMutation_create_channel_channel {
  __typename: "Channel";
  id: number;
  title: string;
  truncatedTitle: string;
  href: string | null;
  visibility: string;
  owner: createOnboardingChannelMutation_create_channel_channel_owner;
  counts: createOnboardingChannelMutation_create_channel_channel_counts | null;
  label: string;
  can: createOnboardingChannelMutation_create_channel_channel_can | null;
  is_muted: boolean | null;
  info: string | null;
  user: createOnboardingChannelMutation_create_channel_channel_user | null;
  collaborators: createOnboardingChannelMutation_create_channel_channel_collaborators[] | null;
  connected_to_channels: createOnboardingChannelMutation_create_channel_channel_connected_to_channels[] | null;
  share: createOnboardingChannelMutation_create_channel_channel_share | null;
}

export interface createOnboardingChannelMutation_create_channel {
  __typename: "CreateChannelPayload";
  channel: createOnboardingChannelMutation_create_channel_channel;
}

export interface createOnboardingChannelMutation {
  create_channel: createOnboardingChannelMutation_create_channel | null;
}

export interface createOnboardingChannelMutationVariables {
  title: string;
  visibility?: ChannelVisibility | null;
}
