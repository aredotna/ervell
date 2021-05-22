/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: acceptGroupInvite
// ====================================================

export interface acceptGroupInvite_accept_group_invite_group {
  __typename: "Group";
  id: number | null;
  href: string | null;
}

export interface acceptGroupInvite_accept_group_invite {
  __typename: "AcceptGroupInvitePayload";
  group: acceptGroupInvite_accept_group_invite_group | null;
}

export interface acceptGroupInvite {
  accept_group_invite: acceptGroupInvite_accept_group_invite | null;
}

export interface acceptGroupInviteVariables {
  code: string;
}
