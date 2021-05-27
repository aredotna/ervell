/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ManageUsers
// ====================================================

export interface ManageUsers_owner {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
  initials: string | null;
  avatar: string | null;
}

export interface ManageUsers_memberships_member {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
  initials: string | null;
  avatar: string | null;
}

export interface ManageUsers_memberships_can {
  __typename: "GroupMembershipCan";
  manage: boolean | null;
}

export interface ManageUsers_memberships {
  __typename: "GroupMembership";
  id: number | null;
  member: ManageUsers_memberships_member | null;
  can: ManageUsers_memberships_can | null;
}

export interface ManageUsers {
  __typename: "Group";
  id: number | null;
  name: string | null;
  owner: ManageUsers_owner | null;
  memberships: (ManageUsers_memberships | null)[] | null;
}
