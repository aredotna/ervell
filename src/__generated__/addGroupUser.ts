/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: addGroupUser
// ====================================================

export interface addGroupUser_add_group_users_group_invite {
  __typename: "GroupInviteType";
  code: string | null;
  href: string;
}

export interface addGroupUser_add_group_users_group_can {
  __typename: "GroupCan";
  manage: boolean;
  manage_users: boolean;
}

export interface addGroupUser_add_group_users_group_owner {
  __typename: "User";
  id: number;
  name: string;
  href: string;
  initials: string;
  avatar: string | null;
}

export interface addGroupUser_add_group_users_group_memberships_member {
  __typename: "User";
  id: number;
  name: string;
  href: string;
  initials: string;
  avatar: string | null;
}

export interface addGroupUser_add_group_users_group_memberships_can {
  __typename: "GroupMembershipCan";
  manage: boolean;
}

export interface addGroupUser_add_group_users_group_memberships {
  __typename: "GroupMembership";
  id: number;
  member: addGroupUser_add_group_users_group_memberships_member | null;
  can: addGroupUser_add_group_users_group_memberships_can;
}

export interface addGroupUser_add_group_users_group {
  __typename: "Group";
  id: number;
  name: string;
  href: string;
  slug: string;
  description: string | null;
  invite: addGroupUser_add_group_users_group_invite | null;
  can: addGroupUser_add_group_users_group_can;
  owner: addGroupUser_add_group_users_group_owner;
  memberships: addGroupUser_add_group_users_group_memberships[];
}

export interface addGroupUser_add_group_users {
  __typename: "AddGroupUsersMutationPayload";
  group: addGroupUser_add_group_users_group;
}

export interface addGroupUser {
  add_group_users: addGroupUser_add_group_users | null;
}

export interface addGroupUserVariables {
  id: string;
  user_id: string;
}
