/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ConnectTwitter
// ====================================================

export interface ConnectTwitter_authenticated_service_contacts {
  __typename: "User";
  id: number;
  name: string;
  href: string | null;
  initials: string;
  avatar: string | null;
}

export interface ConnectTwitter_authenticated_service {
  __typename: "Authentication";
  id: number;
  contacts: ConnectTwitter_authenticated_service_contacts[] | null;
}

export interface ConnectTwitter {
  __typename: "Me";
  id: number;
  authenticated_service: ConnectTwitter_authenticated_service | null;
}
