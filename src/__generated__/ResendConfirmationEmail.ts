/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ResendConfirmationEmail
// ====================================================

export interface ResendConfirmationEmail_resend_confirmation_email_me {
  __typename: "Me";
  id: number;
}

export interface ResendConfirmationEmail_resend_confirmation_email {
  __typename: "ResendConfirmationEmailMutationPayload";
  me: ResendConfirmationEmail_resend_confirmation_email_me;
}

export interface ResendConfirmationEmail {
  resend_confirmation_email: ResendConfirmationEmail_resend_confirmation_email | null;
}
