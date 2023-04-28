/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Contact
// ====================================================

export interface Contact_Invitee {
  __typename: "Invitee" | "Me";
  name: string;
  href: string;
  initials: string;
  avatar: string | null;
}

export interface Contact_User {
  __typename: "User";
  id: number;
  name: string;
  href: string;
  initials: string;
  avatar: string | null;
}

export type Contact = Contact_Invitee | Contact_User;
