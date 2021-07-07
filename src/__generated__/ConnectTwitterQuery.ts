/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ConnectTwitterQuery
// ====================================================

export interface ConnectTwitterQuery_me_authenticated_service_contacts {
  __typename: "User";
  id: number;
  name: string;
  href: string | null;
  initials: string;
  avatar: string | null;
}

export interface ConnectTwitterQuery_me_authenticated_service {
  __typename: "Authentication";
  id: number;
  contacts: ConnectTwitterQuery_me_authenticated_service_contacts[] | null;
}

export interface ConnectTwitterQuery_me {
  __typename: "Me";
  id: number;
  authenticated_service: ConnectTwitterQuery_me_authenticated_service | null;
}

export interface ConnectTwitterQuery {
  /**
   * The current logged in user
   */
  me: ConnectTwitterQuery_me | null;
}

export interface ConnectTwitterQueryVariables {
  per?: number | null;
  page?: number | null;
}
