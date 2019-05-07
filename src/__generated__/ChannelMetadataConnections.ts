/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ChannelMetadataConnections
// ====================================================

export interface ChannelMetadataConnections_can {
  __typename: "ChannelCan";
  connect: boolean | null;
}

export interface ChannelMetadataConnections_connected_to_channels {
  __typename: "Channel";
  id: number | null;
  label: string | null;
  href: string | null;
}

export interface ChannelMetadataConnections {
  __typename: "Channel";
  id: number | null;
  can: ChannelMetadataConnections_can | null;
  connected_to_channels: (ChannelMetadataConnections_connected_to_channels | null)[] | null;
}
