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
  href: string | null;
  canonical: string | null;
  is_indexable: boolean;
}

export interface ProfileMetaTags_Group {
  __typename: "Group";
  title: string;
  name: string;
  description: string | null;
  canonical: string | null;
  href: string | null;
}

export type ProfileMetaTags = ProfileMetaTags_User | ProfileMetaTags_Group;
