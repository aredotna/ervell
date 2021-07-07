/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ManageCollaboratorsQuery
// ====================================================

export interface ManageCollaboratorsQuery_channel_counts {
  __typename: "ChannelCounts";
  collaborators: number | null;
}

export interface ManageCollaboratorsQuery_channel_collaborators_User {
  __typename: "User";
  id: number;
  name: string;
  href: string | null;
  initials: string;
  avatar: string | null;
  label: string;
}

export interface ManageCollaboratorsQuery_channel_collaborators_Group_user {
  __typename: "User";
  id: number;
  name: string;
  href: string | null;
}

export interface ManageCollaboratorsQuery_channel_collaborators_Group_users {
  __typename: "User";
  id: number;
  name: string;
  href: string | null;
}

export interface ManageCollaboratorsQuery_channel_collaborators_Group_can {
  __typename: "GroupCan";
  manage: boolean | null;
  manage_users: boolean | null;
}

export interface ManageCollaboratorsQuery_channel_collaborators_Group {
  __typename: "Group";
  id: number;
  name: string;
  href: string | null;
  initials: string;
  avatar: string | null;
  visibility: string;
  user: ManageCollaboratorsQuery_channel_collaborators_Group_user;
  description: string | null;
  users: ManageCollaboratorsQuery_channel_collaborators_Group_users[] | null;
  can: ManageCollaboratorsQuery_channel_collaborators_Group_can | null;
  label: string;
}

export type ManageCollaboratorsQuery_channel_collaborators = ManageCollaboratorsQuery_channel_collaborators_User | ManageCollaboratorsQuery_channel_collaborators_Group;

export interface ManageCollaboratorsQuery_channel_memberships_member_User {
  __typename: "User";
  id: number;
  name: string;
  href: string | null;
  initials: string;
  avatar: string | null;
}

export interface ManageCollaboratorsQuery_channel_memberships_member_Group_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ManageCollaboratorsQuery_channel_memberships_member_Group {
  __typename: "Group";
  id: number;
  name: string;
  href: string | null;
  initials: string;
  avatar: string | null;
  visibility: string;
  user: ManageCollaboratorsQuery_channel_memberships_member_Group_user;
}

export type ManageCollaboratorsQuery_channel_memberships_member = ManageCollaboratorsQuery_channel_memberships_member_User | ManageCollaboratorsQuery_channel_memberships_member_Group;

export interface ManageCollaboratorsQuery_channel_memberships_can {
  __typename: "ChannelMembershipCan";
  manage: boolean | null;
}

export interface ManageCollaboratorsQuery_channel_memberships {
  __typename: "ChannelMembership";
  id: number;
  member: ManageCollaboratorsQuery_channel_memberships_member | null;
  can: ManageCollaboratorsQuery_channel_memberships_can | null;
}

export interface ManageCollaboratorsQuery_channel_can {
  __typename: "ChannelCan";
  manage_collaborators: boolean;
}

export interface ManageCollaboratorsQuery_channel {
  __typename: "Channel";
  id: number;
  counts: ManageCollaboratorsQuery_channel_counts | null;
  collaborators: ManageCollaboratorsQuery_channel_collaborators[] | null;
  memberships: ManageCollaboratorsQuery_channel_memberships[] | null;
  can: ManageCollaboratorsQuery_channel_can | null;
}

export interface ManageCollaboratorsQuery {
  /**
   * A single channel
   */
  channel: ManageCollaboratorsQuery_channel | null;
}

export interface ManageCollaboratorsQueryVariables {
  channel_id: string;
}
