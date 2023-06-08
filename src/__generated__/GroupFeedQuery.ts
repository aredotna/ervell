/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GroupFeedQuery
// ====================================================

export interface GroupFeedQuery_group_feed_groups_user {
  __typename: "User";
  id: number;
  label: string;
  name: string;
  href: string;
}

export interface GroupFeedQuery_group_feed_groups_owner_User {
  __typename: "User";
  id: number;
  label: string;
  name: string;
  href: string;
}

export interface GroupFeedQuery_group_feed_groups_owner_Group {
  __typename: "Group";
  id: number;
  label: string;
  href: string;
  name: string;
}

export type GroupFeedQuery_group_feed_groups_owner = GroupFeedQuery_group_feed_groups_owner_User | GroupFeedQuery_group_feed_groups_owner_Group;

export interface GroupFeedQuery_group_feed_groups_item_Channel_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export interface GroupFeedQuery_group_feed_groups_item_Channel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
}

export type GroupFeedQuery_group_feed_groups_item_Channel_owner = GroupFeedQuery_group_feed_groups_item_Channel_owner_User | GroupFeedQuery_group_feed_groups_item_Channel_owner_Group;

export interface GroupFeedQuery_group_feed_groups_item_Channel {
  __typename: "Channel";
  id: number;
  truncatedTitle: string;
  href: string;
  visibility: string;
  label: string;
  owner: GroupFeedQuery_group_feed_groups_item_Channel_owner;
}

export interface GroupFeedQuery_group_feed_groups_item_User {
  __typename: "User";
  id: number;
  label: string;
  name: string;
  href: string;
}

export interface GroupFeedQuery_group_feed_groups_item_Connectable {
  __typename: "Connectable";
  id: number;
  label: string;
  href: string;
}

export interface GroupFeedQuery_group_feed_groups_item_Attachment {
  __typename: "Attachment";
  id: number;
  label: string;
  href: string;
}

export interface GroupFeedQuery_group_feed_groups_item_Embed {
  __typename: "Embed";
  id: number;
  label: string;
  href: string;
}

export interface GroupFeedQuery_group_feed_groups_item_Text {
  __typename: "Text";
  id: number;
  label: string;
  href: string;
}

export interface GroupFeedQuery_group_feed_groups_item_Image {
  __typename: "Image";
  id: number;
  label: string;
  href: string;
}

export interface GroupFeedQuery_group_feed_groups_item_Link {
  __typename: "Link";
  id: number;
  label: string;
  href: string;
}

export interface GroupFeedQuery_group_feed_groups_item_Comment {
  __typename: "Comment";
  id: number;
  body: string | null;
  href: string;
}

export interface GroupFeedQuery_group_feed_groups_item_Group {
  __typename: "Group";
  id: number;
  label: string;
  name: string;
  href: string;
}

export type GroupFeedQuery_group_feed_groups_item = GroupFeedQuery_group_feed_groups_item_Channel | GroupFeedQuery_group_feed_groups_item_User | GroupFeedQuery_group_feed_groups_item_Connectable | GroupFeedQuery_group_feed_groups_item_Attachment | GroupFeedQuery_group_feed_groups_item_Embed | GroupFeedQuery_group_feed_groups_item_Text | GroupFeedQuery_group_feed_groups_item_Image | GroupFeedQuery_group_feed_groups_item_Link | GroupFeedQuery_group_feed_groups_item_Comment | GroupFeedQuery_group_feed_groups_item_Group;

export interface GroupFeedQuery_group_feed_groups_target_Channel_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export interface GroupFeedQuery_group_feed_groups_target_Channel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
}

export type GroupFeedQuery_group_feed_groups_target_Channel_owner = GroupFeedQuery_group_feed_groups_target_Channel_owner_User | GroupFeedQuery_group_feed_groups_target_Channel_owner_Group;

