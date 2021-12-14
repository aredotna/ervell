/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ChannelTableConnectors
// ====================================================

export interface ChannelTableConnectors_channel_connectors {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelTableConnectors_channel {
  __typename: "Channel";
  id: number;
  connectors: ChannelTableConnectors_channel_connectors[] | null;
}

export interface ChannelTableConnectors {
  /**
   * A single channel
   */
  channel: ChannelTableConnectors_channel | null;
}

export interface ChannelTableConnectorsVariables {
  id: string;
  q?: string | null;
}
