/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Term, Where, What, Fields, Order, ExtensionsEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: ProfileTable
// ====================================================

export interface ProfileTable_searches_advanced_results_Group {
  __typename: "Group" | "User";
}

export interface ProfileTable_searches_advanced_results_Attachment_user {
  __typename: "User";
  name: string;
}

export interface ProfileTable_searches_advanced_results_Attachment_connection {
  __typename: "Connection";
  id: number;
  created_at: string;
  selected: boolean;
}

export interface ProfileTable_searches_advanced_results_Attachment_counts {
  __typename: "BlockCounts";
  public_channels: number;
}

export interface ProfileTable_searches_advanced_results_Attachment_source {
  __typename: "ConnectableSource";
  url: string | null;
  provider_url: string | null;
}

export interface ProfileTable_searches_advanced_results_Attachment {
  __typename: "Attachment";
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  user: ProfileTable_searches_advanced_results_Attachment_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileTable_searches_advanced_results_Attachment_connection | null;
  counts: ProfileTable_searches_advanced_results_Attachment_counts;
  file_url: string | null;
  image_url: string | null;
  href: string;
  source: ProfileTable_searches_advanced_results_Attachment_source | null;
}

export interface ProfileTable_searches_advanced_results_Channel_user {
  __typename: "User";
  name: string;
}

export interface ProfileTable_searches_advanced_results_Channel_connection {
  __typename: "Connection";
  id: number;
  created_at: string;
  selected: boolean;
}

export interface ProfileTable_searches_advanced_results_Channel_counts {
  __typename: "ChannelCounts";
  connected_to_channels: number;
  contents: number;
}

export interface ProfileTable_searches_advanced_results_Channel {
  __typename: "Channel";
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  user: ProfileTable_searches_advanced_results_Channel_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileTable_searches_advanced_results_Channel_connection | null;
  visibility: string;
  href: string;
  counts: ProfileTable_searches_advanced_results_Channel_counts;
}

export interface ProfileTable_searches_advanced_results_Embed_user {
  __typename: "User";
  name: string;
}

export interface ProfileTable_searches_advanced_results_Embed_connection {
  __typename: "Connection";
  id: number;
  created_at: string;
  selected: boolean;
}

export interface ProfileTable_searches_advanced_results_Embed_counts {
  __typename: "BlockCounts";
  public_channels: number;
}

export interface ProfileTable_searches_advanced_results_Embed_source {
  __typename: "ConnectableSource";
  url: string | null;
  provider_url: string | null;
}

export interface ProfileTable_searches_advanced_results_Embed {
  __typename: "Embed";
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  user: ProfileTable_searches_advanced_results_Embed_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileTable_searches_advanced_results_Embed_connection | null;
  counts: ProfileTable_searches_advanced_results_Embed_counts;
  embed_html: string | null;
  image_url: string | null;
  href: string;
  source: ProfileTable_searches_advanced_results_Embed_source | null;
}

export interface ProfileTable_searches_advanced_results_Image_user {
  __typename: "User";
  name: string;
}

export interface ProfileTable_searches_advanced_results_Image_connection {
  __typename: "Connection";
  id: number;
  created_at: string;
  selected: boolean;
}

export interface ProfileTable_searches_advanced_results_Image_counts {
  __typename: "BlockCounts";
  public_channels: number;
}

export interface ProfileTable_searches_advanced_results_Image_source {
  __typename: "ConnectableSource";
  url: string | null;
  provider_url: string | null;
}

export interface ProfileTable_searches_advanced_results_Image {
  __typename: "Image";
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  user: ProfileTable_searches_advanced_results_Image_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileTable_searches_advanced_results_Image_connection | null;
  counts: ProfileTable_searches_advanced_results_Image_counts;
  image_url: string | null;
  href: string;
  /**
   * URL to find the original image on various services
   */
  find_original_url: string | null;
  source: ProfileTable_searches_advanced_results_Image_source | null;
}

export interface ProfileTable_searches_advanced_results_Link_user {
  __typename: "User";
  name: string;
}

export interface ProfileTable_searches_advanced_results_Link_connection {
  __typename: "Connection";
  id: number;
  created_at: string;
  selected: boolean;
}

export interface ProfileTable_searches_advanced_results_Link_counts {
  __typename: "BlockCounts";
  public_channels: number;
}

export interface ProfileTable_searches_advanced_results_Link_source {
  __typename: "ConnectableSource";
  url: string | null;
  provider_url: string | null;
}

export interface ProfileTable_searches_advanced_results_Link {
  __typename: "Link";
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  user: ProfileTable_searches_advanced_results_Link_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileTable_searches_advanced_results_Link_connection | null;
  counts: ProfileTable_searches_advanced_results_Link_counts;
  image_url: string | null;
  href: string;
  source: ProfileTable_searches_advanced_results_Link_source | null;
}

export interface ProfileTable_searches_advanced_results_PendingBlock_user {
  __typename: "User";
  name: string;
}

export interface ProfileTable_searches_advanced_results_PendingBlock_connection {
  __typename: "Connection";
  id: number;
  created_at: string;
  selected: boolean;
}

export interface ProfileTable_searches_advanced_results_PendingBlock_counts {
  __typename: "BlockCounts";
  public_channels: number;
}

export interface ProfileTable_searches_advanced_results_PendingBlock {
  __typename: "PendingBlock";
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  user: ProfileTable_searches_advanced_results_PendingBlock_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileTable_searches_advanced_results_PendingBlock_connection | null;
  href: string;
  counts: ProfileTable_searches_advanced_results_PendingBlock_counts;
}

export interface ProfileTable_searches_advanced_results_Text_user {
  __typename: "User";
  name: string;
}

export interface ProfileTable_searches_advanced_results_Text_connection {
  __typename: "Connection";
  id: number;
  created_at: string;
  selected: boolean;
}

export interface ProfileTable_searches_advanced_results_Text_counts {
  __typename: "BlockCounts";
  public_channels: number;
}

export interface ProfileTable_searches_advanced_results_Text_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ProfileTable_searches_advanced_results_Text {
  __typename: "Text";
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  user: ProfileTable_searches_advanced_results_Text_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileTable_searches_advanced_results_Text_connection | null;
  counts: ProfileTable_searches_advanced_results_Text_counts;
  content: string;
  html: string;
  /**
   * URL to find the original image on various services
   */
  find_original_url: string | null;
  href: string;
  source: ProfileTable_searches_advanced_results_Text_source | null;
}

export type ProfileTable_searches_advanced_results = ProfileTable_searches_advanced_results_Group | ProfileTable_searches_advanced_results_Attachment | ProfileTable_searches_advanced_results_Channel | ProfileTable_searches_advanced_results_Embed | ProfileTable_searches_advanced_results_Image | ProfileTable_searches_advanced_results_Link | ProfileTable_searches_advanced_results_PendingBlock | ProfileTable_searches_advanced_results_Text;

export interface ProfileTable_searches_advanced {
  __typename: "AdvancedResult";
  total: number;
  results: (ProfileTable_searches_advanced_results | null)[] | null;
}

export interface ProfileTable_searches {
  __typename: "Searches";
  advanced: ProfileTable_searches_advanced;
}

export interface ProfileTable {
  searches: ProfileTable_searches | null;
}

export interface ProfileTableVariables {
  term?: Term | null;
  where?: Where[] | null;
  what?: What | null;
  fields?: Fields | null;
  order?: Order | null;
  extensions?: ExtensionsEnum[] | null;
  page?: number | null;
  per?: number | null;
  before?: string | null;
  after?: string | null;
  includeConnection: boolean;
}