export interface GroupFeedQuery_group_feed_groups_target_Channel {
  __typename: "Channel";
  id: number;
  truncatedTitle: string;
  href: string;
  visibility: string;
  label: string;
  owner: GroupFeedQuery_group_feed_groups_target_Channel_owner;
}

export interface GroupFeedQuery_group_feed_groups_target_User {
  __typename: "User";
  id: number;
  label: string;
  name: string;
  href: string;
}

export interface GroupFeedQuery_group_feed_groups_target_Connectable {
  __typename: "Connectable";
  id: number;
  label: string;
  href: string;
}

export interface GroupFeedQuery_group_feed_groups_target_Attachment {
  __typename: "Attachment";
  id: number;
  label: string;
  href: string;
}

export interface GroupFeedQuery_group_feed_groups_target_Embed {
  __typename: "Embed";
  id: number;
  label: string;
  href: string;
}

export interface GroupFeedQuery_group_feed_groups_target_Text {
  __typename: "Text";
  id: number;
  label: string;
  href: string;
}

export interface GroupFeedQuery_group_feed_groups_target_Image {
  __typename: "Image";
  id: number;
  label: string;
  href: string;
}

export interface GroupFeedQuery_group_feed_groups_target_Link {
  __typename: "Link";
  id: number;
  label: string;
  href: string;
}

export interface GroupFeedQuery_group_feed_groups_target_Comment {
  __typename: "Comment";
  id: number;
  body: string | null;
  href: string;
}

export interface GroupFeedQuery_group_feed_groups_target_Group {
  __typename: "Group";
  id: number;
  label: string;
  name: string;
  href: string;
}

export type GroupFeedQuery_group_feed_groups_target = GroupFeedQuery_group_feed_groups_target_Channel | GroupFeedQuery_group_feed_groups_target_User | GroupFeedQuery_group_feed_groups_target_Connectable | GroupFeedQuery_group_feed_groups_target_Attachment | GroupFeedQuery_group_feed_groups_target_Embed | GroupFeedQuery_group_feed_groups_target_Text | GroupFeedQuery_group_feed_groups_target_Image | GroupFeedQuery_group_feed_groups_target_Link | GroupFeedQuery_group_feed_groups_target_Comment | GroupFeedQuery_group_feed_groups_target_Group;

export interface GroupFeedQuery_group_feed_groups_objects_Comment {
  __typename: "Comment";
}

export interface GroupFeedQuery_group_feed_groups_objects_Attachment_counts {
  __typename: "BlockCounts";
  comments: number;
}

export interface GroupFeedQuery_group_feed_groups_objects_Attachment_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface GroupFeedQuery_group_feed_groups_objects_Attachment_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface GroupFeedQuery_group_feed_groups_objects_Attachment_connection {
  __typename: "Connection";
  created_at: string;
  user: GroupFeedQuery_group_feed_groups_objects_Attachment_connection_user | null;
}

export interface GroupFeedQuery_group_feed_groups_objects_Attachment_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface GroupFeedQuery_group_feed_groups_objects_Attachment {
  __typename: "Attachment";
  href: string;
  counts: GroupFeedQuery_group_feed_groups_objects_Attachment_counts;
  id: number;
  title: string;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  file_extension: string | null;
  updated_at: string;
  user: GroupFeedQuery_group_feed_groups_objects_Attachment_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: GroupFeedQuery_group_feed_groups_objects_Attachment_connection | null;
  source: GroupFeedQuery_group_feed_groups_objects_Attachment_source | null;
}

export interface GroupFeedQuery_group_feed_groups_objects_Channel_counts {
  __typename: "ChannelCounts";
  contents: number;
}

export interface GroupFeedQuery_group_feed_groups_objects_Channel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface GroupFeedQuery_group_feed_groups_objects_Channel_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type GroupFeedQuery_group_feed_groups_objects_Channel_owner = GroupFeedQuery_group_feed_groups_objects_Channel_owner_Group | GroupFeedQuery_group_feed_groups_objects_Channel_owner_User;

