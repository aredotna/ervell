/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FullChannelMetadataFold
// ====================================================

export interface FullChannelMetadataFold_channel_counts {
  __typename: "ChannelCounts";
  connected_to_channels: number;
}

export interface FullChannelMetadataFold_channel_connected_to_channels_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface FullChannelMetadataFold_channel_connected_to_channels_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type FullChannelMetadataFold_channel_connected_to_channels_owner = FullChannelMetadataFold_channel_connected_to_channels_owner_Group | FullChannelMetadataFold_channel_connected_to_channels_owner_User;

export interface FullChannelMetadataFold_channel_connected_to_channels_counts {
  __typename: "ChannelCounts";
  contents: number;
}

export interface FullChannelMetadataFold_channel_connected_to_channels {
  __typename: "Channel";
  id: number;
  href: string;
  visibility: string;
  title: string;
  owner: FullChannelMetadataFold_channel_connected_to_channels_owner;
  counts: FullChannelMetadataFold_channel_connected_to_channels_counts;
  label: string;
}

export interface FullChannelMetadataFold_channel {
  __typename: "Channel";
  id: number;
  counts: FullChannelMetadataFold_channel_counts;
  connected_to_channels: FullChannelMetadataFold_channel_connected_to_channels[];
}

export interface FullChannelMetadataFold {
  /**
   * A single channel
   */
  channel: FullChannelMetadataFold_channel | null;
}

export interface FullChannelMetadataFoldVariables {
  id: string;
}
