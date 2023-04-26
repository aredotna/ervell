/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ChannelContextMenu
// ====================================================

export interface ChannelContextMenu_channel_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean;
}

export interface ChannelContextMenu_channel_connection {
  __typename: "Connection";
  can: ChannelContextMenu_channel_connection_can;
}

export interface ChannelContextMenu_channel_can {
  __typename: "ChannelCan";
  mute: boolean;
}

export interface ChannelContextMenu_channel {
  __typename: "Channel";
  id: number;
  href: string;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelContextMenu_channel_connection | null;
  can: ChannelContextMenu_channel_can;
}

export interface ChannelContextMenu {
  /**
   * A single channel
   */
  channel: ChannelContextMenu_channel | null;
}

export interface ChannelContextMenuVariables {
  id: string;
}