export interface GroupFeedQuery_group_feed_groups_objects_Channel_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface GroupFeedQuery_group_feed_groups_objects_Channel_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface GroupFeedQuery_group_feed_groups_objects_Channel_connection {
  __typename: "Connection";
  created_at: string;
  user: GroupFeedQuery_group_feed_groups_objects_Channel_connection_user | null;
}

export interface GroupFeedQuery_group_feed_groups_objects_Channel_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface GroupFeedQuery_group_feed_groups_objects_Channel {
  __typename: "Channel";
  href: string;
  id: number;
  truncatedTitle: string;
  visibility: string;
  updated_at: string;
  counts: GroupFeedQuery_group_feed_groups_objects_Channel_counts;
  owner: GroupFeedQuery_group_feed_groups_objects_Channel_owner;
  label: string;
  title: string;
  user: GroupFeedQuery_group_feed_groups_objects_Channel_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: GroupFeedQuery_group_feed_groups_objects_Channel_connection | null;
  source: GroupFeedQuery_group_feed_groups_objects_Channel_source | null;
}

export interface GroupFeedQuery_group_feed_groups_objects_Embed_counts {
  __typename: "BlockCounts";
  comments: number;
}

export interface GroupFeedQuery_group_feed_groups_objects_Embed_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface GroupFeedQuery_group_feed_groups_objects_Embed_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface GroupFeedQuery_group_feed_groups_objects_Embed_connection {
  __typename: "Connection";
  created_at: string;
  user: GroupFeedQuery_group_feed_groups_objects_Embed_connection_user | null;
}

export interface GroupFeedQuery_group_feed_groups_objects_Embed_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface GroupFeedQuery_group_feed_groups_objects_Embed {
  __typename: "Embed";
  href: string;
  counts: GroupFeedQuery_group_feed_groups_objects_Embed_counts;
  id: number;
  title: string;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  updated_at: string;
  user: GroupFeedQuery_group_feed_groups_objects_Embed_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: GroupFeedQuery_group_feed_groups_objects_Embed_connection | null;
  source: GroupFeedQuery_group_feed_groups_objects_Embed_source | null;
}

export interface GroupFeedQuery_group_feed_groups_objects_Image_counts {
  __typename: "BlockCounts";
  comments: number;
}

export interface GroupFeedQuery_group_feed_groups_objects_Image_original_dimensions {
  __typename: "Dimensions";
  width: number | null;
  height: number | null;
}

export interface GroupFeedQuery_group_feed_groups_objects_Image_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface GroupFeedQuery_group_feed_groups_objects_Image_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface GroupFeedQuery_group_feed_groups_objects_Image_connection {
  __typename: "Connection";
  created_at: string;
  user: GroupFeedQuery_group_feed_groups_objects_Image_connection_user | null;
}

export interface GroupFeedQuery_group_feed_groups_objects_Image_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface GroupFeedQuery_group_feed_groups_objects_Image {
  __typename: "Image";
  href: string;
  counts: GroupFeedQuery_group_feed_groups_objects_Image_counts;
  id: number;
  title: string;
  alt_text: string | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  original_dimensions: GroupFeedQuery_group_feed_groups_objects_Image_original_dimensions | null;
  updated_at: string;
  user: GroupFeedQuery_group_feed_groups_objects_Image_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: GroupFeedQuery_group_feed_groups_objects_Image_connection | null;
  source: GroupFeedQuery_group_feed_groups_objects_Image_source | null;
}

export interface GroupFeedQuery_group_feed_groups_objects_Link_counts {
  __typename: "BlockCounts";
  comments: number;
}

export interface GroupFeedQuery_group_feed_groups_objects_Link_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface GroupFeedQuery_group_feed_groups_objects_Link_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface GroupFeedQuery_group_feed_groups_objects_Link_connection {
  __typename: "Connection";
  created_at: string;
  user: GroupFeedQuery_group_feed_groups_objects_Link_connection_user | null;
}

