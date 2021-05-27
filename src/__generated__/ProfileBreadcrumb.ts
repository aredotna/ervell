/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProfileBreadcrumb
// ====================================================

export interface ProfileBreadcrumb_User {
  __typename: "User";
  name: string | null;
  href: string | null;
  badge: string | null;
  custom_badge: string | null;
}

export interface ProfileBreadcrumb_Group {
  __typename: "Group";
  name: string | null;
  href: string | null;
  visibility: string | null;
}

export type ProfileBreadcrumb = ProfileBreadcrumb_User | ProfileBreadcrumb_Group;
