/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createAuthenticatedServiceMutation
// ====================================================

export interface createAuthenticatedServiceMutation_create_authenticated_service_authenticated_service {
  __typename: "Authentication";
  id: number | null;
  provider: string | null;
  uid: string | null;
}

export interface createAuthenticatedServiceMutation_create_authenticated_service {
  __typename: "CreateAuthenticatedServicePayload";
  authenticated_service: createAuthenticatedServiceMutation_create_authenticated_service_authenticated_service | null;
}

export interface createAuthenticatedServiceMutation {
  create_authenticated_service: createAuthenticatedServiceMutation_create_authenticated_service | null;
}

export interface createAuthenticatedServiceMutationVariables {
  token: string;
  secret: string;
  uid: string;
  avatar_url?: string | null;
}
