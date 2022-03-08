/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FeedGroup
// ====================================================

export interface FeedGroup_user {
  __typename: "User";
  id: number;
  label: string;
  name: string;
  href: string | null;
}

export interface FeedGroup_owner_User {
  __typename: "User";
  id: number;
  label: string;
  name: string;
  href: string | null;
}

export interface FeedGroup_owner_Group {
  __typename: "Group";
  id: number;
  label: string;
  href: string | null;
  name: string;
}

export type FeedGroup_owner = FeedGroup_owner_User | FeedGroup_owner_Group;

export interface FeedGroup_item_Channel_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export interface FeedGroup_item_Channel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
}

export type FeedGroup_item_Channel_owner = FeedGroup_item_Channel_owner_User | FeedGroup_item_Channel_owner_Group;

export interface FeedGroup_item_Channel {
  __typename: "Channel";
  id: number;
  truncatedTitle: string;
  href: string | null;
  visibility: string;
  label: string;
  owner: FeedGroup_item_Channel_owner;
}

export interface FeedGroup_item_User {
  __typename: "User";
  id: number;
  label: string;
  name: string;
  href: string | null;
}

export interface FeedGroup_item_Connectable {
  __typename: "Connectable";
  id: number;
  label: string;
  href: string | null;
}

export interface FeedGroup_item_Attachment {
  __typename: "Attachment";
  id: number;
  label: string;
  href: string | null;
}

export interface FeedGroup_item_Embed {
  __typename: "Embed";
  id: number;
  label: string;
  href: string | null;
}

export interface FeedGroup_item_Text {
  __typename: "Text";
  id: number;
  label: string;
  href: string | null;
}

export interface FeedGroup_item_Image {
  __typename: "Image";
  id: number;
  label: string;
  href: string | null;
}

export interface FeedGroup_item_Link {
  __typename: "Link";
  id: number;
  label: string;
  href: string | null;
}

export interface FeedGroup_item_Comment {
  __typename: "Comment";
  id: number;
  body: string | null;
  href: string | null;
}

export interface FeedGroup_item_Group {
  __typename: "Group";
  id: number;
  label: string;
  name: string;
  href: string | null;
}

export type FeedGroup_item = FeedGroup_item_Channel | FeedGroup_item_User | FeedGroup_item_Connectable | FeedGroup_item_Attachment | FeedGroup_item_Embed | FeedGroup_item_Text | FeedGroup_item_Image | FeedGroup_item_Link | FeedGroup_item_Comment | FeedGroup_item_Group;

export interface FeedGroup_target_Channel_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export interface FeedGroup_target_Channel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
}

export type FeedGroup_target_Channel_owner = FeedGroup_target_Channel_owner_User | FeedGroup_target_Channel_owner_Group;

export interface FeedGroup_target_Channel {
  __typename: "Channel";
  id: number;
  truncatedTitle: string;
  href: string | null;
  visibility: string;
  label: string;
  owner: FeedGroup_target_Channel_owner;
}

export interface FeedGroup_target_User {
  __typename: "User";
  id: number;
  label: string;
  name: string;
  href: string | null;
}

export interface FeedGroup_target_Connectable {
  __typename: "Connectable";
  id: number;
  label: string;
  href: string | null;
}

export interface FeedGroup_target_Attachment {
  __typename: "Attachment";
  id: number;
  label: string;
  href: string | null;
}

export interface FeedGroup_target_Embed {
  __typename: "Embed";
  id: number;
  label: string;
  href: string | null;
}

export interface FeedGroup_target_Text {
  __typename: "Text";
  id: number;
  label: string;
  href: string | null;
}

export interface FeedGroup_target_Image {
  __typename: "Image";
  id: number;
  label: string;
  href: string | null;
}

export interface FeedGroup_target_Link {
  __typename: "Link";
  id: number;
  label: string;
  href: string | null;
}

export interface FeedGroup_target_Comment {
  __typename: "Comment";
  id: number;
  body: string | null;
  href: string | null;
}

export interface FeedGroup_target_Group {
  __typename: "Group";
  id: number;
  label: string;
  name: string;
  href: string | null;
}

export type FeedGroup_target = FeedGroup_target_Channel | FeedGroup_target_User | FeedGroup_target_Connectable | FeedGroup_target_Attachment | FeedGroup_target_Embed | FeedGroup_target_Text | FeedGroup_target_Image | FeedGroup_target_Link | FeedGroup_target_Comment | FeedGroup_target_Group;

export interface FeedGroup_objects_Comment {
  __typename: "Comment";
}

export interface FeedGroup_objects_Attachment_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface FeedGroup_objects_Attachment_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface FeedGroup_objects_Attachment_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface FeedGroup_objects_Attachment_connection {
  __typename: "Connection";
  created_at: string | null;
  user: FeedGroup_objects_Attachment_connection_user | null;
}

export interface FeedGroup_objects_Attachment_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface FeedGroup_objects_Attachment {
  __typename: "Attachment";
  href: string | null;
  counts: FeedGroup_objects_Attachment_counts | null;
  id: number;
  title: string;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  file_extension: string | null;
  updated_at: string | null;
  user: FeedGroup_objects_Attachment_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: FeedGroup_objects_Attachment_connection | null;
  source: FeedGroup_objects_Attachment_source | null;
}

