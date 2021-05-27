/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FeedQuery
// ====================================================

export interface FeedQuery_me_feed_groups_user {
  __typename: "User";
  id: number | null;
  label: string | null;
  name: string | null;
  href: string | null;
}

export interface FeedQuery_me_feed_groups_owner_User {
  __typename: "User";
  id: number | null;
  label: string | null;
  name: string | null;
  href: string | null;
}

export interface FeedQuery_me_feed_groups_owner_Group {
  __typename: "Group";
  id: number | null;
  label: string | null;
  name: string | null;
}

export type FeedQuery_me_feed_groups_owner = FeedQuery_me_feed_groups_owner_User | FeedQuery_me_feed_groups_owner_Group;

export interface FeedQuery_me_feed_groups_item_Null {
  __typename: "Null";
}

export interface FeedQuery_me_feed_groups_item_Channel_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface FeedQuery_me_feed_groups_item_Channel_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
}

export type FeedQuery_me_feed_groups_item_Channel_owner = FeedQuery_me_feed_groups_item_Channel_owner_User | FeedQuery_me_feed_groups_item_Channel_owner_Group;

export interface FeedQuery_me_feed_groups_item_Channel {
  __typename: "Channel";
  id: number | null;
  truncatedTitle: string | null;
  href: string | null;
  visibility: string | null;
  label: string | null;
  owner: FeedQuery_me_feed_groups_item_Channel_owner | null;
}

export interface FeedQuery_me_feed_groups_item_Connectable {
  __typename: "Connectable";
  id: number | null;
  label: string | null;
  href: string | null;
}

export interface FeedQuery_me_feed_groups_item_User {
  __typename: "User";
  id: number | null;
  label: string | null;
  name: string | null;
  href: string | null;
}

export interface FeedQuery_me_feed_groups_item_Comment {
  __typename: "Comment";
  id: number | null;
  body: string | null;
  href: string | null;
}

export interface FeedQuery_me_feed_groups_item_Group {
  __typename: "Group";
  id: number | null;
  label: string | null;
  name: string | null;
  href: string | null;
}

export type FeedQuery_me_feed_groups_item = FeedQuery_me_feed_groups_item_Null | FeedQuery_me_feed_groups_item_Channel | FeedQuery_me_feed_groups_item_Connectable | FeedQuery_me_feed_groups_item_User | FeedQuery_me_feed_groups_item_Comment | FeedQuery_me_feed_groups_item_Group;

export interface FeedQuery_me_feed_groups_target_Null {
  __typename: "Null";
}

export interface FeedQuery_me_feed_groups_target_Channel_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface FeedQuery_me_feed_groups_target_Channel_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
}

export type FeedQuery_me_feed_groups_target_Channel_owner = FeedQuery_me_feed_groups_target_Channel_owner_User | FeedQuery_me_feed_groups_target_Channel_owner_Group;

export interface FeedQuery_me_feed_groups_target_Channel {
  __typename: "Channel";
  id: number | null;
  truncatedTitle: string | null;
  href: string | null;
  visibility: string | null;
  label: string | null;
  owner: FeedQuery_me_feed_groups_target_Channel_owner | null;
}

export interface FeedQuery_me_feed_groups_target_Connectable {
  __typename: "Connectable";
  id: number | null;
  label: string | null;
  href: string | null;
}

export interface FeedQuery_me_feed_groups_target_User {
  __typename: "User";
  id: number | null;
  label: string | null;
  name: string | null;
  href: string | null;
}

export interface FeedQuery_me_feed_groups_target_Comment {
  __typename: "Comment";
  id: number | null;
  body: string | null;
  href: string | null;
}

export interface FeedQuery_me_feed_groups_target_Group {
  __typename: "Group";
  id: number | null;
  label: string | null;
  name: string | null;
  href: string | null;
}

export type FeedQuery_me_feed_groups_target = FeedQuery_me_feed_groups_target_Null | FeedQuery_me_feed_groups_target_Channel | FeedQuery_me_feed_groups_target_Connectable | FeedQuery_me_feed_groups_target_User | FeedQuery_me_feed_groups_target_Comment | FeedQuery_me_feed_groups_target_Group;

