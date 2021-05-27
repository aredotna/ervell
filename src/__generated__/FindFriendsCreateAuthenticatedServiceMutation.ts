/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: FindFriendsCreateAuthenticatedServiceMutation
// ====================================================

export interface FindFriendsCreateAuthenticatedServiceMutation_create_authenticated_service_authenticated_service {
  __typename: "Authentication";
  id: number | null;
  provider: string | null;
  uid: string | null;
}

export interface FindFriendsCreateAuthenticatedServiceMutation_create_authenticated_service {
  __typename: "CreateAuthenticatedServicePayload";
  authenticated_service: FindFriendsCreateAuthenticatedServiceMutation_create_authenticated_service_authenticated_service | null;
}

export interface FindFriendsCreateAuthenticatedServiceMutation {
  create_authenticated_service: FindFriendsCreateAuthenticatedServiceMutation_create_authenticated_service | null;
}

export interface FindFriendsCreateAuthenticatedServiceMutationVariables {
  token: string;
  secret: string;
  uid: string;
  avatar_url?: string | null;
}
