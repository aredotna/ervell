/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProfileMetaTags
// ====================================================

export interface ProfileMetaTags_User {
  __typename: "User";
  title: string | null;
  name: string | null;
  description: string | null;
  href: string | null;
  canonical: string | null;
  is_indexable: boolean | null;
}

export interface ProfileMetaTags_Group {
  __typename: "Group";
  title: string | null;
  name: string | null;
  description: string | null;
  href: string | null;
}

export type ProfileMetaTags = ProfileMetaTags_User | ProfileMetaTags_Group;
