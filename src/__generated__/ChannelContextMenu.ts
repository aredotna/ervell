/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ChannelContextMenu
// ====================================================

export interface ChannelContextMenu_channel_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
}

export interface ChannelContextMenu_channel_connection {
  __typename: "Connection";
  can: ChannelContextMenu_channel_connection_can | null;
}

export interface ChannelContextMenu_channel_can {
  __typename: "ChannelCan";
  mute: boolean | null;
}

export interface ChannelContextMenu_channel {
  __typename: "Channel";
  id: number;
  href: string | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelContextMenu_channel_connection | null;
  can: ChannelContextMenu_channel_can | null;
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
