/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProfileMetadataView
// ====================================================

export interface ProfileMetadataView_User {
  __typename: "User";
  href: string;
}

export interface ProfileMetadataView_Group {
  __typename: "Group";
  href: string;
}

export type ProfileMetadataView = ProfileMetadataView_User | ProfileMetadataView_Group;
