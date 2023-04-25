/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GroupSearchResult
// ====================================================

export interface GroupSearchResult_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface GroupSearchResult {
  __typename: "Group";
  id: number;
  name: string;
  user: GroupSearchResult_user;
  href: string;
  initials: string;
  avatar: string | null;
}
