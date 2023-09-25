/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Blokk
// ====================================================

export interface Blokk_blokk_Attachment_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface Blokk_blokk_Attachment_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface Blokk_blokk_Attachment_connection {
  __typename: "Connection";
  created_at: string;
  user: Blokk_blokk_Attachment_connection_user | null;
}

export interface Blokk_blokk_Attachment_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface Blokk_blokk_Attachment_counts {
  __typename: "BlockCounts";
  comments: number;
}

export interface Blokk_blokk_Attachment {
  __typename: "Attachment";
  id: number;
  href: string;
  updated_at: string;
  title: string;
  user: Blokk_blokk_Attachment_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: Blokk_blokk_Attachment_connection | null;
  source: Blokk_blokk_Attachment_source | null;
  counts: Blokk_blokk_Attachment_counts;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  file_extension: string | null;
}

export interface Blokk_blokk_Embed_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface Blokk_blokk_Embed_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface Blokk_blokk_Embed_connection {
  __typename: "Connection";
  created_at: string;
  user: Blokk_blokk_Embed_connection_user | null;
}

export interface Blokk_blokk_Embed_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface Blokk_blokk_Embed_counts {
  __typename: "BlockCounts";
  comments: number;
}

export interface Blokk_blokk_Embed {
  __typename: "Embed";
  id: number;
  href: string;
  updated_at: string;
  title: string;
  user: Blokk_blokk_Embed_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: Blokk_blokk_Embed_connection | null;
  source: Blokk_blokk_Embed_source | null;
  counts: Blokk_blokk_Embed_counts;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
}

export interface Blokk_blokk_Image_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface Blokk_blokk_Image_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface Blokk_blokk_Image_connection {
  __typename: "Connection";
  created_at: string;
  user: Blokk_blokk_Image_connection_user | null;
}

export interface Blokk_blokk_Image_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface Blokk_blokk_Image_counts {
  __typename: "BlockCounts";
  comments: number;
}

export interface Blokk_blokk_Image_original_dimensions {
  __typename: "Dimensions";
  width: number | null;
  height: number | null;
}

export interface Blokk_blokk_Image {
  __typename: "Image";
  id: number;
  href: string;
  updated_at: string;
  title: string;
  user: Blokk_blokk_Image_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: Blokk_blokk_Image_connection | null;
  source: Blokk_blokk_Image_source | null;
  counts: Blokk_blokk_Image_counts;
  alt_text: string | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  original_dimensions: Blokk_blokk_Image_original_dimensions | null;
}

export interface Blokk_blokk_Link_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface Blokk_blokk_Link_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface Blokk_blokk_Link_connection {
  __typename: "Connection";
  created_at: string;
  user: Blokk_blokk_Link_connection_user | null;
}

export interface Blokk_blokk_Link_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface Blokk_blokk_Link_counts {
  __typename: "BlockCounts";
  comments: number;
}

export interface Blokk_blokk_Link {
  __typename: "Link";
  id: number;
  href: string;
  updated_at: string;
  title: string;
  user: Blokk_blokk_Link_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: Blokk_blokk_Link_connection | null;
  source: Blokk_blokk_Link_source | null;
  counts: Blokk_blokk_Link_counts;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  external_url: string | null;
  content: string | null;
  source_url: string | null;
}

export interface Blokk_blokk_PendingBlock_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface Blokk_blokk_PendingBlock_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface Blokk_blokk_PendingBlock_connection {
  __typename: "Connection";
  created_at: string;
  user: Blokk_blokk_PendingBlock_connection_user | null;
}

export interface Blokk_blokk_PendingBlock_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface Blokk_blokk_PendingBlock_counts {
  __typename: "BlockCounts";
  comments: number;
}

export interface Blokk_blokk_PendingBlock {
  __typename: "PendingBlock";
  id: number;
  href: string;
  updated_at: string;
  title: string;
  user: Blokk_blokk_PendingBlock_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: Blokk_blokk_PendingBlock_connection | null;
  source: Blokk_blokk_PendingBlock_source | null;
  counts: Blokk_blokk_PendingBlock_counts;
}

export interface Blokk_blokk_Text_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface Blokk_blokk_Text_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface Blokk_blokk_Text_connection {
  __typename: "Connection";
  created_at: string;
  user: Blokk_blokk_Text_connection_user | null;
}

export interface Blokk_blokk_Text_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface Blokk_blokk_Text_counts {
  __typename: "BlockCounts";
  comments: number;
}

export interface Blokk_blokk_Text {
  __typename: "Text";
  id: number;
  href: string;
  updated_at: string;
  title: string;
  user: Blokk_blokk_Text_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: Blokk_blokk_Text_connection | null;
  source: Blokk_blokk_Text_source | null;
  counts: Blokk_blokk_Text_counts;
  content: string;
  raw: string;
}

export interface Blokk_blokk_Channel_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface Blokk_blokk_Channel_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface Blokk_blokk_Channel_connection {
  __typename: "Connection";
  created_at: string;
  user: Blokk_blokk_Channel_connection_user | null;
}

export interface Blokk_blokk_Channel_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface Blokk_blokk_Channel_counts {
  __typename: "ChannelCounts";
  contents: number;
}

export interface Blokk_blokk_Channel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface Blokk_blokk_Channel_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type Blokk_blokk_Channel_owner = Blokk_blokk_Channel_owner_Group | Blokk_blokk_Channel_owner_User;

export interface Blokk_blokk_Channel {
  __typename: "Channel";
  id: number;
  href: string;
  updated_at: string;
  title: string;
  user: Blokk_blokk_Channel_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: Blokk_blokk_Channel_connection | null;
  source: Blokk_blokk_Channel_source | null;
  truncatedTitle: string;
  visibility: string;
  counts: Blokk_blokk_Channel_counts;
  owner: Blokk_blokk_Channel_owner;
  label: string;
}

export type Blokk_blokk = Blokk_blokk_Attachment | Blokk_blokk_Embed | Blokk_blokk_Image | Blokk_blokk_Link | Blokk_blokk_PendingBlock | Blokk_blokk_Text | Blokk_blokk_Channel;

export interface Blokk {
  blokk: Blokk_blokk | null;
}

export interface BlokkVariables {
  id: string;
}
