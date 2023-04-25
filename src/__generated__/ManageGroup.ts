/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ManageGroup
// ====================================================

export interface ManageGroup_invite {
  __typename: "GroupInviteType";
  code: string | null;
  href: string;
}

export interface ManageGroup_can {
  __typename: "GroupCan";
  manage: boolean;
  manage_users: boolean;
}

export interface ManageGroup_owner {
  __typename: "User";
  id: number;
  name: string;
  href: string;
  initials: string;
  avatar: string | null;
}

export interface ManageGroup_memberships_member {
  __typename: "User";
  id: number;
  name: string;
  href: string;
  initials: string;
  avatar: string | null;
}

export interface ManageGroup_memberships_can {
  __typename: "GroupMembershipCan";
  manage: boolean;
}

export interface ManageGroup_memberships {
  __typename: "GroupMembership";
  id: number;
  member: ManageGroup_memberships_member | null;
  can: ManageGroup_memberships_can;
}

export interface ManageGroup {
  __typename: "Group";
  id: number;
  name: string;
  href: string;
  slug: string;
  description: string | null;
  invite: ManageGroup_invite | null;
  can: ManageGroup_can;
  owner: ManageGroup_owner;
  memberships: ManageGroup_memberships[] | null;
}
