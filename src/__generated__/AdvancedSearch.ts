/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Term, Where, What, Fields, Order, WhatEnum, WhereEnum, FieldsEnum, SortOrderEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: AdvancedSearch
// ====================================================

export interface AdvancedSearch_searches_advanced_filters {
  __typename: "AdvancedFilterResult";
  what: WhatEnum[] | null;
  where: WhereEnum[] | null;
  fields: FieldsEnum[] | null;
  order: SortOrderEnum[] | null;
}

export interface AdvancedSearch_searches_advanced_results_Attachment_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface AdvancedSearch_searches_advanced_results_Attachment_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface AdvancedSearch_searches_advanced_results_Attachment_connection {
  __typename: "Connection";
  created_at: string | null;
  user: AdvancedSearch_searches_advanced_results_Attachment_connection_user | null;
}

export interface AdvancedSearch_searches_advanced_results_Attachment_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface AdvancedSearch_searches_advanced_results_Attachment_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface AdvancedSearch_searches_advanced_results_Attachment {
  __typename: "Attachment";
  id: number;
  href: string | null;
  updated_at: string | null;
  title: string;
  user: AdvancedSearch_searches_advanced_results_Attachment_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: AdvancedSearch_searches_advanced_results_Attachment_connection | null;
  source: AdvancedSearch_searches_advanced_results_Attachment_source | null;
  counts: AdvancedSearch_searches_advanced_results_Attachment_counts | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  file_extension: string | null;
}

export interface AdvancedSearch_searches_advanced_results_Channel_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface AdvancedSearch_searches_advanced_results_Channel_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface AdvancedSearch_searches_advanced_results_Channel_connection {
  __typename: "Connection";
  created_at: string | null;
  user: AdvancedSearch_searches_advanced_results_Channel_connection_user | null;
}

export interface AdvancedSearch_searches_advanced_results_Channel_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface AdvancedSearch_searches_advanced_results_Channel_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface AdvancedSearch_searches_advanced_results_Channel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface AdvancedSearch_searches_advanced_results_Channel_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type AdvancedSearch_searches_advanced_results_Channel_owner = AdvancedSearch_searches_advanced_results_Channel_owner_Group | AdvancedSearch_searches_advanced_results_Channel_owner_User;

export interface AdvancedSearch_searches_advanced_results_Channel {
  __typename: "Channel";
  id: number;
  href: string | null;
  updated_at: string | null;
  title: string;
  user: AdvancedSearch_searches_advanced_results_Channel_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: AdvancedSearch_searches_advanced_results_Channel_connection | null;
  source: AdvancedSearch_searches_advanced_results_Channel_source | null;
  truncatedTitle: string;
  visibility: string;
  counts: AdvancedSearch_searches_advanced_results_Channel_counts | null;
  owner: AdvancedSearch_searches_advanced_results_Channel_owner;
  label: string;
}

export interface AdvancedSearch_searches_advanced_results_Embed_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface AdvancedSearch_searches_advanced_results_Embed_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface AdvancedSearch_searches_advanced_results_Embed_connection {
  __typename: "Connection";
  created_at: string | null;
  user: AdvancedSearch_searches_advanced_results_Embed_connection_user | null;
}

export interface AdvancedSearch_searches_advanced_results_Embed_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface AdvancedSearch_searches_advanced_results_Embed_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface AdvancedSearch_searches_advanced_results_Embed {
  __typename: "Embed";
  id: number;
  href: string | null;
  updated_at: string | null;
  title: string;
  user: AdvancedSearch_searches_advanced_results_Embed_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: AdvancedSearch_searches_advanced_results_Embed_connection | null;
  source: AdvancedSearch_searches_advanced_results_Embed_source | null;
  counts: AdvancedSearch_searches_advanced_results_Embed_counts | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
}

export interface AdvancedSearch_searches_advanced_results_Image_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface AdvancedSearch_searches_advanced_results_Image_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface AdvancedSearch_searches_advanced_results_Image_connection {
  __typename: "Connection";
  created_at: string | null;
  user: AdvancedSearch_searches_advanced_results_Image_connection_user | null;
}

export interface AdvancedSearch_searches_advanced_results_Image_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface AdvancedSearch_searches_advanced_results_Image_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface AdvancedSearch_searches_advanced_results_Image_original_dimensions {
  __typename: "Dimensions";
  width: number | null;
  height: number | null;
}

export interface AdvancedSearch_searches_advanced_results_Image {
  __typename: "Image";
  id: number;
  href: string | null;
  updated_at: string | null;
  title: string;
  user: AdvancedSearch_searches_advanced_results_Image_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: AdvancedSearch_searches_advanced_results_Image_connection | null;
  source: AdvancedSearch_searches_advanced_results_Image_source | null;
  counts: AdvancedSearch_searches_advanced_results_Image_counts | null;
  alt_text: string | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  original_dimensions: AdvancedSearch_searches_advanced_results_Image_original_dimensions | null;
}

