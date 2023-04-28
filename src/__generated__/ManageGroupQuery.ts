/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ManageGroupQuery
// ====================================================

export interface ManageGroupQuery_group_invite {
  __typename: "GroupInviteType";
  code: string | null;
  href: string;
}

export interface ManageGroupQuery_group_can {
  __typename: "GroupCan";
  manage: boolean;
  manage_users: boolean;
}

export interface ManageGroupQuery_group_owner {
  __typename: "User";
  id: number;
  name: string;
  href: string;
  initials: string;
  avatar: string | null;
}

export interface ManageGroupQuery_group_memberships_member {
  __typename: "User";
  id: number;
  name: string;
  href: string;
  initials: string;
  avatar: string | null;
}

export interface ManageGroupQuery_group_memberships_can {
  __typename: "GroupMembershipCan";
  manage: boolean;
}

export interface ManageGroupQuery_group_memberships {
  __typename: "GroupMembership";
  id: number;
  member: ManageGroupQuery_group_memberships_member | null;
  can: ManageGroupQuery_group_memberships_can;
}

export interface ManageGroupQuery_group {
  __typename: "Group";
  id: number;
  name: string;
  href: string;
  slug: string;
  description: string | null;
  invite: ManageGroupQuery_group_invite | null;
  can: ManageGroupQuery_group_can;
  owner: ManageGroupQuery_group_owner;
  memberships: ManageGroupQuery_group_memberships[] | null;
}

export interface ManageGroupQuery {
  group: ManageGroupQuery_group | null;
}

export interface ManageGroupQueryVariables {
  id: string;
}
