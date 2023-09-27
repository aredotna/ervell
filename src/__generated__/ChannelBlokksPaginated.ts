/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ChannelBlokksPaginated
// ====================================================

export interface ChannelBlokksPaginated_channel_blokks_Attachment_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelBlokksPaginated_channel_blokks_Attachment_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelBlokksPaginated_channel_blokks_Attachment_connection {
  __typename: "Connection";
  created_at: string;
  user: ChannelBlokksPaginated_channel_blokks_Attachment_connection_user | null;
}

export interface ChannelBlokksPaginated_channel_blokks_Attachment_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelBlokksPaginated_channel_blokks_Attachment_counts {
  __typename: "BlockCounts";
  comments: number;
}

export interface ChannelBlokksPaginated_channel_blokks_Attachment {
  __typename: "Attachment";
  id: number;
  href: string;
  updated_at: string;
  title: string;
  user: ChannelBlokksPaginated_channel_blokks_Attachment_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelBlokksPaginated_channel_blokks_Attachment_connection | null;
  source: ChannelBlokksPaginated_channel_blokks_Attachment_source | null;
  counts: ChannelBlokksPaginated_channel_blokks_Attachment_counts;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  file_extension: string | null;
}

export interface ChannelBlokksPaginated_channel_blokks_Embed_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelBlokksPaginated_channel_blokks_Embed_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelBlokksPaginated_channel_blokks_Embed_connection {
  __typename: "Connection";
  created_at: string;
  user: ChannelBlokksPaginated_channel_blokks_Embed_connection_user | null;
}

export interface ChannelBlokksPaginated_channel_blokks_Embed_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelBlokksPaginated_channel_blokks_Embed_counts {
  __typename: "BlockCounts";
  comments: number;
}

export interface ChannelBlokksPaginated_channel_blokks_Embed {
  __typename: "Embed";
  id: number;
  href: string;
  updated_at: string;
  title: string;
  user: ChannelBlokksPaginated_channel_blokks_Embed_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelBlokksPaginated_channel_blokks_Embed_connection | null;
  source: ChannelBlokksPaginated_channel_blokks_Embed_source | null;
  counts: ChannelBlokksPaginated_channel_blokks_Embed_counts;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
}

export interface ChannelBlokksPaginated_channel_blokks_Image_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelBlokksPaginated_channel_blokks_Image_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelBlokksPaginated_channel_blokks_Image_connection {
  __typename: "Connection";
  created_at: string;
  user: ChannelBlokksPaginated_channel_blokks_Image_connection_user | null;
}

export interface ChannelBlokksPaginated_channel_blokks_Image_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelBlokksPaginated_channel_blokks_Image_counts {
  __typename: "BlockCounts";
  comments: number;
}

export interface ChannelBlokksPaginated_channel_blokks_Image_original_dimensions {
  __typename: "Dimensions";
  width: number | null;
  height: number | null;
}

export interface ChannelBlokksPaginated_channel_blokks_Image {
  __typename: "Image";
  id: number;
  href: string;
  updated_at: string;
  title: string;
  user: ChannelBlokksPaginated_channel_blokks_Image_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelBlokksPaginated_channel_blokks_Image_connection | null;
  source: ChannelBlokksPaginated_channel_blokks_Image_source | null;
  counts: ChannelBlokksPaginated_channel_blokks_Image_counts;
  alt_text: string | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  original_dimensions: ChannelBlokksPaginated_channel_blokks_Image_original_dimensions | null;
}

export interface ChannelBlokksPaginated_channel_blokks_Link_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelBlokksPaginated_channel_blokks_Link_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelBlokksPaginated_channel_blokks_Link_connection {
  __typename: "Connection";
  created_at: string;
  user: ChannelBlokksPaginated_channel_blokks_Link_connection_user | null;
}

export interface ChannelBlokksPaginated_channel_blokks_Link_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelBlokksPaginated_channel_blokks_Link_counts {
  __typename: "BlockCounts";
  comments: number;
}

export interface ChannelBlokksPaginated_channel_blokks_Link {
  __typename: "Link";
  id: number;
  href: string;
  updated_at: string;
  title: string;
  user: ChannelBlokksPaginated_channel_blokks_Link_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelBlokksPaginated_channel_blokks_Link_connection | null;
  source: ChannelBlokksPaginated_channel_blokks_Link_source | null;
  counts: ChannelBlokksPaginated_channel_blokks_Link_counts;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  external_url: string | null;
  content: string | null;
  source_url: string | null;
}

