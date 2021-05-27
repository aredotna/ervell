/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ConnectableContextMenuChannel
// ====================================================

export interface ConnectableContextMenuChannel_can {
  __typename: "ChannelCan";
  remove_connections: boolean | null;
  reorder_connections: boolean | null;
}

export interface ConnectableContextMenuChannel {
  __typename: "Channel";
  id: number | null;
  can: ConnectableContextMenuChannel_can | null;
}
