/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: acceptGroupInvite
// ====================================================

export interface acceptGroupInvite_accept_group_invite_group {
  __typename: "Group";
  id: number;
  href: string;
}

export interface acceptGroupInvite_accept_group_invite {
  __typename: "AcceptGroupInviteMutationPayload";
  group: acceptGroupInvite_accept_group_invite_group;
}

export interface acceptGroupInvite {
  accept_group_invite: acceptGroupInvite_accept_group_invite | null;
}

export interface acceptGroupInviteVariables {
  code: string;
}
