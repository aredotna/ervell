/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProfileMetadataFilter
// ====================================================

export interface ProfileMetadataFilter_User {
  __typename: "User";
  id: number;
  name: string;
}

export interface ProfileMetadataFilter_Group {
  __typename: "Group";
  id: number;
  name: string;
}

export type ProfileMetadataFilter = ProfileMetadataFilter_User | ProfileMetadataFilter_Group;
