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
  href: string;
  label: string;
}

export interface ChannelBreadcrumb_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  href: string;
  label: string;
}

export type ChannelBreadcrumb_owner = ChannelBreadcrumb_owner_User | ChannelBreadcrumb_owner_Group;

export interface ChannelBreadcrumb_counts {
  __typename: "ChannelCounts";
  collaborators: number;
}

export interface ChannelBreadcrumb {
  __typename: "Channel";
  id: number;
  title: string;
  truncatedTitle: string;
  href: string;
  visibility: string;
  owner: ChannelBreadcrumb_owner;
  counts: ChannelBreadcrumb_counts;
  label: string;
}
