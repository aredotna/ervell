/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ConnectableContextMenuChannel
// ====================================================

export interface ConnectableContextMenuChannel_can {
  __typename: "ChannelCan";
  update: boolean;
}

export interface ConnectableContextMenuChannel {
  __typename: "Channel";
  id: number;
  can: ConnectableContextMenuChannel_can;
}
