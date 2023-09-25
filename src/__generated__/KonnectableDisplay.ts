/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: KonnectableDisplay
// ====================================================

export interface KonnectableDisplay_PendingBlock_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface KonnectableDisplay_PendingBlock_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface KonnectableDisplay_PendingBlock_connection {
  __typename: "Connection";
  created_at: string;
  user: KonnectableDisplay_PendingBlock_connection_user | null;
}

export interface KonnectableDisplay_PendingBlock {
  __typename: "PendingBlock";
  id: number;
  updated_at: string;
  title: string;
  user: KonnectableDisplay_PendingBlock_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: KonnectableDisplay_PendingBlock_connection | null;
}

export interface KonnectableDisplay_Channel_counts {
  __typename: "ChannelCounts";
  contents: number;
}

export interface KonnectableDisplay_Channel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface KonnectableDisplay_Channel_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type KonnectableDisplay_Channel_owner = KonnectableDisplay_Channel_owner_Group | KonnectableDisplay_Channel_owner_User;

export interface KonnectableDisplay_Channel_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface KonnectableDisplay_Channel_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface KonnectableDisplay_Channel_connection {
  __typename: "Connection";
  created_at: string;
  user: KonnectableDisplay_Channel_connection_user | null;
}

export interface KonnectableDisplay_Channel {
  __typename: "Channel";
  id: number;
  href: string;
  truncatedTitle: string;
  visibility: string;
  updated_at: string;
  counts: KonnectableDisplay_Channel_counts;
  owner: KonnectableDisplay_Channel_owner;
  label: string;
  title: string;
  user: KonnectableDisplay_Channel_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: KonnectableDisplay_Channel_connection | null;
}

export interface KonnectableDisplay_Text_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface KonnectableDisplay_Text_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface KonnectableDisplay_Text_connection {
  __typename: "Connection";
  created_at: string;
  user: KonnectableDisplay_Text_connection_user | null;
}

export interface KonnectableDisplay_Text {
  __typename: "Text";
  id: number;
  title: string;
  href: string;
  content: string;
  raw: string;
  updated_at: string;
  user: KonnectableDisplay_Text_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: KonnectableDisplay_Text_connection | null;
}

export interface KonnectableDisplay_Image_original_dimensions {
  __typename: "Dimensions";
  width: number | null;
  height: number | null;
}

export interface KonnectableDisplay_Image_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface KonnectableDisplay_Image_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface KonnectableDisplay_Image_connection {
  __typename: "Connection";
  created_at: string;
  user: KonnectableDisplay_Image_connection_user | null;
}

export interface KonnectableDisplay_Image {
  __typename: "Image";
  id: number;
  title: string;
  href: string;
  alt_text: string | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  original_dimensions: KonnectableDisplay_Image_original_dimensions | null;
  updated_at: string;
  user: KonnectableDisplay_Image_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: KonnectableDisplay_Image_connection | null;
}

export interface KonnectableDisplay_Link_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface KonnectableDisplay_Link_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface KonnectableDisplay_Link_connection {
  __typename: "Connection";
  created_at: string;
  user: KonnectableDisplay_Link_connection_user | null;
}

export interface KonnectableDisplay_Link {
  __typename: "Link";
  id: number;
  href: string;
  title: string;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  external_url: string | null;
  content: string | null;
  updated_at: string;
  user: KonnectableDisplay_Link_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: KonnectableDisplay_Link_connection | null;
  source_url: string | null;
}

export interface KonnectableDisplay_Embed_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface KonnectableDisplay_Embed_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface KonnectableDisplay_Embed_connection {
  __typename: "Connection";
  created_at: string;
  user: KonnectableDisplay_Embed_connection_user | null;
}

export interface KonnectableDisplay_Embed {
  __typename: "Embed";
  id: number;
  title: string;
  href: string;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  updated_at: string;
  user: KonnectableDisplay_Embed_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: KonnectableDisplay_Embed_connection | null;
}

export interface KonnectableDisplay_Attachment_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface KonnectableDisplay_Attachment_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface KonnectableDisplay_Attachment_connection {
  __typename: "Connection";
  created_at: string;
  user: KonnectableDisplay_Attachment_connection_user | null;
}

export interface KonnectableDisplay_Attachment {
  __typename: "Attachment";
  id: number;
  title: string;
  href: string;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  file_extension: string | null;
  updated_at: string;
  user: KonnectableDisplay_Attachment_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: KonnectableDisplay_Attachment_connection | null;
}

export type KonnectableDisplay = KonnectableDisplay_PendingBlock | KonnectableDisplay_Channel | KonnectableDisplay_Text | KonnectableDisplay_Image | KonnectableDisplay_Link | KonnectableDisplay_Embed | KonnectableDisplay_Attachment;
