/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: acceptGroupInviteCode
// ====================================================

export interface acceptGroupInviteCode_accept_group_invite_code_group {
  __typename: "Group";
  id: number | null;
  href: string | null;
}

export interface acceptGroupInviteCode_accept_group_invite_code {
  __typename: "AcceptGroupInviteCodePayload";
  group: acceptGroupInviteCode_accept_group_invite_code_group | null;
}

export interface acceptGroupInviteCode {
  accept_group_invite_code: acceptGroupInviteCode_accept_group_invite_code | null;
}

export interface acceptGroupInviteCodeVariables {
  code: string;
}
