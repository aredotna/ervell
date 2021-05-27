/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteGroupInvite
// ====================================================

export interface DeleteGroupInvite_delete_group_invite_group_invite {
  __typename: "GroupInviteType";
  code: string | null;
}

export interface DeleteGroupInvite_delete_group_invite_group {
  __typename: "Group";
  id: number | null;
  href: string | null;
  invite: DeleteGroupInvite_delete_group_invite_group_invite | null;
}

export interface DeleteGroupInvite_delete_group_invite {
  __typename: "DeleteGroupInvitePayload";
  group: DeleteGroupInvite_delete_group_invite_group | null;
}

export interface DeleteGroupInvite {
  delete_group_invite: DeleteGroupInvite_delete_group_invite | null;
}

export interface DeleteGroupInviteVariables {
  group_id: string;
}
