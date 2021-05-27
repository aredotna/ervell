/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Contact
// ====================================================

export interface Contact_Invitee {
  __typename: "Invitee" | "Me";
  name: string | null;
  href: string | null;
  initials: string | null;
  avatar: string | null;
}

export interface Contact_User {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
  initials: string | null;
  avatar: string | null;
}

export type Contact = Contact_Invitee | Contact_User;
