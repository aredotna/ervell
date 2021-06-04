/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SendInvitation
// ====================================================

export interface SendInvitation_invite_users_users {
  __typename: "User";
  name: string | null;
}

export interface SendInvitation_invite_users {
  __typename: "InviteUsersPayload";
  users: (SendInvitation_invite_users_users | null)[] | null;
}

export interface SendInvitation {
  invite_users: SendInvitation_invite_users | null;
}

export interface SendInvitationVariables {
  emails: string[];
}