export interface FeedGroup_objects_Channel_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface FeedGroup_objects_Channel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface FeedGroup_objects_Channel_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type FeedGroup_objects_Channel_owner = FeedGroup_objects_Channel_owner_Group | FeedGroup_objects_Channel_owner_User;

export interface FeedGroup_objects_Channel_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface FeedGroup_objects_Channel_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface FeedGroup_objects_Channel_connection {
  __typename: "Connection";
  created_at: string | null;
  user: FeedGroup_objects_Channel_connection_user | null;
}

export interface FeedGroup_objects_Channel_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface FeedGroup_objects_Channel {
  __typename: "Channel";
  href: string | null;
  id: number;
  truncatedTitle: string;
  visibility: string;
  updated_at: string | null;
  counts: FeedGroup_objects_Channel_counts | null;
  owner: FeedGroup_objects_Channel_owner;
  label: string;
  title: string;
  user: FeedGroup_objects_Channel_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: FeedGroup_objects_Channel_connection | null;
  source: FeedGroup_objects_Channel_source | null;
}

export interface FeedGroup_objects_Embed_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface FeedGroup_objects_Embed_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface FeedGroup_objects_Embed_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface FeedGroup_objects_Embed_connection {
  __typename: "Connection";
  created_at: string | null;
  user: FeedGroup_objects_Embed_connection_user | null;
}

export interface FeedGroup_objects_Embed_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface FeedGroup_objects_Embed {
  __typename: "Embed";
  href: string | null;
  counts: FeedGroup_objects_Embed_counts | null;
  id: number;
  title: string;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  updated_at: string | null;
  user: FeedGroup_objects_Embed_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: FeedGroup_objects_Embed_connection | null;
  source: FeedGroup_objects_Embed_source | null;
}

export interface FeedGroup_objects_Image_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface FeedGroup_objects_Image_original_dimensions {
  __typename: "Dimensions";
  width: number | null;
  height: number | null;
}

export interface FeedGroup_objects_Image_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface FeedGroup_objects_Image_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface FeedGroup_objects_Image_connection {
  __typename: "Connection";
  created_at: string | null;
  user: FeedGroup_objects_Image_connection_user | null;
}

export interface FeedGroup_objects_Image_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface FeedGroup_objects_Image {
  __typename: "Image";
  href: string | null;
  counts: FeedGroup_objects_Image_counts | null;
  id: number;
  title: string;
  alt_text: string | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  original_dimensions: FeedGroup_objects_Image_original_dimensions | null;
  updated_at: string | null;
  user: FeedGroup_objects_Image_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: FeedGroup_objects_Image_connection | null;
  source: FeedGroup_objects_Image_source | null;
}

export interface FeedGroup_objects_Link_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface FeedGroup_objects_Link_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface FeedGroup_objects_Link_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface FeedGroup_objects_Link_connection {
  __typename: "Connection";
  created_at: string | null;
  user: FeedGroup_objects_Link_connection_user | null;
}

export interface FeedGroup_objects_Link_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface FeedGroup_objects_Link {
  __typename: "Link";
  href: string | null;
  counts: FeedGroup_objects_Link_counts | null;
  title: string;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  external_url: string | null;
  updated_at: string | null;
  user: FeedGroup_objects_Link_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: FeedGroup_objects_Link_connection | null;
  id: number;
  source: FeedGroup_objects_Link_source | null;
}

export interface FeedGroup_objects_Text_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface FeedGroup_objects_Text_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface FeedGroup_objects_Text_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface FeedGroup_objects_Text_connection {
  __typename: "Connection";
  created_at: string | null;
  user: FeedGroup_objects_Text_connection_user | null;
}

export interface FeedGroup_objects_Text_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface FeedGroup_objects_Text {
  __typename: "Text";
  href: string | null;
  counts: FeedGroup_objects_Text_counts | null;
  id: number;
  title: string;
  content: string;
  updated_at: string | null;
  user: FeedGroup_objects_Text_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: FeedGroup_objects_Text_connection | null;
  source: FeedGroup_objects_Text_source | null;
}

export interface FeedGroup_objects_Group {
  __typename: "Group";
  id: number;
  name: string;
  href: string | null;
  visibility: string;
  label: string;
  initials: string;
  avatar: string | null;
}

export interface FeedGroup_objects_User {
  __typename: "User";
  id: number;
  name: string;
  href: string | null;
  label: string;
  initials: string;
  avatar: string | null;
}

export type FeedGroup_objects = FeedGroup_objects_Comment | FeedGroup_objects_Attachment | FeedGroup_objects_Channel | FeedGroup_objects_Embed | FeedGroup_objects_Image | FeedGroup_objects_Link | FeedGroup_objects_Text | FeedGroup_objects_Group | FeedGroup_objects_User;

export interface FeedGroup {
  __typename: "DeedGroup";
  id: string;
  key: string;
  length: number;
  user: FeedGroup_user | null;
  owner: FeedGroup_owner;
  action: string;
  item: FeedGroup_item | null;
  item_phrase: string;
  connector: string | null;
  target: FeedGroup_target | null;
  target_phrase: string;
  created_at: string | null;
  is_private: boolean;
  objects: FeedGroup_objects[] | null;
}
