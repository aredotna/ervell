/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: loginMutation
// ====================================================

export interface loginMutation_login_me {
  __typename: "Me";
  id: number | null;
  authentication_token: string | null;
}

export interface loginMutation_login {
  __typename: "LoginPayload";
  me: loginMutation_login_me | null;
}

export interface loginMutation {
  login: loginMutation_login | null;
}

export interface loginMutationVariables {
  email: string;
  password: string;
}