export interface ChannelBlokksPaginated_channel_blokks_PendingBlock_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelBlokksPaginated_channel_blokks_PendingBlock_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelBlokksPaginated_channel_blokks_PendingBlock_connection {
  __typename: "Connection";
  created_at: string;
  user: ChannelBlokksPaginated_channel_blokks_PendingBlock_connection_user | null;
}

export interface ChannelBlokksPaginated_channel_blokks_PendingBlock_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelBlokksPaginated_channel_blokks_PendingBlock_counts {
  __typename: "BlockCounts";
  comments: number;
}

export interface ChannelBlokksPaginated_channel_blokks_PendingBlock {
  __typename: "PendingBlock";
  id: number;
  href: string;
  updated_at: string;
  title: string;
  user: ChannelBlokksPaginated_channel_blokks_PendingBlock_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelBlokksPaginated_channel_blokks_PendingBlock_connection | null;
  source: ChannelBlokksPaginated_channel_blokks_PendingBlock_source | null;
  counts: ChannelBlokksPaginated_channel_blokks_PendingBlock_counts;
}

export interface ChannelBlokksPaginated_channel_blokks_Text_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelBlokksPaginated_channel_blokks_Text_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelBlokksPaginated_channel_blokks_Text_connection {
  __typename: "Connection";
  created_at: string;
  user: ChannelBlokksPaginated_channel_blokks_Text_connection_user | null;
}

export interface ChannelBlokksPaginated_channel_blokks_Text_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelBlokksPaginated_channel_blokks_Text_counts {
  __typename: "BlockCounts";
  comments: number;
}

export interface ChannelBlokksPaginated_channel_blokks_Text {
  __typename: "Text";
  id: number;
  href: string;
  updated_at: string;
  title: string;
  user: ChannelBlokksPaginated_channel_blokks_Text_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelBlokksPaginated_channel_blokks_Text_connection | null;
  source: ChannelBlokksPaginated_channel_blokks_Text_source | null;
  counts: ChannelBlokksPaginated_channel_blokks_Text_counts;
  content: string;
  raw: string;
}

export interface ChannelBlokksPaginated_channel_blokks_Channel_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelBlokksPaginated_channel_blokks_Channel_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelBlokksPaginated_channel_blokks_Channel_connection {
  __typename: "Connection";
  created_at: string;
  user: ChannelBlokksPaginated_channel_blokks_Channel_connection_user | null;
}

export interface ChannelBlokksPaginated_channel_blokks_Channel_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelBlokksPaginated_channel_blokks_Channel_counts {
  __typename: "ChannelCounts";
  contents: number;
}

export interface ChannelBlokksPaginated_channel_blokks_Channel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface ChannelBlokksPaginated_channel_blokks_Channel_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type ChannelBlokksPaginated_channel_blokks_Channel_owner = ChannelBlokksPaginated_channel_blokks_Channel_owner_Group | ChannelBlokksPaginated_channel_blokks_Channel_owner_User;

export interface ChannelBlokksPaginated_channel_blokks_Channel {
  __typename: "Channel";
  id: number;
  href: string;
  updated_at: string;
  title: string;
  user: ChannelBlokksPaginated_channel_blokks_Channel_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelBlokksPaginated_channel_blokks_Channel_connection | null;
  source: ChannelBlokksPaginated_channel_blokks_Channel_source | null;
  truncatedTitle: string;
  visibility: string;
  counts: ChannelBlokksPaginated_channel_blokks_Channel_counts;
  owner: ChannelBlokksPaginated_channel_blokks_Channel_owner;
  label: string;
}

export type ChannelBlokksPaginated_channel_blokks = ChannelBlokksPaginated_channel_blokks_Attachment | ChannelBlokksPaginated_channel_blokks_Embed | ChannelBlokksPaginated_channel_blokks_Image | ChannelBlokksPaginated_channel_blokks_Link | ChannelBlokksPaginated_channel_blokks_PendingBlock | ChannelBlokksPaginated_channel_blokks_Text | ChannelBlokksPaginated_channel_blokks_Channel;

export interface ChannelBlokksPaginated_channel_counts {
  __typename: "ChannelCounts";
  contents: number;
  blocks: number;
  channels: number;
}

export interface ChannelBlokksPaginated_channel {
  __typename: "Channel";
  id: number;
  blokks: ChannelBlokksPaginated_channel_blokks[];
  counts: ChannelBlokksPaginated_channel_counts;
}

export interface ChannelBlokksPaginated {
  /**
   * A single channel
   */
  channel: ChannelBlokksPaginated_channel | null;
}

export interface ChannelBlokksPaginatedVariables {
  id: string;
  page: number;
  per: number;
}
