/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ConnectableTypeEnum, SearchSorts, SortDirection } from "./globalTypes";

// ====================================================
// GraphQL query operation: ProfileTableContents
// ====================================================

export interface ProfileTableContents_user_contents_PendingBlock_user {
  __typename: "User";
  name: string;
}

export interface ProfileTableContents_user_contents_PendingBlock_connection_can {
  __typename: "ConnectionCan";
  manage: boolean | null;
  remove: boolean | null;
  destroy: boolean | null;
}

export interface ProfileTableContents_user_contents_PendingBlock_connection {
  __typename: "Connection";
  id: number;
  created_at: string | null;
  selected: boolean;
  can: ProfileTableContents_user_contents_PendingBlock_connection_can | null;
}

export interface ProfileTableContents_user_contents_PendingBlock_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface ProfileTableContents_user_contents_PendingBlock_can {
  __typename: "BlockCan";
  remove: boolean | null;
  manage: boolean | null;
  mute: boolean | null;
}

export interface ProfileTableContents_user_contents_PendingBlock {
  __typename: "PendingBlock";
  id: number;
  created_at: string | null;
  updated_at: string | null;
  title: string;
  user: ProfileTableContents_user_contents_PendingBlock_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileTableContents_user_contents_PendingBlock_connection | null;
  href: string | null;
  counts: ProfileTableContents_user_contents_PendingBlock_counts | null;
  can: ProfileTableContents_user_contents_PendingBlock_can | null;
}

export interface ProfileTableContents_user_contents_Attachment_user {
  __typename: "User";
  name: string;
}

export interface ProfileTableContents_user_contents_Attachment_connection_can {
  __typename: "ConnectionCan";
  manage: boolean | null;
  remove: boolean | null;
  destroy: boolean | null;
}

export interface ProfileTableContents_user_contents_Attachment_connection {
  __typename: "Connection";
  id: number;
  created_at: string | null;
  selected: boolean;
  can: ProfileTableContents_user_contents_Attachment_connection_can | null;
}

export interface ProfileTableContents_user_contents_Attachment_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface ProfileTableContents_user_contents_Attachment_can {
  __typename: "BlockCan";
  remove: boolean | null;
  manage: boolean | null;
  mute: boolean | null;
}

export interface ProfileTableContents_user_contents_Attachment_source {
  __typename: "ConnectableSource";
  url: string | null;
  provider_url: string | null;
}

export interface ProfileTableContents_user_contents_Attachment {
  __typename: "Attachment";
  id: number;
  created_at: string | null;
  updated_at: string | null;
  title: string;
  user: ProfileTableContents_user_contents_Attachment_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileTableContents_user_contents_Attachment_connection | null;
  counts: ProfileTableContents_user_contents_Attachment_counts | null;
  can: ProfileTableContents_user_contents_Attachment_can | null;
  file_url: string | null;
  image_url: string | null;
  href: string | null;
  source: ProfileTableContents_user_contents_Attachment_source | null;
}

export interface ProfileTableContents_user_contents_Embed_user {
  __typename: "User";
  name: string;
}

export interface ProfileTableContents_user_contents_Embed_connection_can {
  __typename: "ConnectionCan";
  manage: boolean | null;
  remove: boolean | null;
  destroy: boolean | null;
}

export interface ProfileTableContents_user_contents_Embed_connection {
  __typename: "Connection";
  id: number;
  created_at: string | null;
  selected: boolean;
  can: ProfileTableContents_user_contents_Embed_connection_can | null;
}

export interface ProfileTableContents_user_contents_Embed_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface ProfileTableContents_user_contents_Embed_can {
  __typename: "BlockCan";
  remove: boolean | null;
  manage: boolean | null;
  mute: boolean | null;
}

export interface ProfileTableContents_user_contents_Embed_source {
  __typename: "ConnectableSource";
  url: string | null;
  provider_url: string | null;
}

export interface ProfileTableContents_user_contents_Embed {
  __typename: "Embed";
  id: number;
  created_at: string | null;
  updated_at: string | null;
  title: string;
  user: ProfileTableContents_user_contents_Embed_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileTableContents_user_contents_Embed_connection | null;
  counts: ProfileTableContents_user_contents_Embed_counts | null;
  can: ProfileTableContents_user_contents_Embed_can | null;
  embed_html: string | null;
  image_url: string | null;
  href: string | null;
  source: ProfileTableContents_user_contents_Embed_source | null;
}

export interface ProfileTableContents_user_contents_Image_user {
  __typename: "User";
  name: string;
}

export interface ProfileTableContents_user_contents_Image_connection_can {
  __typename: "ConnectionCan";
  manage: boolean | null;
  remove: boolean | null;
  destroy: boolean | null;
}

export interface ProfileTableContents_user_contents_Image_connection {
  __typename: "Connection";
  id: number;
  created_at: string | null;
  selected: boolean;
  can: ProfileTableContents_user_contents_Image_connection_can | null;
}

export interface ProfileTableContents_user_contents_Image_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface ProfileTableContents_user_contents_Image_can {
  __typename: "BlockCan";
  remove: boolean | null;
  manage: boolean | null;
  mute: boolean | null;
}

export interface ProfileTableContents_user_contents_Image_source {
  __typename: "ConnectableSource";
  url: string | null;
  provider_url: string | null;
}

