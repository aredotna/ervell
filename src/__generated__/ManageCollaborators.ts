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
  id: number | null;
  name: string | null;
  href: string | null;
  initials: string | null;
  avatar: string | null;
  label: string | null;
}

export interface ManageCollaborators_collaborators_Group_user {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
}

export interface ManageCollaborators_collaborators_Group_users {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
}

export interface ManageCollaborators_collaborators_Group_can {
  __typename: "GroupCan";
  manage: boolean | null;
  manage_users: boolean | null;
}

export interface ManageCollaborators_collaborators_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  href: string | null;
  initials: string | null;
  avatar: string | null;
  visibility: string | null;
  user: ManageCollaborators_collaborators_Group_user | null;
  description: string | null;
  users: (ManageCollaborators_collaborators_Group_users | null)[] | null;
  can: ManageCollaborators_collaborators_Group_can | null;
  label: string | null;
}

export type ManageCollaborators_collaborators = ManageCollaborators_collaborators_User | ManageCollaborators_collaborators_Group;

export interface ManageCollaborators_memberships_member_User {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
  initials: string | null;
  avatar: string | null;
}

export interface ManageCollaborators_memberships_member_Group_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ManageCollaborators_memberships_member_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  href: string | null;
  initials: string | null;
  avatar: string | null;
  visibility: string | null;
  user: ManageCollaborators_memberships_member_Group_user | null;
}

export type ManageCollaborators_memberships_member = ManageCollaborators_memberships_member_User | ManageCollaborators_memberships_member_Group;

export interface ManageCollaborators_memberships_can {
  __typename: "ChannelMembershipCan";
  manage: boolean | null;
}

export interface ManageCollaborators_memberships {
  __typename: "ChannelMembership";
  id: number | null;
  member: ManageCollaborators_memberships_member | null;
  can: ManageCollaborators_memberships_can | null;
}

export interface ManageCollaborators_can {
  __typename: "ChannelCan";
  manage_collaborators: boolean | null;
}

export interface ManageCollaborators {
  __typename: "Channel";
  id: number | null;
  counts: ManageCollaborators_counts | null;
  collaborators: (ManageCollaborators_collaborators | null)[] | null;
  memberships: (ManageCollaborators_memberships | null)[] | null;
  can: ManageCollaborators_can | null;
}
