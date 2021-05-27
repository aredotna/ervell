/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: inviteUserMutation
// ====================================================

export interface inviteUserMutation_invite_users_users {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface inviteUserMutation_invite_users {
  __typename: "InviteUsersPayload";
  users: (inviteUserMutation_invite_users_users | null)[] | null;
}

export interface inviteUserMutation {
  invite_users: inviteUserMutation_invite_users | null;
}

export interface inviteUserMutationVariables {
  email: string;
}
