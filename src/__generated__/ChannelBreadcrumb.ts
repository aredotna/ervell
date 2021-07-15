/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ChannelBreadcrumb
// ====================================================

export interface ChannelBreadcrumb_owner_User {
  __typename: "User";
  id: number;
  name: string;
  href: string | null;
  label: string;
}

export interface ChannelBreadcrumb_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  href: string | null;
  label: string;
}

export type ChannelBreadcrumb_owner = ChannelBreadcrumb_owner_User | ChannelBreadcrumb_owner_Group;

export interface ChannelBreadcrumb_counts {
  __typename: "ChannelCounts";
  collaborators: number | null;
}

export interface ChannelBreadcrumb {
  __typename: "Channel";
  id: number;
  title: string;
  truncatedTitle: string;
  href: string | null;
  visibility: string;
  owner: ChannelBreadcrumb_owner;
  counts: ChannelBreadcrumb_counts | null;
  label: string;
}
