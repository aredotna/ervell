/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: LoadingBreadcrumbChannel
// ====================================================

export interface LoadingBreadcrumbChannel_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export interface LoadingBreadcrumbChannel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
}

export type LoadingBreadcrumbChannel_owner = LoadingBreadcrumbChannel_owner_User | LoadingBreadcrumbChannel_owner_Group;

export interface LoadingBreadcrumbChannel {
  __typename: "Channel";
  id: number;
  label: string;
  owner: LoadingBreadcrumbChannel_owner;
}