export interface FeedQuery_me_feed_groups_objects_Comment {
  __typename: "Comment";
}

export interface FeedQuery_me_feed_groups_objects_Channel_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface FeedQuery_me_feed_groups_objects_Channel_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  visibility: string | null;
}

export interface FeedQuery_me_feed_groups_objects_Channel_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export type FeedQuery_me_feed_groups_objects_Channel_owner = FeedQuery_me_feed_groups_objects_Channel_owner_Group | FeedQuery_me_feed_groups_objects_Channel_owner_User;

export interface FeedQuery_me_feed_groups_objects_Channel_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface FeedQuery_me_feed_groups_objects_Channel_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface FeedQuery_me_feed_groups_objects_Channel_connection {
  __typename: "Connection";
  created_at: string | null;
  user: FeedQuery_me_feed_groups_objects_Channel_connection_user | null;
}

export interface FeedQuery_me_feed_groups_objects_Channel_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface FeedQuery_me_feed_groups_objects_Channel {
  __typename: "Channel";
  href: string | null;
  id: number | null;
  truncatedTitle: string | null;
  visibility: string | null;
  updated_at: string | null;
  counts: FeedQuery_me_feed_groups_objects_Channel_counts | null;
  owner: FeedQuery_me_feed_groups_objects_Channel_owner | null;
  label: string | null;
  title: string | null;
  user: FeedQuery_me_feed_groups_objects_Channel_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: FeedQuery_me_feed_groups_objects_Channel_connection | null;
  source: FeedQuery_me_feed_groups_objects_Channel_source | null;
}

export interface FeedQuery_me_feed_groups_objects_Text_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface FeedQuery_me_feed_groups_objects_Text_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface FeedQuery_me_feed_groups_objects_Text_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface FeedQuery_me_feed_groups_objects_Text_connection {
  __typename: "Connection";
  created_at: string | null;
  user: FeedQuery_me_feed_groups_objects_Text_connection_user | null;
}

export interface FeedQuery_me_feed_groups_objects_Text_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface FeedQuery_me_feed_groups_objects_Text {
  __typename: "Text";
  href: string | null;
  counts: FeedQuery_me_feed_groups_objects_Text_counts | null;
  id: number | null;
  title: string | null;
  content: string | null;
  updated_at: string | null;
  user: FeedQuery_me_feed_groups_objects_Text_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: FeedQuery_me_feed_groups_objects_Text_connection | null;
  source: FeedQuery_me_feed_groups_objects_Text_source | null;
}

export interface FeedQuery_me_feed_groups_objects_Image_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface FeedQuery_me_feed_groups_objects_Image_original_dimensions {
  __typename: "Dimensions";
  width: number | null;
  height: number | null;
}

export interface FeedQuery_me_feed_groups_objects_Image_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface FeedQuery_me_feed_groups_objects_Image_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface FeedQuery_me_feed_groups_objects_Image_connection {
  __typename: "Connection";
  created_at: string | null;
  user: FeedQuery_me_feed_groups_objects_Image_connection_user | null;
}

export interface FeedQuery_me_feed_groups_objects_Image_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface FeedQuery_me_feed_groups_objects_Image {
  __typename: "Image";
  href: string | null;
  counts: FeedQuery_me_feed_groups_objects_Image_counts | null;
  id: number | null;
  title: string | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  original_dimensions: FeedQuery_me_feed_groups_objects_Image_original_dimensions | null;
  updated_at: string | null;
  user: FeedQuery_me_feed_groups_objects_Image_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: FeedQuery_me_feed_groups_objects_Image_connection | null;
  source: FeedQuery_me_feed_groups_objects_Image_source | null;
}

export interface FeedQuery_me_feed_groups_objects_Link_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface FeedQuery_me_feed_groups_objects_Link_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface FeedQuery_me_feed_groups_objects_Link_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface FeedQuery_me_feed_groups_objects_Link_connection {
  __typename: "Connection";
  created_at: string | null;
  user: FeedQuery_me_feed_groups_objects_Link_connection_user | null;
}

