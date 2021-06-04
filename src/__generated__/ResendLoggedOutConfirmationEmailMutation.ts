/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ResendLoggedOutConfirmationEmailMutation
// ====================================================

export interface ResendLoggedOutConfirmationEmailMutation_resend_logged_out_confirmation_email {
  __typename: "ResendLoggedOutConfirmationEmailMutationPayload";
  status: string | null;
}

export interface ResendLoggedOutConfirmationEmailMutation {
  resend_logged_out_confirmation_email: ResendLoggedOutConfirmationEmailMutation_resend_logged_out_confirmation_email | null;
}

export interface ResendLoggedOutConfirmationEmailMutationVariables {
  email: string;
}
