/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FeedType } from "./globalTypes";

// ====================================================
// GraphQL query operation: FeedConnectionQuery
// ====================================================

export interface FeedConnectionQuery_me_feed_page_info {
  __typename: "FeedConnectionPageInfo";
  next_cursor: string | null;
  has_next_page: boolean;
}

export interface FeedConnectionQuery_me_feed_groups_user {
  __typename: "User";
  id: number;
  label: string;
  name: string;
  href: string;
}

export interface FeedConnectionQuery_me_feed_groups_owner_User {
  __typename: "User";
  id: number;
  label: string;
  name: string;
  href: string;
}

export interface FeedConnectionQuery_me_feed_groups_owner_Group {
  __typename: "Group";
  id: number;
  label: string;
  href: string;
  name: string;
}

export type FeedConnectionQuery_me_feed_groups_owner = FeedConnectionQuery_me_feed_groups_owner_User | FeedConnectionQuery_me_feed_groups_owner_Group;

export interface FeedConnectionQuery_me_feed_groups_item_Channel_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export interface FeedConnectionQuery_me_feed_groups_item_Channel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
}

export type FeedConnectionQuery_me_feed_groups_item_Channel_owner = FeedConnectionQuery_me_feed_groups_item_Channel_owner_User | FeedConnectionQuery_me_feed_groups_item_Channel_owner_Group;

export interface FeedConnectionQuery_me_feed_groups_item_Channel {
  __typename: "Channel";
  id: number;
  truncatedTitle: string;
  href: string;
  visibility: string;
  label: string;
  owner: FeedConnectionQuery_me_feed_groups_item_Channel_owner;
}

export interface FeedConnectionQuery_me_feed_groups_item_User {
  __typename: "User";
  id: number;
  label: string;
  name: string;
  href: string;
}

export interface FeedConnectionQuery_me_feed_groups_item_Connectable {
  __typename: "Connectable";
  id: number;
  label: string;
  href: string;
}

export interface FeedConnectionQuery_me_feed_groups_item_Attachment {
  __typename: "Attachment";
  id: number;
  label: string;
  href: string;
}

export interface FeedConnectionQuery_me_feed_groups_item_Embed {
  __typename: "Embed";
  id: number;
  label: string;
  href: string;
}

export interface FeedConnectionQuery_me_feed_groups_item_Text {
  __typename: "Text";
  id: number;
  label: string;
  href: string;
}

export interface FeedConnectionQuery_me_feed_groups_item_Image {
  __typename: "Image";
  id: number;
  label: string;
  href: string;
}

export interface FeedConnectionQuery_me_feed_groups_item_Link {
  __typename: "Link";
  id: number;
  label: string;
  href: string;
}

export interface FeedConnectionQuery_me_feed_groups_item_Comment {
  __typename: "Comment";
  id: number;
  body: string | null;
  href: string;
}

export interface FeedConnectionQuery_me_feed_groups_item_Group {
  __typename: "Group";
  id: number;
  label: string;
  name: string;
  href: string;
}

export type FeedConnectionQuery_me_feed_groups_item = FeedConnectionQuery_me_feed_groups_item_Channel | FeedConnectionQuery_me_feed_groups_item_User | FeedConnectionQuery_me_feed_groups_item_Connectable | FeedConnectionQuery_me_feed_groups_item_Attachment | FeedConnectionQuery_me_feed_groups_item_Embed | FeedConnectionQuery_me_feed_groups_item_Text | FeedConnectionQuery_me_feed_groups_item_Image | FeedConnectionQuery_me_feed_groups_item_Link | FeedConnectionQuery_me_feed_groups_item_Comment | FeedConnectionQuery_me_feed_groups_item_Group;

export interface FeedConnectionQuery_me_feed_groups_target_Channel_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export interface FeedConnectionQuery_me_feed_groups_target_Channel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
}

export type FeedConnectionQuery_me_feed_groups_target_Channel_owner = FeedConnectionQuery_me_feed_groups_target_Channel_owner_User | FeedConnectionQuery_me_feed_groups_target_Channel_owner_Group;