export interface ProfileTableContents_user_contents_Image {
  __typename: "Image";
  id: number;
  created_at: string | null;
  updated_at: string | null;
  title: string;
  user: ProfileTableContents_user_contents_Image_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileTableContents_user_contents_Image_connection | null;
  counts: ProfileTableContents_user_contents_Image_counts | null;
  can: ProfileTableContents_user_contents_Image_can | null;
  image_url: string | null;
  href: string | null;
  /**
   * URL to find the original image on various services
   */
  find_original_url: string | null;
  source: ProfileTableContents_user_contents_Image_source | null;
}

export interface ProfileTableContents_user_contents_Link_user {
  __typename: "User";
  name: string;
}

export interface ProfileTableContents_user_contents_Link_connection_can {
  __typename: "ConnectionCan";
  manage: boolean | null;
  remove: boolean | null;
  destroy: boolean | null;
}

export interface ProfileTableContents_user_contents_Link_connection {
  __typename: "Connection";
  id: number;
  created_at: string | null;
  selected: boolean;
  can: ProfileTableContents_user_contents_Link_connection_can | null;
}

export interface ProfileTableContents_user_contents_Link_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface ProfileTableContents_user_contents_Link_can {
  __typename: "BlockCan";
  remove: boolean | null;
  manage: boolean | null;
  mute: boolean | null;
}

export interface ProfileTableContents_user_contents_Link_source {
  __typename: "ConnectableSource";
  url: string | null;
  provider_url: string | null;
}

export interface ProfileTableContents_user_contents_Link {
  __typename: "Link";
  id: number;
  created_at: string | null;
  updated_at: string | null;
  title: string;
  user: ProfileTableContents_user_contents_Link_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileTableContents_user_contents_Link_connection | null;
  counts: ProfileTableContents_user_contents_Link_counts | null;
  can: ProfileTableContents_user_contents_Link_can | null;
  image_url: string | null;
  href: string | null;
  source: ProfileTableContents_user_contents_Link_source | null;
}

export interface ProfileTableContents_user_contents_Text_user {
  __typename: "User";
  name: string;
}

export interface ProfileTableContents_user_contents_Text_connection_can {
  __typename: "ConnectionCan";
  manage: boolean | null;
  remove: boolean | null;
  destroy: boolean | null;
}

export interface ProfileTableContents_user_contents_Text_connection {
  __typename: "Connection";
  id: number;
  created_at: string | null;
  selected: boolean;
  can: ProfileTableContents_user_contents_Text_connection_can | null;
}

export interface ProfileTableContents_user_contents_Text_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface ProfileTableContents_user_contents_Text_can {
  __typename: "BlockCan";
  remove: boolean | null;
  manage: boolean | null;
  mute: boolean | null;
}

export interface ProfileTableContents_user_contents_Text_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ProfileTableContents_user_contents_Text {
  __typename: "Text";
  id: number;
  created_at: string | null;
  updated_at: string | null;
  title: string;
  user: ProfileTableContents_user_contents_Text_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileTableContents_user_contents_Text_connection | null;
  counts: ProfileTableContents_user_contents_Text_counts | null;
  can: ProfileTableContents_user_contents_Text_can | null;
  content: string;
  html: string;
  /**
   * URL to find the original image on various services
   */
  find_original_url: string | null;
  href: string | null;
  source: ProfileTableContents_user_contents_Text_source | null;
}

export interface ProfileTableContents_user_contents_Channel_user {
  __typename: "User";
  name: string;
}

export interface ProfileTableContents_user_contents_Channel_connection_can {
  __typename: "ConnectionCan";
  manage: boolean | null;
  remove: boolean | null;
  destroy: boolean | null;
}

export interface ProfileTableContents_user_contents_Channel_connection {
  __typename: "Connection";
  id: number;
  created_at: string | null;
  selected: boolean;
  can: ProfileTableContents_user_contents_Channel_connection_can | null;
}

export interface ProfileTableContents_user_contents_Channel_counts {
  __typename: "ChannelCounts";
  connected_to_channels: number | null;
  contents: number | null;
}

export interface ProfileTableContents_user_contents_Channel_can {
  __typename: "ChannelCan";
  update: boolean | null;
  manage: boolean | null;
  mute: boolean | null;
}

export interface ProfileTableContents_user_contents_Channel {
  __typename: "Channel";
  id: number;
  created_at: string | null;
  updated_at: string | null;
  title: string;
  user: ProfileTableContents_user_contents_Channel_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileTableContents_user_contents_Channel_connection | null;
  visibility: string;
  href: string | null;
  counts: ProfileTableContents_user_contents_Channel_counts | null;
  can: ProfileTableContents_user_contents_Channel_can | null;
}

export type ProfileTableContents_user_contents = ProfileTableContents_user_contents_PendingBlock | ProfileTableContents_user_contents_Attachment | ProfileTableContents_user_contents_Embed | ProfileTableContents_user_contents_Image | ProfileTableContents_user_contents_Link | ProfileTableContents_user_contents_Text | ProfileTableContents_user_contents_Channel;

export interface ProfileTableContents_user {
  __typename: "User";
  id: number;
  name: string;
  contents: ProfileTableContents_user_contents[] | null;
}

export interface ProfileTableContents {
  /**
   * A single user
   */
  user: ProfileTableContents_user | null;
}

export interface ProfileTableContentsVariables {
  id: string;
  type?: ConnectableTypeEnum | null;
  page?: number | null;
  per?: number | null;
  sort?: SearchSorts | null;
  direction?: SortDirection | null;
  q?: string | null;
  seed?: number | null;
  includeConnection: boolean;
}
