/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SendInvitation
// ====================================================

export interface SendInvitation_invite_users_users {
  __typename: "User";
  name: string;
}

export interface SendInvitation_invite_users {
  __typename: "InviteUsersMutationPayload";
  users: SendInvitation_invite_users_users[];
}

export interface SendInvitation {
  invite_users: SendInvitation_invite_users | null;
}

export interface SendInvitationVariables {
  emails: string[];
}
