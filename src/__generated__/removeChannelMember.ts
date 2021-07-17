/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MemberTypes } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: removeChannelMember
// ====================================================

export interface removeChannelMember_remove_channel_members_channel_counts {
  __typename: "ChannelCounts";
  collaborators: number | null;
}

export interface removeChannelMember_remove_channel_members_channel_collaborators_User {
  __typename: "User";
  id: number;
  name: string;
  href: string | null;
  initials: string;
  avatar: string | null;
  label: string;
}

export interface removeChannelMember_remove_channel_members_channel_collaborators_Group_user {
  __typename: "User";
  id: number;
  name: string;
  href: string | null;
}

export interface removeChannelMember_remove_channel_members_channel_collaborators_Group_users {
  __typename: "User";
  id: number;
  name: string;
  href: string | null;
}

export interface removeChannelMember_remove_channel_members_channel_collaborators_Group_can {
  __typename: "GroupCan";
  manage: boolean | null;
  manage_users: boolean | null;
}

export interface removeChannelMember_remove_channel_members_channel_collaborators_Group {
  __typename: "Group";
  id: number;
  name: string;
  href: string | null;
  initials: string;
  avatar: string | null;
  visibility: string;
  user: removeChannelMember_remove_channel_members_channel_collaborators_Group_user;
  description: string | null;
  users: removeChannelMember_remove_channel_members_channel_collaborators_Group_users[] | null;
  can: removeChannelMember_remove_channel_members_channel_collaborators_Group_can | null;
  label: string;
}

export type removeChannelMember_remove_channel_members_channel_collaborators = removeChannelMember_remove_channel_members_channel_collaborators_User | removeChannelMember_remove_channel_members_channel_collaborators_Group;

export interface removeChannelMember_remove_channel_members_channel_memberships_member_User {
  __typename: "User";
  id: number;
  name: string;
  href: string | null;
  initials: string;
  avatar: string | null;
}

export interface removeChannelMember_remove_channel_members_channel_memberships_member_Group_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface removeChannelMember_remove_channel_members_channel_memberships_member_Group {
  __typename: "Group";
  id: number;
  name: string;
  href: string | null;
  initials: string;
  avatar: string | null;
  visibility: string;
  user: removeChannelMember_remove_channel_members_channel_memberships_member_Group_user;
}

export type removeChannelMember_remove_channel_members_channel_memberships_member = removeChannelMember_remove_channel_members_channel_memberships_member_User | removeChannelMember_remove_channel_members_channel_memberships_member_Group;

export interface removeChannelMember_remove_channel_members_channel_memberships_can {
  __typename: "ChannelMembershipCan";
  manage: boolean | null;
}

export interface removeChannelMember_remove_channel_members_channel_memberships {
  __typename: "ChannelMembership";
  id: number;
  member: removeChannelMember_remove_channel_members_channel_memberships_member | null;
  can: removeChannelMember_remove_channel_members_channel_memberships_can | null;
}

export interface removeChannelMember_remove_channel_members_channel_can {
  __typename: "ChannelCan";
  manage_collaborators: boolean;
}

export interface removeChannelMember_remove_channel_members_channel {
  __typename: "Channel";
  id: number;
  counts: removeChannelMember_remove_channel_members_channel_counts | null;
  collaborators: removeChannelMember_remove_channel_members_channel_collaborators[] | null;
  memberships: removeChannelMember_remove_channel_members_channel_memberships[] | null;
  can: removeChannelMember_remove_channel_members_channel_can | null;
}

export interface removeChannelMember_remove_channel_members {
  __typename: "RemoveChannelMembersMutationPayload";
  channel: removeChannelMember_remove_channel_members_channel;
}

export interface removeChannelMember {
  remove_channel_members: removeChannelMember_remove_channel_members | null;
}

export interface removeChannelMemberVariables {
  member_id: string;
  member_type?: MemberTypes | null;
  channel_id: string;
}