export interface GroupFeedQuery_group_feed_groups_objects_Link_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface GroupFeedQuery_group_feed_groups_objects_Link {
  __typename: "Link";
  href: string;
  counts: GroupFeedQuery_group_feed_groups_objects_Link_counts;
  title: string;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  external_url: string | null;
  content: string | null;
  updated_at: string;
  user: GroupFeedQuery_group_feed_groups_objects_Link_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: GroupFeedQuery_group_feed_groups_objects_Link_connection | null;
  source_url: string | null;
  id: number;
  source: GroupFeedQuery_group_feed_groups_objects_Link_source | null;
}

export interface GroupFeedQuery_group_feed_groups_objects_Text_counts {
  __typename: "BlockCounts";
  comments: number;
}

export interface GroupFeedQuery_group_feed_groups_objects_Text_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface GroupFeedQuery_group_feed_groups_objects_Text_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface GroupFeedQuery_group_feed_groups_objects_Text_connection {
  __typename: "Connection";
  created_at: string;
  user: GroupFeedQuery_group_feed_groups_objects_Text_connection_user | null;
}

export interface GroupFeedQuery_group_feed_groups_objects_Text_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface GroupFeedQuery_group_feed_groups_objects_Text {
  __typename: "Text";
  href: string;
  counts: GroupFeedQuery_group_feed_groups_objects_Text_counts;
  id: number;
  title: string;
  content: string;
  raw: string;
  updated_at: string;
  user: GroupFeedQuery_group_feed_groups_objects_Text_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: GroupFeedQuery_group_feed_groups_objects_Text_connection | null;
  source: GroupFeedQuery_group_feed_groups_objects_Text_source | null;
}

export interface GroupFeedQuery_group_feed_groups_objects_Group {
  __typename: "Group";
  id: number;
  name: string;
  href: string;
  visibility: string;
  label: string;
  initials: string;
  avatar: string | null;
}

export interface GroupFeedQuery_group_feed_groups_objects_User {
  __typename: "User";
  id: number;
  name: string;
  href: string;
  label: string;
  initials: string;
  avatar: string | null;
}

export type GroupFeedQuery_group_feed_groups_objects = GroupFeedQuery_group_feed_groups_objects_Comment | GroupFeedQuery_group_feed_groups_objects_Attachment | GroupFeedQuery_group_feed_groups_objects_Channel | GroupFeedQuery_group_feed_groups_objects_Embed | GroupFeedQuery_group_feed_groups_objects_Image | GroupFeedQuery_group_feed_groups_objects_Link | GroupFeedQuery_group_feed_groups_objects_Text | GroupFeedQuery_group_feed_groups_objects_Group | GroupFeedQuery_group_feed_groups_objects_User;

export interface GroupFeedQuery_group_feed_groups {
  __typename: "DeedGroup";
  id: string;
  key: string;
  length: number;
  user: GroupFeedQuery_group_feed_groups_user | null;
  owner: GroupFeedQuery_group_feed_groups_owner;
  action: string;
  item: GroupFeedQuery_group_feed_groups_item | null;
  item_phrase: string;
  connector: string | null;
  target: GroupFeedQuery_group_feed_groups_target | null;
  target_phrase: string;
  created_at: string | null;
  is_private: boolean;
  objects: GroupFeedQuery_group_feed_groups_objects[];
}

export interface GroupFeedQuery_group_feed {
  __typename: "Feed";
  groups: GroupFeedQuery_group_feed_groups[];
}

export interface GroupFeedQuery_group {
  __typename: "Group";
  id: number;
  name: string;
  feed: GroupFeedQuery_group_feed | null;
}

export interface GroupFeedQuery {
  group: GroupFeedQuery_group | null;
}

export interface GroupFeedQueryVariables {
  id: string;
  offset?: number | null;
  limit?: number | null;
}
