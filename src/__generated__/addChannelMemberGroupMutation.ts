/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MemberTypes } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: addChannelMemberGroupMutation
// ====================================================

export interface addChannelMemberGroupMutation_add_channel_members_channel_counts {
  __typename: "ChannelCounts";
  collaborators: number;
}

export interface addChannelMemberGroupMutation_add_channel_members_channel_collaborators_User {
  __typename: "User";
  id: number;
  name: string;
  href: string;
  initials: string;
  avatar: string | null;
  label: string;
}

export interface addChannelMemberGroupMutation_add_channel_members_channel_collaborators_Group_user {
  __typename: "User";
  id: number;
  name: string;
  href: string;
}

export interface addChannelMemberGroupMutation_add_channel_members_channel_collaborators_Group_users {
  __typename: "User";
  id: number;
  name: string;
  href: string;
}

export interface addChannelMemberGroupMutation_add_channel_members_channel_collaborators_Group_can {
  __typename: "GroupCan";
  manage: boolean;
  manage_users: boolean;
}

export interface addChannelMemberGroupMutation_add_channel_members_channel_collaborators_Group {
  __typename: "Group";
  id: number;
  name: string;
  href: string;
  initials: string;
  avatar: string | null;
  visibility: string;
  user: addChannelMemberGroupMutation_add_channel_members_channel_collaborators_Group_user;
  description: string | null;
  users: addChannelMemberGroupMutation_add_channel_members_channel_collaborators_Group_users[];
  can: addChannelMemberGroupMutation_add_channel_members_channel_collaborators_Group_can;
  label: string;
}

export type addChannelMemberGroupMutation_add_channel_members_channel_collaborators = addChannelMemberGroupMutation_add_channel_members_channel_collaborators_User | addChannelMemberGroupMutation_add_channel_members_channel_collaborators_Group;

export interface addChannelMemberGroupMutation_add_channel_members_channel_memberships_member_User {
  __typename: "User";
  id: number;
  name: string;
  href: string;
  initials: string;
  avatar: string | null;
}

export interface addChannelMemberGroupMutation_add_channel_members_channel_memberships_member_Group_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface addChannelMemberGroupMutation_add_channel_members_channel_memberships_member_Group {
  __typename: "Group";
  id: number;
  name: string;
  href: string;
  initials: string;
  avatar: string | null;
  visibility: string;
  user: addChannelMemberGroupMutation_add_channel_members_channel_memberships_member_Group_user;
}

export type addChannelMemberGroupMutation_add_channel_members_channel_memberships_member = addChannelMemberGroupMutation_add_channel_members_channel_memberships_member_User | addChannelMemberGroupMutation_add_channel_members_channel_memberships_member_Group;

export interface addChannelMemberGroupMutation_add_channel_members_channel_memberships_can {
  __typename: "ChannelMembershipCan";
  manage: boolean;
}

export interface addChannelMemberGroupMutation_add_channel_members_channel_memberships {
  __typename: "ChannelMembership";
  id: number;
  member: addChannelMemberGroupMutation_add_channel_members_channel_memberships_member | null;
  can: addChannelMemberGroupMutation_add_channel_members_channel_memberships_can;
}

export interface addChannelMemberGroupMutation_add_channel_members_channel_can {
  __typename: "ChannelCan";
  manage_collaborators: boolean;
}

export interface addChannelMemberGroupMutation_add_channel_members_channel {
  __typename: "Channel";
  id: number;
  counts: addChannelMemberGroupMutation_add_channel_members_channel_counts;
  collaborators: addChannelMemberGroupMutation_add_channel_members_channel_collaborators[];
  memberships: addChannelMemberGroupMutation_add_channel_members_channel_memberships[];
  can: addChannelMemberGroupMutation_add_channel_members_channel_can;
}

export interface addChannelMemberGroupMutation_add_channel_members {
  __typename: "AddChannelMembersMutationPayload";
  channel: addChannelMemberGroupMutation_add_channel_members_channel;
}

export interface addChannelMemberGroupMutation {
  add_channel_members: addChannelMemberGroupMutation_add_channel_members | null;
}

export interface addChannelMemberGroupMutationVariables {
  channel_id: string;
  member_id: string;
  member_type?: MemberTypes | null;
}
