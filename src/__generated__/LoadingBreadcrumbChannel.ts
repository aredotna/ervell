/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: LoadingBreadcrumbChannel
// ====================================================

export interface LoadingBreadcrumbChannel_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface LoadingBreadcrumbChannel_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
}

export type LoadingBreadcrumbChannel_owner = LoadingBreadcrumbChannel_owner_User | LoadingBreadcrumbChannel_owner_Group;

export interface LoadingBreadcrumbChannel {
  __typename: "Channel";
  id: number | null;
  label: string | null;
  owner: LoadingBreadcrumbChannel_owner | null;
}
