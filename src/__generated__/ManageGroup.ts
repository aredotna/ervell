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
  href: string | null;
}

export interface ManageGroup_can {
  __typename: "GroupCan";
  manage: boolean | null;
  manage_users: boolean | null;
}

export interface ManageGroup_owner {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
  initials: string | null;
  avatar: string | null;
}

export interface ManageGroup_memberships_member {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
  initials: string | null;
  avatar: string | null;
}

export interface ManageGroup_memberships_can {
  __typename: "GroupMembershipCan";
  manage: boolean | null;
}

export interface ManageGroup_memberships {
  __typename: "GroupMembership";
  id: number | null;
  member: ManageGroup_memberships_member | null;
  can: ManageGroup_memberships_can | null;
}

export interface ManageGroup {
  __typename: "Group";
  id: number | null;
  name: string | null;
  href: string | null;
  description: string | null;
  invite: ManageGroup_invite | null;
  can: ManageGroup_can | null;
  owner: ManageGroup_owner | null;
  memberships: (ManageGroup_memberships | null)[] | null;
}
