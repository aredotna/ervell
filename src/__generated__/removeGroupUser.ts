/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: removeGroupUser
// ====================================================

export interface removeGroupUser_remove_group_users_group_invite {
  __typename: "GroupInviteType";
  code: string | null;
  href: string | null;
}

export interface removeGroupUser_remove_group_users_group_can {
  __typename: "GroupCan";
  manage: boolean | null;
  manage_users: boolean | null;
}

export interface removeGroupUser_remove_group_users_group_owner {
  __typename: "User";
  id: number;
  name: string;
  href: string | null;
  initials: string;
  avatar: string | null;
}

export interface removeGroupUser_remove_group_users_group_memberships_member {
  __typename: "User";
  id: number;
  name: string;
  href: string | null;
  initials: string;
  avatar: string | null;
}

export interface removeGroupUser_remove_group_users_group_memberships_can {
  __typename: "GroupMembershipCan";
  manage: boolean | null;
}

export interface removeGroupUser_remove_group_users_group_memberships {
  __typename: "GroupMembership";
  id: number;
  member: removeGroupUser_remove_group_users_group_memberships_member | null;
  can: removeGroupUser_remove_group_users_group_memberships_can | null;
}

export interface removeGroupUser_remove_group_users_group {
  __typename: "Group";
  id: number;
  name: string;
  href: string | null;
  description: string | null;
  invite: removeGroupUser_remove_group_users_group_invite | null;
  can: removeGroupUser_remove_group_users_group_can | null;
  owner: removeGroupUser_remove_group_users_group_owner;
  memberships: removeGroupUser_remove_group_users_group_memberships[] | null;
}

export interface removeGroupUser_remove_group_users {
  __typename: "RemoveGroupUsersMutationPayload";
  group: removeGroupUser_remove_group_users_group;
}

export interface removeGroupUser {
  remove_group_users: removeGroupUser_remove_group_users | null;
}

export interface removeGroupUserVariables {
  id: string;
  user_id: string;
}
