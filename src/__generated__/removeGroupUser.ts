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
  href: string;
}

export interface removeGroupUser_remove_group_users_group_can {
  __typename: "GroupCan";
  manage: boolean;
  manage_users: boolean;
}

export interface removeGroupUser_remove_group_users_group_owner {
  __typename: "User";
  id: number;
  name: string;
  href: string;
  initials: string;
  avatar: string | null;
}

export interface removeGroupUser_remove_group_users_group_memberships_member {
  __typename: "User";
  id: number;
  name: string;
  href: string;
  initials: string;
  avatar: string | null;
}

export interface removeGroupUser_remove_group_users_group_memberships_can {
  __typename: "GroupMembershipCan";
  manage: boolean;
}

export interface removeGroupUser_remove_group_users_group_memberships {
  __typename: "GroupMembership";
  id: number;
  member: removeGroupUser_remove_group_users_group_memberships_member | null;
  can: removeGroupUser_remove_group_users_group_memberships_can;
}

export interface removeGroupUser_remove_group_users_group {
  __typename: "Group";
  id: number;
  name: string;
  href: string;
  slug: string;
  description: string | null;
  invite: removeGroupUser_remove_group_users_group_invite | null;
  can: removeGroupUser_remove_group_users_group_can;
  owner: removeGroupUser_remove_group_users_group_owner;
  memberships: removeGroupUser_remove_group_users_group_memberships[];
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
