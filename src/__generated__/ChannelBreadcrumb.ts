/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ChannelBreadcrumb
// ====================================================

export interface ChannelBreadcrumb_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
  label: string | null;
}

export interface ChannelBreadcrumb_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  href: string | null;
  label: string | null;
}

export type ChannelBreadcrumb_owner = ChannelBreadcrumb_owner_User | ChannelBreadcrumb_owner_Group;

export interface ChannelBreadcrumb_counts {
  __typename: "ChannelCounts";
  collaborators: number | null;
}

export interface ChannelBreadcrumb {
  __typename: "Channel";
  id: number | null;
  title: string | null;
  truncatedTitle: string | null;
  href: string | null;
  visibility: string | null;
  owner: ChannelBreadcrumb_owner | null;
  counts: ChannelBreadcrumb_counts | null;
  label: string | null;
}
