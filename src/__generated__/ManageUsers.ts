/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ManageUsers
// ====================================================

export interface ManageUsers_owner {
  __typename: "User";
  id: number;
  name: string;
  href: string;
  initials: string;
  avatar: string | null;
}

export interface ManageUsers_memberships_member {
  __typename: "User";
  id: number;
  name: string;
  href: string;
  initials: string;
  avatar: string | null;
}

export interface ManageUsers_memberships_can {
  __typename: "GroupMembershipCan";
  manage: boolean;
}

export interface ManageUsers_memberships {
  __typename: "GroupMembership";
  id: number;
  member: ManageUsers_memberships_member | null;
  can: ManageUsers_memberships_can;
}

export interface ManageUsers {
  __typename: "Group";
  id: number;
  name: string;
  owner: ManageUsers_owner;
  memberships: ManageUsers_memberships[] | null;
}
