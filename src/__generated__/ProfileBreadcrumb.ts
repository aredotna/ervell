/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProfileBreadcrumb
// ====================================================

export interface ProfileBreadcrumb_User {
  __typename: "User";
  name: string;
  label: string;
  href: string;
  badge: string | null;
  custom_badge: string | null;
}

export interface ProfileBreadcrumb_Group {
  __typename: "Group";
  name: string;
  label: string;
  href: string;
  visibility: string;
}

export type ProfileBreadcrumb = ProfileBreadcrumb_User | ProfileBreadcrumb_Group;
