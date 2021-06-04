/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProfileMetadataFilter
// ====================================================

export interface ProfileMetadataFilter_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ProfileMetadataFilter_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
}

export type ProfileMetadataFilter = ProfileMetadataFilter_User | ProfileMetadataFilter_Group;
