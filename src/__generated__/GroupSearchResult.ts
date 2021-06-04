/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GroupSearchResult
// ====================================================

export interface GroupSearchResult_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface GroupSearchResult {
  __typename: "Group";
  id: number | null;
  name: string | null;
  user: GroupSearchResult_user | null;
  href: string | null;
  initials: string | null;
  avatar: string | null;
}
