/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: requestPasswordReset
// ====================================================

export interface requestPasswordReset_request_password_reset {
  __typename: "RequestPasswordResetPayload";
  email: string | null;
}

export interface requestPasswordReset {
  request_password_reset: requestPasswordReset_request_password_reset | null;
}

export interface requestPasswordResetVariables {
  email: string;
}
