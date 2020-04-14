/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GroupInviteCode
// ====================================================

export interface GroupInviteCode_group_invite {
  __typename: "GroupInviteType";
  code: string | null;
}

export interface GroupInviteCode_group {
  __typename: "Group";
  id: number | null;
  invite: GroupInviteCode_group_invite | null;
}

export interface GroupInviteCode {
  group: GroupInviteCode_group | null;
}

export interface GroupInviteCodeVariables {
  id: string;
}
