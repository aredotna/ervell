/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ConnectableContextMenuConnectable
// ====================================================

export interface ConnectableContextMenuConnectable_Text_can {
  __typename: "BlockCan";
  mute: boolean | null;
  remove: boolean | null;
}

export interface ConnectableContextMenuConnectable_Text_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
}

export interface ConnectableContextMenuConnectable_Text_connection {
  __typename: "Connection";
  can: ConnectableContextMenuConnectable_Text_connection_can | null;
}

export interface ConnectableContextMenuConnectable_Text_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ConnectableContextMenuConnectable_Text {
  __typename: "Text";
  id: number | null;
  can: ConnectableContextMenuConnectable_Text_can | null;
  href: string | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ConnectableContextMenuConnectable_Text_connection | null;
  source: ConnectableContextMenuConnectable_Text_source | null;
}

export interface ConnectableContextMenuConnectable_Image_can {
  __typename: "BlockCan";
  mute: boolean | null;
  remove: boolean | null;
}

export interface ConnectableContextMenuConnectable_Image_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
}

export interface ConnectableContextMenuConnectable_Image_connection {
  __typename: "Connection";
  can: ConnectableContextMenuConnectable_Image_connection_can | null;
}

export interface ConnectableContextMenuConnectable_Image_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ConnectableContextMenuConnectable_Image {
  __typename: "Image";
  id: number | null;
  can: ConnectableContextMenuConnectable_Image_can | null;
  href: string | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ConnectableContextMenuConnectable_Image_connection | null;
  source: ConnectableContextMenuConnectable_Image_source | null;
  find_original_url: string | null;
}

export interface ConnectableContextMenuConnectable_Link_can {
  __typename: "BlockCan";
  mute: boolean | null;
  remove: boolean | null;
}

export interface ConnectableContextMenuConnectable_Link_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
}

export interface ConnectableContextMenuConnectable_Link_connection {
  __typename: "Connection";
  can: ConnectableContextMenuConnectable_Link_connection_can | null;
}

export interface ConnectableContextMenuConnectable_Link_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ConnectableContextMenuConnectable_Link {
  __typename: "Link";
  id: number | null;
  can: ConnectableContextMenuConnectable_Link_can | null;
  href: string | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ConnectableContextMenuConnectable_Link_connection | null;
  source: ConnectableContextMenuConnectable_Link_source | null;
}

export interface ConnectableContextMenuConnectable_Embed_can {
  __typename: "BlockCan";
  mute: boolean | null;
  remove: boolean | null;
}

export interface ConnectableContextMenuConnectable_Embed_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
}

export interface ConnectableContextMenuConnectable_Embed_connection {
  __typename: "Connection";
  can: ConnectableContextMenuConnectable_Embed_connection_can | null;
}

export interface ConnectableContextMenuConnectable_Embed_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ConnectableContextMenuConnectable_Embed {
  __typename: "Embed";
  id: number | null;
  can: ConnectableContextMenuConnectable_Embed_can | null;
  href: string | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ConnectableContextMenuConnectable_Embed_connection | null;
  source: ConnectableContextMenuConnectable_Embed_source | null;
}

export interface ConnectableContextMenuConnectable_Attachment_can {
  __typename: "BlockCan";
  mute: boolean | null;
  remove: boolean | null;
}

export interface ConnectableContextMenuConnectable_Attachment_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
}

export interface ConnectableContextMenuConnectable_Attachment_connection {
  __typename: "Connection";
  can: ConnectableContextMenuConnectable_Attachment_connection_can | null;
}

export interface ConnectableContextMenuConnectable_Attachment_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ConnectableContextMenuConnectable_Attachment {
  __typename: "Attachment";
  id: number | null;
  can: ConnectableContextMenuConnectable_Attachment_can | null;
  href: string | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ConnectableContextMenuConnectable_Attachment_connection | null;
  source: ConnectableContextMenuConnectable_Attachment_source | null;
}

export interface ConnectableContextMenuConnectable_PendingBlock_can {
  __typename: "BlockCan";
  mute: boolean | null;
  remove: boolean | null;
}

export interface ConnectableContextMenuConnectable_PendingBlock_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
}

export interface ConnectableContextMenuConnectable_PendingBlock_connection {
  __typename: "Connection";
  can: ConnectableContextMenuConnectable_PendingBlock_connection_can | null;
}

export interface ConnectableContextMenuConnectable_PendingBlock {
  __typename: "PendingBlock";
  id: number | null;
  can: ConnectableContextMenuConnectable_PendingBlock_can | null;
  href: string | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ConnectableContextMenuConnectable_PendingBlock_connection | null;
}

export interface ConnectableContextMenuConnectable_Channel_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
}

export interface ConnectableContextMenuConnectable_Channel_connection {
  __typename: "Connection";
  can: ConnectableContextMenuConnectable_Channel_connection_can | null;
}

export interface ConnectableContextMenuConnectable_Channel_can {
  __typename: "ChannelCan";
  mute: boolean | null;
}

export interface ConnectableContextMenuConnectable_Channel {
  __typename: "Channel";
  id: number | null;
  href: string | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ConnectableContextMenuConnectable_Channel_connection | null;
  can: ConnectableContextMenuConnectable_Channel_can | null;
}

export type ConnectableContextMenuConnectable = ConnectableContextMenuConnectable_Text | ConnectableContextMenuConnectable_Image | ConnectableContextMenuConnectable_Link | ConnectableContextMenuConnectable_Embed | ConnectableContextMenuConnectable_Attachment | ConnectableContextMenuConnectable_PendingBlock | ConnectableContextMenuConnectable_Channel;