export interface FeedConnectionQuery_me_feed_groups_target_Channel {
  __typename: "Channel";
  id: number;
  truncatedTitle: string;
  href: string;
  visibility: string;
  label: string;
  owner: FeedConnectionQuery_me_feed_groups_target_Channel_owner;
}

export interface FeedConnectionQuery_me_feed_groups_target_User {
  __typename: "User";
  id: number;
  label: string;
  name: string;
  href: string;
}

export interface FeedConnectionQuery_me_feed_groups_target_Connectable {
  __typename: "Connectable";
  id: number;
  label: string;
  href: string;
}

export interface FeedConnectionQuery_me_feed_groups_target_Attachment {
  __typename: "Attachment";
  id: number;
  label: string;
  href: string;
}

export interface FeedConnectionQuery_me_feed_groups_target_Embed {
  __typename: "Embed";
  id: number;
  label: string;
  href: string;
}

export interface FeedConnectionQuery_me_feed_groups_target_Text {
  __typename: "Text";
  id: number;
  label: string;
  href: string;
}

export interface FeedConnectionQuery_me_feed_groups_target_Image {
  __typename: "Image";
  id: number;
  label: string;
  href: string;
}

export interface FeedConnectionQuery_me_feed_groups_target_Link {
  __typename: "Link";
  id: number;
  label: string;
  href: string;
}

export interface FeedConnectionQuery_me_feed_groups_target_Comment {
  __typename: "Comment";
  id: number;
  body: string | null;
  href: string;
}

export interface FeedConnectionQuery_me_feed_groups_target_Group {
  __typename: "Group";
  id: number;
  label: string;
  name: string;
  href: string;
}

export type FeedConnectionQuery_me_feed_groups_target = FeedConnectionQuery_me_feed_groups_target_Channel | FeedConnectionQuery_me_feed_groups_target_User | FeedConnectionQuery_me_feed_groups_target_Connectable | FeedConnectionQuery_me_feed_groups_target_Attachment | FeedConnectionQuery_me_feed_groups_target_Embed | FeedConnectionQuery_me_feed_groups_target_Text | FeedConnectionQuery_me_feed_groups_target_Image | FeedConnectionQuery_me_feed_groups_target_Link | FeedConnectionQuery_me_feed_groups_target_Comment | FeedConnectionQuery_me_feed_groups_target_Group;

export interface FeedConnectionQuery_me_feed_groups_objects_Comment {
  __typename: "Comment";
}

export interface FeedConnectionQuery_me_feed_groups_objects_Attachment_counts {
  __typename: "BlockCounts";
  comments: number;
}

export interface FeedConnectionQuery_me_feed_groups_objects_Attachment_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface FeedConnectionQuery_me_feed_groups_objects_Attachment_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface FeedConnectionQuery_me_feed_groups_objects_Attachment_connection {
  __typename: "Connection";
  created_at: string;
  user: FeedConnectionQuery_me_feed_groups_objects_Attachment_connection_user | null;
}

export interface FeedConnectionQuery_me_feed_groups_objects_Attachment_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface FeedConnectionQuery_me_feed_groups_objects_Attachment {
  __typename: "Attachment";
  href: string;
  counts: FeedConnectionQuery_me_feed_groups_objects_Attachment_counts;
  id: number;
  title: string;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  file_extension: string | null;
  updated_at: string;
  user: FeedConnectionQuery_me_feed_groups_objects_Attachment_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: FeedConnectionQuery_me_feed_groups_objects_Attachment_connection | null;
  source: FeedConnectionQuery_me_feed_groups_objects_Attachment_source | null;
}

export interface FeedConnectionQuery_me_feed_groups_objects_Channel_counts {
  __typename: "ChannelCounts";
  contents: number;
}

export interface FeedConnectionQuery_me_feed_groups_objects_Channel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface FeedConnectionQuery_me_feed_groups_objects_Channel_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type FeedConnectionQuery_me_feed_groups_objects_Channel_owner = FeedConnectionQuery_me_feed_groups_objects_Channel_owner_Group | FeedConnectionQuery_me_feed_groups_objects_Channel_owner_User;

