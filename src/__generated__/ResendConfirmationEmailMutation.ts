/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ResendConfirmationEmailMutation
// ====================================================

export interface ResendConfirmationEmailMutation_resend_confirmation_email_me {
  __typename: "Me";
  id: number | null;
}

export interface ResendConfirmationEmailMutation_resend_confirmation_email {
  __typename: "ResendConfirmationEmailPayload";
  me: ResendConfirmationEmailMutation_resend_confirmation_email_me | null;
}

export interface ResendConfirmationEmailMutation {
  resend_confirmation_email: ResendConfirmationEmailMutation_resend_confirmation_email | null;
}
