/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: registerMutation
// ====================================================

export interface registerMutation_registration_me {
  __typename: "Me";
  id: number;
}

export interface registerMutation_registration {
  __typename: "RegistrationMutationPayload";
  me: registerMutation_registration_me;
}

export interface registerMutation {
  registration: registerMutation_registration | null;
}

export interface registerMutationVariables {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  receive_newsletter?: boolean | null;
  validation_token: string;
}