export interface FeedConnectionQuery_me_feed_groups_objects_Channel_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface FeedConnectionQuery_me_feed_groups_objects_Channel_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface FeedConnectionQuery_me_feed_groups_objects_Channel_connection {
  __typename: "Connection";
  created_at: string;
  user: FeedConnectionQuery_me_feed_groups_objects_Channel_connection_user | null;
}

export interface FeedConnectionQuery_me_feed_groups_objects_Channel_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface FeedConnectionQuery_me_feed_groups_objects_Channel {
  __typename: "Channel";
  href: string;
  id: number;
  truncatedTitle: string;
  visibility: string;
  updated_at: string;
  counts: FeedConnectionQuery_me_feed_groups_objects_Channel_counts;
  owner: FeedConnectionQuery_me_feed_groups_objects_Channel_owner;
  label: string;
  title: string;
  user: FeedConnectionQuery_me_feed_groups_objects_Channel_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: FeedConnectionQuery_me_feed_groups_objects_Channel_connection | null;
  source: FeedConnectionQuery_me_feed_groups_objects_Channel_source | null;
}

export interface FeedConnectionQuery_me_feed_groups_objects_Embed_counts {
  __typename: "BlockCounts";
  comments: number;
}

export interface FeedConnectionQuery_me_feed_groups_objects_Embed_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface FeedConnectionQuery_me_feed_groups_objects_Embed_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface FeedConnectionQuery_me_feed_groups_objects_Embed_connection {
  __typename: "Connection";
  created_at: string;
  user: FeedConnectionQuery_me_feed_groups_objects_Embed_connection_user | null;
}

export interface FeedConnectionQuery_me_feed_groups_objects_Embed_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface FeedConnectionQuery_me_feed_groups_objects_Embed {
  __typename: "Embed";
  href: string;
  counts: FeedConnectionQuery_me_feed_groups_objects_Embed_counts;
  id: number;
  title: string;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  updated_at: string;
  user: FeedConnectionQuery_me_feed_groups_objects_Embed_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: FeedConnectionQuery_me_feed_groups_objects_Embed_connection | null;
  source: FeedConnectionQuery_me_feed_groups_objects_Embed_source | null;
}

export interface FeedConnectionQuery_me_feed_groups_objects_Image_counts {
  __typename: "BlockCounts";
  comments: number;
}

export interface FeedConnectionQuery_me_feed_groups_objects_Image_original_dimensions {
  __typename: "Dimensions";
  width: number | null;
  height: number | null;
}

export interface FeedConnectionQuery_me_feed_groups_objects_Image_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface FeedConnectionQuery_me_feed_groups_objects_Image_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface FeedConnectionQuery_me_feed_groups_objects_Image_connection {
  __typename: "Connection";
  created_at: string;
  user: FeedConnectionQuery_me_feed_groups_objects_Image_connection_user | null;
}

export interface FeedConnectionQuery_me_feed_groups_objects_Image_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface FeedConnectionQuery_me_feed_groups_objects_Image {
  __typename: "Image";
  href: string;
  counts: FeedConnectionQuery_me_feed_groups_objects_Image_counts;
  id: number;
  title: string;
  alt_text: string | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  original_dimensions: FeedConnectionQuery_me_feed_groups_objects_Image_original_dimensions | null;
  updated_at: string;
  user: FeedConnectionQuery_me_feed_groups_objects_Image_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: FeedConnectionQuery_me_feed_groups_objects_Image_connection | null;
  source: FeedConnectionQuery_me_feed_groups_objects_Image_source | null;
}

export interface FeedConnectionQuery_me_feed_groups_objects_Link_counts {
  __typename: "BlockCounts";
  comments: number;
}

export interface FeedConnectionQuery_me_feed_groups_objects_Link_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface FeedConnectionQuery_me_feed_groups_objects_Link_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface FeedConnectionQuery_me_feed_groups_objects_Link_connection {
  __typename: "Connection";
  created_at: string;
  user: FeedConnectionQuery_me_feed_groups_objects_Link_connection_user | null;
}

