/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: acceptInvitationMutation
// ====================================================

export interface acceptInvitationMutation_accept_invitation_me {
  __typename: "Me";
  id: number | null;
  email: string | null;
}

export interface acceptInvitationMutation_accept_invitation {
  __typename: "AcceptInvitationPayload";
  me: acceptInvitationMutation_accept_invitation_me | null;
}

export interface acceptInvitationMutation {
  accept_invitation: acceptInvitationMutation_accept_invitation | null;
}

export interface acceptInvitationMutationVariables {
  invitation_token: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  receive_newsletter?: boolean | null;
  receive_tips_emails?: boolean | null;
  validation_token: string;
}
