/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: EmptyProfile
// ====================================================

export interface EmptyProfile_Group {
  __typename: "Group";
  id: number;
  name: string;
}

export interface EmptyProfile_User {
  __typename: "User";
  id: number;
  name: string;
}

export type EmptyProfile = EmptyProfile_Group | EmptyProfile_User;
