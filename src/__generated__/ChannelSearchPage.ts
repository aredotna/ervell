/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ChannelSearchPage
// ====================================================

export interface ChannelSearchPage_channel_owner_User {
  __typename: "User";
  id: number;
  name: string;
  href: string | null;
  label: string;
}

export interface ChannelSearchPage_channel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  href: string | null;
  label: string;
}

export type ChannelSearchPage_channel_owner = ChannelSearchPage_channel_owner_User | ChannelSearchPage_channel_owner_Group;

export interface ChannelSearchPage_channel_counts {
  __typename: "ChannelCounts";
  collaborators: number | null;
}

export interface ChannelSearchPage_channel {
  __typename: "Channel";
  id: number;
  title: string;
  slug: string;
  truncatedTitle: string;
  href: string | null;
  visibility: string;
  owner: ChannelSearchPage_channel_owner;
  counts: ChannelSearchPage_channel_counts | null;
  label: string;
}

export interface ChannelSearchPage {
  /**
   * A single channel
   */
  channel: ChannelSearchPage_channel | null;
}

export interface ChannelSearchPageVariables {
  id: string;
}
