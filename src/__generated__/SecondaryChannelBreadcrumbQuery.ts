/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SecondaryChannelBreadcrumbQuery
// ====================================================

export interface SecondaryChannelBreadcrumbQuery_channel_owner_User {
  __typename: "User";
  id: number;
  name: string;
  label: string;
}

export interface SecondaryChannelBreadcrumbQuery_channel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  label: string;
}

export type SecondaryChannelBreadcrumbQuery_channel_owner = SecondaryChannelBreadcrumbQuery_channel_owner_User | SecondaryChannelBreadcrumbQuery_channel_owner_Group;

export interface SecondaryChannelBreadcrumbQuery_channel {
  __typename: "Channel";
  id: number;
  title: string;
  slug: string;
  visibility: string;
  href: string | null;
  owner: SecondaryChannelBreadcrumbQuery_channel_owner;
}

export interface SecondaryChannelBreadcrumbQuery {
  /**
   * A single channel
   */
  channel: SecondaryChannelBreadcrumbQuery_channel | null;
}

export interface SecondaryChannelBreadcrumbQueryVariables {
  channel_id: string;
}