export interface FeedQuery_me_feed_groups_objects_Link_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface FeedQuery_me_feed_groups_objects_Link {
  __typename: "Link";
  href: string | null;
  counts: FeedQuery_me_feed_groups_objects_Link_counts | null;
  title: string | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  external_url: string | null;
  updated_at: string | null;
  user: FeedQuery_me_feed_groups_objects_Link_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: FeedQuery_me_feed_groups_objects_Link_connection | null;
  id: number | null;
  source: FeedQuery_me_feed_groups_objects_Link_source | null;
}

export interface FeedQuery_me_feed_groups_objects_Embed_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface FeedQuery_me_feed_groups_objects_Embed_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface FeedQuery_me_feed_groups_objects_Embed_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface FeedQuery_me_feed_groups_objects_Embed_connection {
  __typename: "Connection";
  created_at: string | null;
  user: FeedQuery_me_feed_groups_objects_Embed_connection_user | null;
}

export interface FeedQuery_me_feed_groups_objects_Embed_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface FeedQuery_me_feed_groups_objects_Embed {
  __typename: "Embed";
  href: string | null;
  counts: FeedQuery_me_feed_groups_objects_Embed_counts | null;
  id: number | null;
  title: string | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  updated_at: string | null;
  user: FeedQuery_me_feed_groups_objects_Embed_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: FeedQuery_me_feed_groups_objects_Embed_connection | null;
  source: FeedQuery_me_feed_groups_objects_Embed_source | null;
}

export interface FeedQuery_me_feed_groups_objects_Attachment_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface FeedQuery_me_feed_groups_objects_Attachment_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface FeedQuery_me_feed_groups_objects_Attachment_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface FeedQuery_me_feed_groups_objects_Attachment_connection {
  __typename: "Connection";
  created_at: string | null;
  user: FeedQuery_me_feed_groups_objects_Attachment_connection_user | null;
}

export interface FeedQuery_me_feed_groups_objects_Attachment_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface FeedQuery_me_feed_groups_objects_Attachment {
  __typename: "Attachment";
  href: string | null;
  counts: FeedQuery_me_feed_groups_objects_Attachment_counts | null;
  id: number | null;
  title: string | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  file_extension: string | null;
  updated_at: string | null;
  user: FeedQuery_me_feed_groups_objects_Attachment_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: FeedQuery_me_feed_groups_objects_Attachment_connection | null;
  source: FeedQuery_me_feed_groups_objects_Attachment_source | null;
}

export interface FeedQuery_me_feed_groups_objects_User {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
  label: string | null;
  initials: string | null;
  avatar: string | null;
}

export interface FeedQuery_me_feed_groups_objects_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  href: string | null;
  visibility: string | null;
  label: string | null;
  initials: string | null;
  avatar: string | null;
}

export type FeedQuery_me_feed_groups_objects = FeedQuery_me_feed_groups_objects_Comment | FeedQuery_me_feed_groups_objects_Channel | FeedQuery_me_feed_groups_objects_Text | FeedQuery_me_feed_groups_objects_Image | FeedQuery_me_feed_groups_objects_Link | FeedQuery_me_feed_groups_objects_Embed | FeedQuery_me_feed_groups_objects_Attachment | FeedQuery_me_feed_groups_objects_User | FeedQuery_me_feed_groups_objects_Group;

export interface FeedQuery_me_feed_groups {
  __typename: "DeedGroup";
  id: string | null;
  key: string | null;
  length: number | null;
  user: FeedQuery_me_feed_groups_user | null;
  owner: FeedQuery_me_feed_groups_owner | null;
  action: string | null;
  item: FeedQuery_me_feed_groups_item | null;
  item_phrase: string | null;
  connector: string | null;
  target: FeedQuery_me_feed_groups_target | null;
  target_phrase: string | null;
  created_at: string | null;
  is_private: boolean | null;
  objects: (FeedQuery_me_feed_groups_objects | null)[] | null;
}

export interface FeedQuery_me_feed {
  __typename: "Feed";
  groups: (FeedQuery_me_feed_groups | null)[] | null;
}

export interface FeedQuery_me {
  __typename: "Me";
  id: number | null;
  feed: FeedQuery_me_feed | null;
}

export interface FeedQuery {
  /**
   * The current logged in user
   */
  me: FeedQuery_me | null;
}

export interface FeedQueryVariables {
  offset?: number | null;
  limit?: number | null;
  type?: string | null;
}