export interface FeedConnectionQuery_me_feed_groups_objects_Link_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface FeedConnectionQuery_me_feed_groups_objects_Link {
  __typename: "Link";
  href: string;
  counts: FeedConnectionQuery_me_feed_groups_objects_Link_counts;
  title: string;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  external_url: string | null;
  content: string | null;
  updated_at: string;
  user: FeedConnectionQuery_me_feed_groups_objects_Link_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: FeedConnectionQuery_me_feed_groups_objects_Link_connection | null;
  source_url: string | null;
  id: number;
  source: FeedConnectionQuery_me_feed_groups_objects_Link_source | null;
}

export interface FeedConnectionQuery_me_feed_groups_objects_Text_counts {
  __typename: "BlockCounts";
  comments: number;
}

export interface FeedConnectionQuery_me_feed_groups_objects_Text_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface FeedConnectionQuery_me_feed_groups_objects_Text_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface FeedConnectionQuery_me_feed_groups_objects_Text_connection {
  __typename: "Connection";
  created_at: string;
  user: FeedConnectionQuery_me_feed_groups_objects_Text_connection_user | null;
}

export interface FeedConnectionQuery_me_feed_groups_objects_Text_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface FeedConnectionQuery_me_feed_groups_objects_Text {
  __typename: "Text";
  href: string;
  counts: FeedConnectionQuery_me_feed_groups_objects_Text_counts;
  id: number;
  title: string;
  content: string;
  raw: string;
  updated_at: string;
  user: FeedConnectionQuery_me_feed_groups_objects_Text_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: FeedConnectionQuery_me_feed_groups_objects_Text_connection | null;
  source: FeedConnectionQuery_me_feed_groups_objects_Text_source | null;
}

export interface FeedConnectionQuery_me_feed_groups_objects_Group {
  __typename: "Group";
  id: number;
  name: string;
  href: string;
  visibility: string;
  label: string;
  initials: string;
  avatar: string | null;
}

export interface FeedConnectionQuery_me_feed_groups_objects_User {
  __typename: "User";
  id: number;
  name: string;
  href: string;
  label: string;
  initials: string;
  avatar: string | null;
}

export type FeedConnectionQuery_me_feed_groups_objects = FeedConnectionQuery_me_feed_groups_objects_Comment | FeedConnectionQuery_me_feed_groups_objects_Attachment | FeedConnectionQuery_me_feed_groups_objects_Channel | FeedConnectionQuery_me_feed_groups_objects_Embed | FeedConnectionQuery_me_feed_groups_objects_Image | FeedConnectionQuery_me_feed_groups_objects_Link | FeedConnectionQuery_me_feed_groups_objects_Text | FeedConnectionQuery_me_feed_groups_objects_Group | FeedConnectionQuery_me_feed_groups_objects_User;

export interface FeedConnectionQuery_me_feed_groups {
  __typename: "DeedGroup";
  id: string;
  key: string;
  length: number;
  user: FeedConnectionQuery_me_feed_groups_user | null;
  owner: FeedConnectionQuery_me_feed_groups_owner;
  action: string;
  item: FeedConnectionQuery_me_feed_groups_item | null;
  item_phrase: string;
  connector: string | null;
  target: FeedConnectionQuery_me_feed_groups_target | null;
  target_phrase: string;
  created_at: string | null;
  is_private: boolean;
  objects: FeedConnectionQuery_me_feed_groups_objects[];
}

export interface FeedConnectionQuery_me_feed {
  __typename: "FeedConnection";
  page_info: FeedConnectionQuery_me_feed_page_info;
  groups: FeedConnectionQuery_me_feed_groups[];
}

export interface FeedConnectionQuery_me {
  __typename: "Me";
  id: number;
  feed: FeedConnectionQuery_me_feed | null;
}

export interface FeedConnectionQuery {
  /**
   * The current logged in user
   */
  me: FeedConnectionQuery_me | null;
}

export interface FeedConnectionQueryVariables {
  start?: string | null;
  limit?: number | null;
  type?: FeedType | null;
}
