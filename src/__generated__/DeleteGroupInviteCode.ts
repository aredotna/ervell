/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteGroupInviteCode
// ====================================================

export interface DeleteGroupInviteCode_delete_group_invite_code_group {
  __typename: "Group";
  id: number | null;
  href: string | null;
}

export interface DeleteGroupInviteCode_delete_group_invite_code {
  __typename: "DeleteGroupInviteCodePayload";
  group: DeleteGroupInviteCode_delete_group_invite_code_group | null;
}

export interface DeleteGroupInviteCode {
  delete_group_invite_code: DeleteGroupInviteCode_delete_group_invite_code | null;
}

export interface DeleteGroupInviteCodeVariables {
  group_id: string;
}
