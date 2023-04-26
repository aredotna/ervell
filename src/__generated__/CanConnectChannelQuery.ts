/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CanConnectChannelQuery
// ====================================================

export interface CanConnectChannelQuery_connectable_can {
  __typename: "ChannelCan";
  connect: boolean;
}

export interface CanConnectChannelQuery_connectable {
  __typename: "Channel";
  id: number;
  can: CanConnectChannelQuery_connectable_can;
}

export interface CanConnectChannelQuery {
  /**
   * A single channel
   */
  connectable: CanConnectChannelQuery_connectable | null;
}

export interface CanConnectChannelQueryVariables {
  id: string;
}
