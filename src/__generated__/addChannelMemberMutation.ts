/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MemberTypes } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: addChannelMemberMutation
// ====================================================

export interface addChannelMemberMutation_add_channel_members_channel_counts {
  __typename: "ChannelCounts";
  collaborators: number;
}

export interface addChannelMemberMutation_add_channel_members_channel_collaborators_User {
  __typename: "User";
  id: number;
  name: string;
  href: string;
  initials: string;
  avatar: string | null;
  label: string;
}

export interface addChannelMemberMutation_add_channel_members_channel_collaborators_Group_user {
  __typename: "User";
  id: number;
  name: string;
  href: string;
}

export interface addChannelMemberMutation_add_channel_members_channel_collaborators_Group_users {
  __typename: "User";
  id: number;
  name: string;
  href: string;
}

export interface addChannelMemberMutation_add_channel_members_channel_collaborators_Group_can {
  __typename: "GroupCan";
  manage: boolean;
  manage_users: boolean;
}

export interface addChannelMemberMutation_add_channel_members_channel_collaborators_Group {
  __typename: "Group";
  id: number;
  name: string;
  href: string;
  initials: string;
  avatar: string | null;
  visibility: string;
  user: addChannelMemberMutation_add_channel_members_channel_collaborators_Group_user;
  description: string | null;
  users: addChannelMemberMutation_add_channel_members_channel_collaborators_Group_users[];
  can: addChannelMemberMutation_add_channel_members_channel_collaborators_Group_can;
  label: string;
}

export type addChannelMemberMutation_add_channel_members_channel_collaborators = addChannelMemberMutation_add_channel_members_channel_collaborators_User | addChannelMemberMutation_add_channel_members_channel_collaborators_Group;

export interface addChannelMemberMutation_add_channel_members_channel_memberships_member_User {
  __typename: "User";
  id: number;
  name: string;
  href: string;
  initials: string;
  avatar: string | null;
}

export interface addChannelMemberMutation_add_channel_members_channel_memberships_member_Group_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface addChannelMemberMutation_add_channel_members_channel_memberships_member_Group {
  __typename: "Group";
  id: number;
  name: string;
  href: string;
  initials: string;
  avatar: string | null;
  visibility: string;
  user: addChannelMemberMutation_add_channel_members_channel_memberships_member_Group_user;
}

export type addChannelMemberMutation_add_channel_members_channel_memberships_member = addChannelMemberMutation_add_channel_members_channel_memberships_member_User | addChannelMemberMutation_add_channel_members_channel_memberships_member_Group;

export interface addChannelMemberMutation_add_channel_members_channel_memberships_can {
  __typename: "ChannelMembershipCan";
  manage: boolean;
}

export interface addChannelMemberMutation_add_channel_members_channel_memberships {
  __typename: "ChannelMembership";
  id: number;
  member: addChannelMemberMutation_add_channel_members_channel_memberships_member | null;
  can: addChannelMemberMutation_add_channel_members_channel_memberships_can;
}

export interface addChannelMemberMutation_add_channel_members_channel_can {
  __typename: "ChannelCan";
  manage_collaborators: boolean;
}

export interface addChannelMemberMutation_add_channel_members_channel {
  __typename: "Channel";
  id: number;
  counts: addChannelMemberMutation_add_channel_members_channel_counts;
  collaborators: addChannelMemberMutation_add_channel_members_channel_collaborators[];
  memberships: addChannelMemberMutation_add_channel_members_channel_memberships[];
  can: addChannelMemberMutation_add_channel_members_channel_can;
}

export interface addChannelMemberMutation_add_channel_members {
  __typename: "AddChannelMembersMutationPayload";
  channel: addChannelMemberMutation_add_channel_members_channel;
}

export interface addChannelMemberMutation {
  add_channel_members: addChannelMemberMutation_add_channel_members | null;
}

export interface addChannelMemberMutationVariables {
  channel_id: string;
  member_id: string;
  member_type?: MemberTypes | null;
}
