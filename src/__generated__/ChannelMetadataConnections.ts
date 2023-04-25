/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ChannelMetadataConnections
// ====================================================

export interface ChannelMetadataConnections_can {
  __typename: "ChannelCan";
  connect: boolean;
}

export interface ChannelMetadataConnections_connected_to_channels_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelMetadataConnections_connected_to_channels_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
}

export type ChannelMetadataConnections_connected_to_channels_owner = ChannelMetadataConnections_connected_to_channels_owner_User | ChannelMetadataConnections_connected_to_channels_owner_Group;

export interface ChannelMetadataConnections_connected_to_channels {
  __typename: "Channel";
  id: number;
  label: string;
  href: string;
  owner: ChannelMetadataConnections_connected_to_channels_owner;
}

export interface ChannelMetadataConnections {
  __typename: "Channel";
  id: number;
  can: ChannelMetadataConnections_can;
  connected_to_channels: ChannelMetadataConnections_connected_to_channels[];
}
