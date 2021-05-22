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
  href: string | null;
}

export interface ManageGroupQuery_group_can {
  __typename: "GroupCan";
  manage: boolean | null;
  manage_users: boolean | null;
}

export interface ManageGroupQuery_group_owner {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
  initials: string | null;
  avatar: string | null;
}

export interface ManageGroupQuery_group_memberships_member {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
  initials: string | null;
  avatar: string | null;
}

export interface ManageGroupQuery_group_memberships_can {
  __typename: "GroupMembershipCan";
  manage: boolean | null;
}

export interface ManageGroupQuery_group_memberships {
  __typename: "GroupMembership";
  id: number | null;
  member: ManageGroupQuery_group_memberships_member | null;
  can: ManageGroupQuery_group_memberships_can | null;
}

export interface ManageGroupQuery_group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  href: string | null;
  description: string | null;
  invite: ManageGroupQuery_group_invite | null;
  can: ManageGroupQuery_group_can | null;
  owner: ManageGroupQuery_group_owner | null;
  memberships: (ManageGroupQuery_group_memberships | null)[] | null;
}

export interface ManageGroupQuery {
  group: ManageGroupQuery_group | null;
}

export interface ManageGroupQueryVariables {
  id: string;
}
