/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CollaboratorSearchResults
// ====================================================

export interface CollaboratorSearchResults_collaborators_User {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
  hidden_email: string | null;
  initials: string | null;
  avatar: string | null;
}

export interface CollaboratorSearchResults_collaborators_Group_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface CollaboratorSearchResults_collaborators_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  href: string | null;
  initials: string | null;
  avatar: string | null;
  visibility: string | null;
  user: CollaboratorSearchResults_collaborators_Group_user | null;
}

export type CollaboratorSearchResults_collaborators = CollaboratorSearchResults_collaborators_User | CollaboratorSearchResults_collaborators_Group;

export interface CollaboratorSearchResults {
  __typename: "Searches";
  collaborators: (CollaboratorSearchResults_collaborators | null)[] | null;
}