export interface AdvancedSearch_searches_advanced_results_Link_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface AdvancedSearch_searches_advanced_results_Link_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface AdvancedSearch_searches_advanced_results_Link_connection {
  __typename: "Connection";
  created_at: string | null;
  user: AdvancedSearch_searches_advanced_results_Link_connection_user | null;
}

export interface AdvancedSearch_searches_advanced_results_Link_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface AdvancedSearch_searches_advanced_results_Link_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface AdvancedSearch_searches_advanced_results_Link {
  __typename: "Link";
  id: number;
  href: string | null;
  updated_at: string | null;
  title: string;
  user: AdvancedSearch_searches_advanced_results_Link_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: AdvancedSearch_searches_advanced_results_Link_connection | null;
  source: AdvancedSearch_searches_advanced_results_Link_source | null;
  counts: AdvancedSearch_searches_advanced_results_Link_counts | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  external_url: string | null;
}

export interface AdvancedSearch_searches_advanced_results_PendingBlock_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface AdvancedSearch_searches_advanced_results_PendingBlock_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface AdvancedSearch_searches_advanced_results_PendingBlock_connection {
  __typename: "Connection";
  created_at: string | null;
  user: AdvancedSearch_searches_advanced_results_PendingBlock_connection_user | null;
}

export interface AdvancedSearch_searches_advanced_results_PendingBlock_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface AdvancedSearch_searches_advanced_results_PendingBlock_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface AdvancedSearch_searches_advanced_results_PendingBlock {
  __typename: "PendingBlock";
  id: number;
  href: string | null;
  updated_at: string | null;
  title: string;
  user: AdvancedSearch_searches_advanced_results_PendingBlock_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: AdvancedSearch_searches_advanced_results_PendingBlock_connection | null;
  source: AdvancedSearch_searches_advanced_results_PendingBlock_source | null;
  counts: AdvancedSearch_searches_advanced_results_PendingBlock_counts | null;
}

export interface AdvancedSearch_searches_advanced_results_Text_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface AdvancedSearch_searches_advanced_results_Text_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface AdvancedSearch_searches_advanced_results_Text_connection {
  __typename: "Connection";
  created_at: string | null;
  user: AdvancedSearch_searches_advanced_results_Text_connection_user | null;
}

export interface AdvancedSearch_searches_advanced_results_Text_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface AdvancedSearch_searches_advanced_results_Text_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface AdvancedSearch_searches_advanced_results_Text {
  __typename: "Text";
  id: number;
  href: string | null;
  updated_at: string | null;
  title: string;
  user: AdvancedSearch_searches_advanced_results_Text_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: AdvancedSearch_searches_advanced_results_Text_connection | null;
  source: AdvancedSearch_searches_advanced_results_Text_source | null;
  counts: AdvancedSearch_searches_advanced_results_Text_counts | null;
  content: string;
  raw: string;
}

export interface AdvancedSearch_searches_advanced_results_Group {
  __typename: "Group";
  id: number;
  name: string;
  href: string | null;
  visibility: string;
  label: string;
  initials: string;
  avatar: string | null;
}

export interface AdvancedSearch_searches_advanced_results_User {
  __typename: "User";
  id: number;
  name: string;
  href: string | null;
  label: string;
  initials: string;
  avatar: string | null;
}

export type AdvancedSearch_searches_advanced_results = AdvancedSearch_searches_advanced_results_Attachment | AdvancedSearch_searches_advanced_results_Channel | AdvancedSearch_searches_advanced_results_Embed | AdvancedSearch_searches_advanced_results_Image | AdvancedSearch_searches_advanced_results_Link | AdvancedSearch_searches_advanced_results_PendingBlock | AdvancedSearch_searches_advanced_results_Text | AdvancedSearch_searches_advanced_results_Group | AdvancedSearch_searches_advanced_results_User;

export interface AdvancedSearch_searches_advanced {
  __typename: "AdvancedResult";
  total: number;
  filters: AdvancedSearch_searches_advanced_filters | null;
  results: (AdvancedSearch_searches_advanced_results | null)[] | null;
}

export interface AdvancedSearch_searches {
  __typename: "Searches";
  advanced: AdvancedSearch_searches_advanced;
}

export interface AdvancedSearch {
  searches: AdvancedSearch_searches | null;
}

export interface AdvancedSearchVariables {
  term?: Term | null;
  where?: Where | null;
  what?: What | null;
  fields?: Fields | null;
  order?: Order | null;
  page?: number | null;
  per?: number | null;
}
