/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FullBlockChannelsAlsoIn
// ====================================================

export interface FullBlockChannelsAlsoIn_Channel {
  __typename: "Channel";
  id: number;
}

export interface FullBlockChannelsAlsoIn_Attachment_counts {
  __typename: "BlockCounts";
  channels_with_same_source: number | null;
}

export interface FullBlockChannelsAlsoIn_Attachment_channels_with_same_source_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface FullBlockChannelsAlsoIn_Attachment_channels_with_same_source_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type FullBlockChannelsAlsoIn_Attachment_channels_with_same_source_owner = FullBlockChannelsAlsoIn_Attachment_channels_with_same_source_owner_Group | FullBlockChannelsAlsoIn_Attachment_channels_with_same_source_owner_User;

export interface FullBlockChannelsAlsoIn_Attachment_channels_with_same_source_counts {
  __typename: "ChannelCounts";
  contents: number;
}

export interface FullBlockChannelsAlsoIn_Attachment_channels_with_same_source {
  __typename: "Channel";
  id: number;
  href: string;
  visibility: string;
  title: string;
  owner: FullBlockChannelsAlsoIn_Attachment_channels_with_same_source_owner;
  counts: FullBlockChannelsAlsoIn_Attachment_channels_with_same_source_counts;
  label: string;
}

export interface FullBlockChannelsAlsoIn_Attachment {
  __typename: "Attachment" | "Embed" | "Image" | "Link" | "PendingBlock" | "Text";
  id: number;
  counts: FullBlockChannelsAlsoIn_Attachment_counts | null;
  channels_with_same_source: FullBlockChannelsAlsoIn_Attachment_channels_with_same_source[];
}

export type FullBlockChannelsAlsoIn = FullBlockChannelsAlsoIn_Channel | FullBlockChannelsAlsoIn_Attachment;
