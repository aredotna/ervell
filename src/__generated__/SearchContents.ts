/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SsearchType, BlockFilterEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: SearchContents
// ====================================================

export interface SearchContents_contents_Attachment_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface SearchContents_contents_Attachment_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface SearchContents_contents_Attachment_connection {
  __typename: "Connection";
  created_at: string;
  user: SearchContents_contents_Attachment_connection_user | null;
}

export interface SearchContents_contents_Attachment_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface SearchContents_contents_Attachment_counts {
  __typename: "BlockCounts";
  comments: number;
}

export interface SearchContents_contents_Attachment {
  __typename: "Attachment";
  id: number;
  href: string;
  updated_at: string;
  title: string;
  user: SearchContents_contents_Attachment_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: SearchContents_contents_Attachment_connection | null;
  source: SearchContents_contents_Attachment_source | null;
  counts: SearchContents_contents_Attachment_counts;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  file_extension: string | null;
}

export interface SearchContents_contents_Channel_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface SearchContents_contents_Channel_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface SearchContents_contents_Channel_connection {
  __typename: "Connection";
  created_at: string;
  user: SearchContents_contents_Channel_connection_user | null;
}

export interface SearchContents_contents_Channel_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface SearchContents_contents_Channel_counts {
  __typename: "ChannelCounts";
  contents: number;
}

export interface SearchContents_contents_Channel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface SearchContents_contents_Channel_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type SearchContents_contents_Channel_owner = SearchContents_contents_Channel_owner_Group | SearchContents_contents_Channel_owner_User;

export interface SearchContents_contents_Channel {
  __typename: "Channel";
  id: number;
  href: string;
  updated_at: string;
  title: string;
  user: SearchContents_contents_Channel_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: SearchContents_contents_Channel_connection | null;
  source: SearchContents_contents_Channel_source | null;
  truncatedTitle: string;
  visibility: string;
  counts: SearchContents_contents_Channel_counts;
  owner: SearchContents_contents_Channel_owner;
  label: string;
}

export interface SearchContents_contents_Embed_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface SearchContents_contents_Embed_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface SearchContents_contents_Embed_connection {
  __typename: "Connection";
  created_at: string;
  user: SearchContents_contents_Embed_connection_user | null;
}

export interface SearchContents_contents_Embed_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface SearchContents_contents_Embed_counts {
  __typename: "BlockCounts";
  comments: number;
}

export interface SearchContents_contents_Embed {
  __typename: "Embed";
  id: number;
  href: string;
  updated_at: string;
  title: string;
  user: SearchContents_contents_Embed_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: SearchContents_contents_Embed_connection | null;
  source: SearchContents_contents_Embed_source | null;
  counts: SearchContents_contents_Embed_counts;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
}

export interface SearchContents_contents_Image_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface SearchContents_contents_Image_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface SearchContents_contents_Image_connection {
  __typename: "Connection";
  created_at: string;
  user: SearchContents_contents_Image_connection_user | null;
}

export interface SearchContents_contents_Image_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface SearchContents_contents_Image_counts {
  __typename: "BlockCounts";
  comments: number;
}

export interface SearchContents_contents_Image_original_dimensions {
  __typename: "Dimensions";
  width: number | null;
  height: number | null;
}

export interface SearchContents_contents_Image {
  __typename: "Image";
  id: number;
  href: string;
  updated_at: string;
  title: string;
  user: SearchContents_contents_Image_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: SearchContents_contents_Image_connection | null;
  source: SearchContents_contents_Image_source | null;
  counts: SearchContents_contents_Image_counts;
  alt_text: string | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  original_dimensions: SearchContents_contents_Image_original_dimensions | null;
}

export interface SearchContents_contents_Link_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface SearchContents_contents_Link_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface SearchContents_contents_Link_connection {
  __typename: "Connection";
  created_at: string;
  user: SearchContents_contents_Link_connection_user | null;
}

export interface SearchContents_contents_Link_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface SearchContents_contents_Link_counts {
  __typename: "BlockCounts";
  comments: number;
}

export interface SearchContents_contents_Link {
  __typename: "Link";
  id: number;
  href: string;
  updated_at: string;
  title: string;
  user: SearchContents_contents_Link_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: SearchContents_contents_Link_connection | null;
  source: SearchContents_contents_Link_source | null;
  counts: SearchContents_contents_Link_counts;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  external_url: string | null;
  content: string | null;
  source_url: string | null;
}

export interface SearchContents_contents_PendingBlock_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface SearchContents_contents_PendingBlock_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface SearchContents_contents_PendingBlock_connection {
  __typename: "Connection";
  created_at: string;
  user: SearchContents_contents_PendingBlock_connection_user | null;
}

export interface SearchContents_contents_PendingBlock_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface SearchContents_contents_PendingBlock_counts {
  __typename: "BlockCounts";
  comments: number;
}

export interface SearchContents_contents_PendingBlock {
  __typename: "PendingBlock";
  id: number;
  href: string;
  updated_at: string;
  title: string;
  user: SearchContents_contents_PendingBlock_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: SearchContents_contents_PendingBlock_connection | null;
  source: SearchContents_contents_PendingBlock_source | null;
  counts: SearchContents_contents_PendingBlock_counts;
}

export interface SearchContents_contents_Text_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface SearchContents_contents_Text_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface SearchContents_contents_Text_connection {
  __typename: "Connection";
  created_at: string;
  user: SearchContents_contents_Text_connection_user | null;
}

export interface SearchContents_contents_Text_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface SearchContents_contents_Text_counts {
  __typename: "BlockCounts";
  comments: number;
}

export interface SearchContents_contents_Text {
  __typename: "Text";
  id: number;
  href: string;
  updated_at: string;
  title: string;
  user: SearchContents_contents_Text_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: SearchContents_contents_Text_connection | null;
  source: SearchContents_contents_Text_source | null;
  counts: SearchContents_contents_Text_counts;
  content: string;
  raw: string;
}

export interface SearchContents_contents_Group {
  __typename: "Group";
  id: number;
  name: string;
  href: string;
  visibility: string;
  label: string;
  initials: string;
  avatar: string | null;
}

export interface SearchContents_contents_User {
  __typename: "User";
  id: number;
  name: string;
  href: string;
  label: string;
  initials: string;
  avatar: string | null;
}

export type SearchContents_contents = SearchContents_contents_Attachment | SearchContents_contents_Channel | SearchContents_contents_Embed | SearchContents_contents_Image | SearchContents_contents_Link | SearchContents_contents_PendingBlock | SearchContents_contents_Text | SearchContents_contents_Group | SearchContents_contents_User;

export interface SearchContents {
  contents: SearchContents_contents[] | null;
}

export interface SearchContentsVariables {
  type?: (SsearchType | null)[] | null;
  page?: number | null;
  per?: number | null;
  q: string;
  block_filter?: BlockFilterEnum | null;
}
