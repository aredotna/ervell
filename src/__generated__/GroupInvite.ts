/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GroupInvite
// ====================================================

export interface GroupInvite_group_invite {
  __typename: "GroupInviteType";
  code: string | null;
}

export interface GroupInvite_group {
  __typename: "Group";
  id: number | null;
  invite: GroupInvite_group_invite | null;
}

export interface GroupInvite {
  group: GroupInvite_group | null;
}

export interface GroupInviteVariables {
  id: string;
}
