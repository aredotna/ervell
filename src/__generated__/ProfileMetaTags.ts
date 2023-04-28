/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProfileMetaTags
// ====================================================

export interface ProfileMetaTags_User {
  __typename: "User";
  title: string;
  name: string;
  description: string | null;
  href: string;
  canonical: string;
  is_indexable: boolean;
}

export interface ProfileMetaTags_Group {
  __typename: "Group";
  title: string;
  name: string;
  description: string | null;
  canonical: string;
  href: string;
}

export type ProfileMetaTags = ProfileMetaTags_User | ProfileMetaTags_Group;
