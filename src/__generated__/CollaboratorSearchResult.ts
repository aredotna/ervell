/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CollaboratorSearchResult
// ====================================================

export interface CollaboratorSearchResult_User {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
  hidden_email: string | null;
  initials: string | null;
  avatar: string | null;
}

export interface CollaboratorSearchResult_Group_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface CollaboratorSearchResult_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  href: string | null;
  initials: string | null;
  avatar: string | null;
  visibility: string | null;
  user: CollaboratorSearchResult_Group_user | null;
}

export type CollaboratorSearchResult = CollaboratorSearchResult_User | CollaboratorSearchResult_Group;
