/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetConnectableContextMenu
// ====================================================

export interface GetConnectableContextMenu_blokk_Attachment_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
}

export interface GetConnectableContextMenu_blokk_Attachment_connection {
  __typename: "Connection";
  can: GetConnectableContextMenu_blokk_Attachment_connection_can | null;
}

export interface GetConnectableContextMenu_blokk_Attachment_can {
  __typename: "BlockCan";
  remove: boolean | null;
  manage: boolean | null;
  mute: boolean | null;
}

export interface GetConnectableContextMenu_blokk_Attachment_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface GetConnectableContextMenu_blokk_Attachment {
  __typename: "Attachment";
  id: number;
  href: string | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: GetConnectableContextMenu_blokk_Attachment_connection | null;
  can: GetConnectableContextMenu_blokk_Attachment_can | null;
  source: GetConnectableContextMenu_blokk_Attachment_source | null;
}

export interface GetConnectableContextMenu_blokk_Embed_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
}

export interface GetConnectableContextMenu_blokk_Embed_connection {
  __typename: "Connection";
  can: GetConnectableContextMenu_blokk_Embed_connection_can | null;
}

export interface GetConnectableContextMenu_blokk_Embed_can {
  __typename: "BlockCan";
  remove: boolean | null;
  manage: boolean | null;
  mute: boolean | null;
}

export interface GetConnectableContextMenu_blokk_Embed_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface GetConnectableContextMenu_blokk_Embed {
  __typename: "Embed";
  id: number;
  href: string | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: GetConnectableContextMenu_blokk_Embed_connection | null;
  can: GetConnectableContextMenu_blokk_Embed_can | null;
  source: GetConnectableContextMenu_blokk_Embed_source | null;
}

export interface GetConnectableContextMenu_blokk_Image_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
}

export interface GetConnectableContextMenu_blokk_Image_connection {
  __typename: "Connection";
  can: GetConnectableContextMenu_blokk_Image_connection_can | null;
}

export interface GetConnectableContextMenu_blokk_Image_can {
  __typename: "BlockCan";
  remove: boolean | null;
  manage: boolean | null;
  mute: boolean | null;
}

export interface GetConnectableContextMenu_blokk_Image_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface GetConnectableContextMenu_blokk_Image {
  __typename: "Image";
  id: number;
  href: string | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: GetConnectableContextMenu_blokk_Image_connection | null;
  can: GetConnectableContextMenu_blokk_Image_can | null;
  source: GetConnectableContextMenu_blokk_Image_source | null;
  /**
   * URL to find the original image on various services
   */
  find_original_url: string | null;
}

export interface GetConnectableContextMenu_blokk_Link_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
}

export interface GetConnectableContextMenu_blokk_Link_connection {
  __typename: "Connection";
  can: GetConnectableContextMenu_blokk_Link_connection_can | null;
}

export interface GetConnectableContextMenu_blokk_Link_can {
  __typename: "BlockCan";
  remove: boolean | null;
  manage: boolean | null;
  mute: boolean | null;
}

export interface GetConnectableContextMenu_blokk_Link_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface GetConnectableContextMenu_blokk_Link {
  __typename: "Link";
  id: number;
  href: string | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: GetConnectableContextMenu_blokk_Link_connection | null;
  can: GetConnectableContextMenu_blokk_Link_can | null;
  source: GetConnectableContextMenu_blokk_Link_source | null;
}

export interface GetConnectableContextMenu_blokk_PendingBlock_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
}

export interface GetConnectableContextMenu_blokk_PendingBlock_connection {
  __typename: "Connection";
  can: GetConnectableContextMenu_blokk_PendingBlock_connection_can | null;
}

export interface GetConnectableContextMenu_blokk_PendingBlock_can {
  __typename: "BlockCan";
  remove: boolean | null;
  manage: boolean | null;
  mute: boolean | null;
}

export interface GetConnectableContextMenu_blokk_PendingBlock {
  __typename: "PendingBlock";
  id: number;
  href: string | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: GetConnectableContextMenu_blokk_PendingBlock_connection | null;
  can: GetConnectableContextMenu_blokk_PendingBlock_can | null;
}

export interface GetConnectableContextMenu_blokk_Text_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
}

export interface GetConnectableContextMenu_blokk_Text_connection {
  __typename: "Connection";
  can: GetConnectableContextMenu_blokk_Text_connection_can | null;
}

export interface GetConnectableContextMenu_blokk_Text_can {
  __typename: "BlockCan";
  remove: boolean | null;
  manage: boolean | null;
  mute: boolean | null;
}

export interface GetConnectableContextMenu_blokk_Text_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface GetConnectableContextMenu_blokk_Text {
  __typename: "Text";
  id: number;
  href: string | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: GetConnectableContextMenu_blokk_Text_connection | null;
  can: GetConnectableContextMenu_blokk_Text_can | null;
  source: GetConnectableContextMenu_blokk_Text_source | null;
}

export interface GetConnectableContextMenu_blokk_Channel_connection_can {
  __typename: "ConnectionCan";
  destroy: boolean | null;
}

export interface GetConnectableContextMenu_blokk_Channel_connection {
  __typename: "Connection";
  can: GetConnectableContextMenu_blokk_Channel_connection_can | null;
}

export interface GetConnectableContextMenu_blokk_Channel_can {
  __typename: "ChannelCan";
  mute: boolean | null;
}

export interface GetConnectableContextMenu_blokk_Channel {
  __typename: "Channel";
  id: number;
  href: string | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: GetConnectableContextMenu_blokk_Channel_connection | null;
  can: GetConnectableContextMenu_blokk_Channel_can | null;
}

export type GetConnectableContextMenu_blokk = GetConnectableContextMenu_blokk_Attachment | GetConnectableContextMenu_blokk_Embed | GetConnectableContextMenu_blokk_Image | GetConnectableContextMenu_blokk_Link | GetConnectableContextMenu_blokk_PendingBlock | GetConnectableContextMenu_blokk_Text | GetConnectableContextMenu_blokk_Channel;

export interface GetConnectableContextMenu {
  blokk: GetConnectableContextMenu_blokk | null;
}

export interface GetConnectableContextMenuVariables {
  id: string;
}
