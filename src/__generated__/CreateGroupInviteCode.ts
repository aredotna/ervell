/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateGroupInviteCode
// ====================================================

export interface CreateGroupInviteCode_create_group_invite_group_invite {
  __typename: "GroupInviteType";
  code: string | null;
}

export interface CreateGroupInviteCode_create_group_invite_group {
  __typename: "Group";
  id: number | null;
  href: string | null;
  invite: CreateGroupInviteCode_create_group_invite_group_invite | null;
}

export interface CreateGroupInviteCode_create_group_invite {
  __typename: "CreateGroupInvitePayload";
  group: CreateGroupInviteCode_create_group_invite_group | null;
}

export interface CreateGroupInviteCode {
  create_group_invite: CreateGroupInviteCode_create_group_invite | null;
}

export interface CreateGroupInviteCodeVariables {
  group_id: string;
}
