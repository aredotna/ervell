/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateGroupInvite
// ====================================================

export interface CreateGroupInvite_create_group_invite_group_invite {
  __typename: "GroupInviteType";
  code: string | null;
}

export interface CreateGroupInvite_create_group_invite_group {
  __typename: "Group";
  id: number | null;
  href: string | null;
  invite: CreateGroupInvite_create_group_invite_group_invite | null;
}

export interface CreateGroupInvite_create_group_invite {
  __typename: "CreateGroupInvitePayload";
  group: CreateGroupInvite_create_group_invite_group | null;
}

export interface CreateGroupInvite {
  create_group_invite: CreateGroupInvite_create_group_invite | null;
}

export interface CreateGroupInviteVariables {
  group_id: string;
}
