/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ManageCollaborators
// ====================================================

export interface ManageCollaborators_counts {
  __typename: "ChannelCounts";
  collaborators: number | null;
}

export interface ManageCollaborators_collaborators_User {
  __typename: "User";
  id: number;
  name: string;
  href: string | null;
  initials: string;
  avatar: string | null;
  label: string;
}

export interface ManageCollaborators_collaborators_Group_user {
  __typename: "User";
  id: number;
  name: string;
  href: string | null;
}

export interface ManageCollaborators_collaborators_Group_users {
  __typename: "User";
  id: number;
  name: string;
  href: string | null;
}

export interface ManageCollaborators_collaborators_Group_can {
  __typename: "GroupCan";
  manage: boolean | null;
  manage_users: boolean | null;
}

export interface ManageCollaborators_collaborators_Group {
  __typename: "Group";
  id: number;
  name: string;
  href: string | null;
  initials: string;
  avatar: string | null;
  visibility: string;
  user: ManageCollaborators_collaborators_Group_user;
  description: string | null;
  users: ManageCollaborators_collaborators_Group_users[] | null;
  can: ManageCollaborators_collaborators_Group_can | null;
  label: string;
}

export type ManageCollaborators_collaborators = ManageCollaborators_collaborators_User | ManageCollaborators_collaborators_Group;

export interface ManageCollaborators_memberships_member_User {
  __typename: "User";
  id: number;
  name: string;
  href: string | null;
  initials: string;
  avatar: string | null;
}

export interface ManageCollaborators_memberships_member_Group_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ManageCollaborators_memberships_member_Group {
  __typename: "Group";
  id: number;
  name: string;
  href: string | null;
  initials: string;
  avatar: string | null;
  visibility: string;
  user: ManageCollaborators_memberships_member_Group_user;
}

export type ManageCollaborators_memberships_member = ManageCollaborators_memberships_member_User | ManageCollaborators_memberships_member_Group;

export interface ManageCollaborators_memberships_can {
  __typename: "ChannelMembershipCan";
  manage: boolean | null;
}

export interface ManageCollaborators_memberships {
  __typename: "ChannelMembership";
  id: number;
  member: ManageCollaborators_memberships_member | null;
  can: ManageCollaborators_memberships_can | null;
}

export interface ManageCollaborators_can {
  __typename: "ChannelCan";
  manage_collaborators: boolean;
}

export interface ManageCollaborators {
  __typename: "Channel";
  id: number;
  counts: ManageCollaborators_counts | null;
  collaborators: ManageCollaborators_collaborators[] | null;
  memberships: ManageCollaborators_memberships[] | null;
  can: ManageCollaborators_can | null;
}
