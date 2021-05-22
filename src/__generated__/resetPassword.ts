/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: resetPassword
// ====================================================

export interface resetPassword_reset_password_me {
  __typename: "Me";
  email: string | null;
}

export interface resetPassword_reset_password {
  __typename: "ResetPasswordPayload";
  me: resetPassword_reset_password_me | null;
}

export interface resetPassword {
  reset_password: resetPassword_reset_password | null;
}

export interface resetPasswordVariables {
  token: string;
  password: string;
  password_confirmation: string;
}
