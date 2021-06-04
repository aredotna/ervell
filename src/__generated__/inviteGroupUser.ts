/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: inviteGroupUser
// ====================================================

export interface inviteGroupUser_invite_group_users_group_invite {
  __typename: "GroupInviteType";
  code: string | null;
  href: string | null;
}

export interface inviteGroupUser_invite_group_users_group_can {
  __typename: "GroupCan";
  manage: boolean | null;
  manage_users: boolean | null;
}

export interface inviteGroupUser_invite_group_users_group_owner {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
  initials: string | null;
  avatar: string | null;
}

export interface inviteGroupUser_invite_group_users_group_memberships_member {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
  initials: string | null;
  avatar: string | null;
}

export interface inviteGroupUser_invite_group_users_group_memberships_can {
  __typename: "GroupMembershipCan";
  manage: boolean | null;
}

export interface inviteGroupUser_invite_group_users_group_memberships {
  __typename: "GroupMembership";
  id: number | null;
  member: inviteGroupUser_invite_group_users_group_memberships_member | null;
  can: inviteGroupUser_invite_group_users_group_memberships_can | null;
}

export interface inviteGroupUser_invite_group_users_group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  href: string | null;
  description: string | null;
  invite: inviteGroupUser_invite_group_users_group_invite | null;
  can: inviteGroupUser_invite_group_users_group_can | null;
  owner: inviteGroupUser_invite_group_users_group_owner | null;
  memberships: (inviteGroupUser_invite_group_users_group_memberships | null)[] | null;
}

export interface inviteGroupUser_invite_group_users {
  __typename: "InviteGroupUsersPayload";
  group: inviteGroupUser_invite_group_users_group | null;
}

export interface inviteGroupUser {
  invite_group_users: inviteGroupUser_invite_group_users | null;
}

export interface inviteGroupUserVariables {
  id: string;
  email: string;
}
