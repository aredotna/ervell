/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: loginMutation
// ====================================================

export interface loginMutation_login_me {
  __typename: "Me";
  id: number;
  authentication_token: string | null;
}

export interface loginMutation_login {
  __typename: "LoginMutationPayload";
  me: loginMutation_login_me;
}

export interface loginMutation {
  login: loginMutation_login | null;
}

export interface loginMutationVariables {
  email: string;
  password: string;
}
