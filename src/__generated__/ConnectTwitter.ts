/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ConnectTwitter
// ====================================================

export interface ConnectTwitter_authenticated_service_contacts {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
  initials: string | null;
  avatar: string | null;
}

export interface ConnectTwitter_authenticated_service {
  __typename: "Authentication";
  id: number | null;
  contacts: (ConnectTwitter_authenticated_service_contacts | null)[] | null;
}

export interface ConnectTwitter {
  __typename: "Me";
  id: number | null;
  authenticated_service: ConnectTwitter_authenticated_service | null;
}
