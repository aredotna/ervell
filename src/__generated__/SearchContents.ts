/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SsearchType, BlockFilterEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: SearchContents
// ====================================================

export interface SearchContents_contents_Channel_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface SearchContents_contents_Channel_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface SearchContents_contents_Channel_connection {
  __typename: "Connection";
  created_at: string | null;
  user: SearchContents_contents_Channel_connection_user | null;
}

export interface SearchContents_contents_Channel_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface SearchContents_contents_Channel_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface SearchContents_contents_Channel_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  visibility: string | null;
}

export interface SearchContents_contents_Channel_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export type SearchContents_contents_Channel_owner = SearchContents_contents_Channel_owner_Group | SearchContents_contents_Channel_owner_User;

export interface SearchContents_contents_Channel {
  __typename: "Channel";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: SearchContents_contents_Channel_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: SearchContents_contents_Channel_connection | null;
  source: SearchContents_contents_Channel_source | null;
  truncatedTitle: string | null;
  visibility: string | null;
  counts: SearchContents_contents_Channel_counts | null;
  owner: SearchContents_contents_Channel_owner | null;
  label: string | null;
}

export interface SearchContents_contents_Text_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface SearchContents_contents_Text_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface SearchContents_contents_Text_connection {
  __typename: "Connection";
  created_at: string | null;
  user: SearchContents_contents_Text_connection_user | null;
}

export interface SearchContents_contents_Text_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface SearchContents_contents_Text_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface SearchContents_contents_Text {
  __typename: "Text";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: SearchContents_contents_Text_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: SearchContents_contents_Text_connection | null;
  source: SearchContents_contents_Text_source | null;
  counts: SearchContents_contents_Text_counts | null;
  content: string | null;
}

export interface SearchContents_contents_Image_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface SearchContents_contents_Image_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface SearchContents_contents_Image_connection {
  __typename: "Connection";
  created_at: string | null;
  user: SearchContents_contents_Image_connection_user | null;
}

export interface SearchContents_contents_Image_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface SearchContents_contents_Image_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface SearchContents_contents_Image_original_dimensions {
  __typename: "Dimensions";
  width: number | null;
  height: number | null;
}

export interface SearchContents_contents_Image {
  __typename: "Image";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: SearchContents_contents_Image_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: SearchContents_contents_Image_connection | null;
  source: SearchContents_contents_Image_source | null;
  counts: SearchContents_contents_Image_counts | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  original_dimensions: SearchContents_contents_Image_original_dimensions | null;
}

export interface SearchContents_contents_Link_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface SearchContents_contents_Link_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface SearchContents_contents_Link_connection {
  __typename: "Connection";
  created_at: string | null;
  user: SearchContents_contents_Link_connection_user | null;
}

export interface SearchContents_contents_Link_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface SearchContents_contents_Link_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface SearchContents_contents_Link {
  __typename: "Link";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: SearchContents_contents_Link_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: SearchContents_contents_Link_connection | null;
  source: SearchContents_contents_Link_source | null;
  counts: SearchContents_contents_Link_counts | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  external_url: string | null;
}

export interface SearchContents_contents_Embed_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface SearchContents_contents_Embed_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface SearchContents_contents_Embed_connection {
  __typename: "Connection";
  created_at: string | null;
  user: SearchContents_contents_Embed_connection_user | null;
}

export interface SearchContents_contents_Embed_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface SearchContents_contents_Embed_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface SearchContents_contents_Embed {
  __typename: "Embed";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: SearchContents_contents_Embed_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: SearchContents_contents_Embed_connection | null;
  source: SearchContents_contents_Embed_source | null;
  counts: SearchContents_contents_Embed_counts | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
}

export interface SearchContents_contents_Attachment_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface SearchContents_contents_Attachment_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface SearchContents_contents_Attachment_connection {
  __typename: "Connection";
  created_at: string | null;
  user: SearchContents_contents_Attachment_connection_user | null;
}

export interface SearchContents_contents_Attachment_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface SearchContents_contents_Attachment_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface SearchContents_contents_Attachment {
  __typename: "Attachment";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: SearchContents_contents_Attachment_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: SearchContents_contents_Attachment_connection | null;
  source: SearchContents_contents_Attachment_source | null;
  counts: SearchContents_contents_Attachment_counts | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  file_extension: string | null;
}

export interface SearchContents_contents_PendingBlock_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface SearchContents_contents_PendingBlock_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface SearchContents_contents_PendingBlock_connection {
  __typename: "Connection";
  created_at: string | null;
  user: SearchContents_contents_PendingBlock_connection_user | null;
}

export interface SearchContents_contents_PendingBlock_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface SearchContents_contents_PendingBlock_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface SearchContents_contents_PendingBlock {
  __typename: "PendingBlock";
  id: number | null;
  href: string | null;
  updated_at: string | null;
  title: string | null;
  user: SearchContents_contents_PendingBlock_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: SearchContents_contents_PendingBlock_connection | null;
  source: SearchContents_contents_PendingBlock_source | null;
  counts: SearchContents_contents_PendingBlock_counts | null;
}

export interface SearchContents_contents_User {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
  label: string | null;
  initials: string | null;
  avatar: string | null;
}

export interface SearchContents_contents_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  href: string | null;
  visibility: string | null;
  label: string | null;
  initials: string | null;
  avatar: string | null;
}

export type SearchContents_contents = SearchContents_contents_Channel | SearchContents_contents_Text | SearchContents_contents_Image | SearchContents_contents_Link | SearchContents_contents_Embed | SearchContents_contents_Attachment | SearchContents_contents_PendingBlock | SearchContents_contents_User | SearchContents_contents_Group;

export interface SearchContents {
  contents: (SearchContents_contents | null)[] | null;
}

export interface SearchContentsVariables {
  type?: (SsearchType | null)[] | null;
  page?: number | null;
  per?: number | null;
  q: string;
  block_filter?: BlockFilterEnum | null;
}
