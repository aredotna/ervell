/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ChannelMetadataConnections
// ====================================================

export interface ChannelMetadataConnections_can {
  __typename: "ChannelCan";
  connect: boolean | null;
}

export interface ChannelMetadataConnections_connected_to_channels_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ChannelMetadataConnections_connected_to_channels_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
}

export type ChannelMetadataConnections_connected_to_channels_owner = ChannelMetadataConnections_connected_to_channels_owner_User | ChannelMetadataConnections_connected_to_channels_owner_Group;

export interface ChannelMetadataConnections_connected_to_channels {
  __typename: "Channel";
  id: number | null;
  label: string | null;
  href: string | null;
  owner: ChannelMetadataConnections_connected_to_channels_owner | null;
}

export interface ChannelMetadataConnections {
  __typename: "Channel";
  id: number | null;
  can: ChannelMetadataConnections_can | null;
  connected_to_channels: (ChannelMetadataConnections_connected_to_channels | null)[] | null;
}
