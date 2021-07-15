/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: inviteUserMutation
// ====================================================

export interface inviteUserMutation_invite_users_users {
  __typename: "User";
  id: number;
  name: string;
}

export interface inviteUserMutation_invite_users {
  __typename: "InviteUsersMutationPayload";
  users: inviteUserMutation_invite_users_users[];
}

export interface inviteUserMutation {
  invite_users: inviteUserMutation_invite_users | null;
}

export interface inviteUserMutationVariables {
  email: string;
}
