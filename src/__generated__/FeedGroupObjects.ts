/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FeedGroupObjects
// ====================================================

export interface FeedGroupObjects_objects_Comment {
  __typename: "Comment";
}

export interface FeedGroupObjects_objects_Channel_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface FeedGroupObjects_objects_Channel_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  visibility: string | null;
}

export interface FeedGroupObjects_objects_Channel_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export type FeedGroupObjects_objects_Channel_owner = FeedGroupObjects_objects_Channel_owner_Group | FeedGroupObjects_objects_Channel_owner_User;

export interface FeedGroupObjects_objects_Channel_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface FeedGroupObjects_objects_Channel_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface FeedGroupObjects_objects_Channel_connection {
  __typename: "Connection";
  created_at: string | null;
  user: FeedGroupObjects_objects_Channel_connection_user | null;
}

export interface FeedGroupObjects_objects_Channel_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface FeedGroupObjects_objects_Channel {
  __typename: "Channel";
  href: string | null;
  id: number | null;
  truncatedTitle: string | null;
  visibility: string | null;
  updated_at: string | null;
  counts: FeedGroupObjects_objects_Channel_counts | null;
  owner: FeedGroupObjects_objects_Channel_owner | null;
  label: string | null;
  title: string | null;
  user: FeedGroupObjects_objects_Channel_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: FeedGroupObjects_objects_Channel_connection | null;
  source: FeedGroupObjects_objects_Channel_source | null;
}

export interface FeedGroupObjects_objects_Text_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface FeedGroupObjects_objects_Text_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface FeedGroupObjects_objects_Text_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface FeedGroupObjects_objects_Text_connection {
  __typename: "Connection";
  created_at: string | null;
  user: FeedGroupObjects_objects_Text_connection_user | null;
}

export interface FeedGroupObjects_objects_Text_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface FeedGroupObjects_objects_Text {
  __typename: "Text";
  href: string | null;
  counts: FeedGroupObjects_objects_Text_counts | null;
  id: number | null;
  title: string | null;
  content: string | null;
  updated_at: string | null;
  user: FeedGroupObjects_objects_Text_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: FeedGroupObjects_objects_Text_connection | null;
  source: FeedGroupObjects_objects_Text_source | null;
}

export interface FeedGroupObjects_objects_Image_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface FeedGroupObjects_objects_Image_original_dimensions {
  __typename: "Dimensions";
  width: number | null;
  height: number | null;
}

export interface FeedGroupObjects_objects_Image_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface FeedGroupObjects_objects_Image_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface FeedGroupObjects_objects_Image_connection {
  __typename: "Connection";
  created_at: string | null;
  user: FeedGroupObjects_objects_Image_connection_user | null;
}

export interface FeedGroupObjects_objects_Image_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface FeedGroupObjects_objects_Image {
  __typename: "Image";
  href: string | null;
  counts: FeedGroupObjects_objects_Image_counts | null;
  id: number | null;
  title: string | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  original_dimensions: FeedGroupObjects_objects_Image_original_dimensions | null;
  updated_at: string | null;
  user: FeedGroupObjects_objects_Image_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: FeedGroupObjects_objects_Image_connection | null;
  source: FeedGroupObjects_objects_Image_source | null;
}

export interface FeedGroupObjects_objects_Link_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface FeedGroupObjects_objects_Link_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface FeedGroupObjects_objects_Link_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface FeedGroupObjects_objects_Link_connection {
  __typename: "Connection";
  created_at: string | null;
  user: FeedGroupObjects_objects_Link_connection_user | null;
}

export interface FeedGroupObjects_objects_Link_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface FeedGroupObjects_objects_Link {
  __typename: "Link";
  href: string | null;
  counts: FeedGroupObjects_objects_Link_counts | null;
  title: string | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  external_url: string | null;
  updated_at: string | null;
  user: FeedGroupObjects_objects_Link_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: FeedGroupObjects_objects_Link_connection | null;
  id: number | null;
  source: FeedGroupObjects_objects_Link_source | null;
}

export interface FeedGroupObjects_objects_Embed_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface FeedGroupObjects_objects_Embed_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface FeedGroupObjects_objects_Embed_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface FeedGroupObjects_objects_Embed_connection {
  __typename: "Connection";
  created_at: string | null;
  user: FeedGroupObjects_objects_Embed_connection_user | null;
}

export interface FeedGroupObjects_objects_Embed_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface FeedGroupObjects_objects_Embed {
  __typename: "Embed";
  href: string | null;
  counts: FeedGroupObjects_objects_Embed_counts | null;
  id: number | null;
  title: string | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  updated_at: string | null;
  user: FeedGroupObjects_objects_Embed_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: FeedGroupObjects_objects_Embed_connection | null;
  source: FeedGroupObjects_objects_Embed_source | null;
}

export interface FeedGroupObjects_objects_Attachment_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface FeedGroupObjects_objects_Attachment_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface FeedGroupObjects_objects_Attachment_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface FeedGroupObjects_objects_Attachment_connection {
  __typename: "Connection";
  created_at: string | null;
  user: FeedGroupObjects_objects_Attachment_connection_user | null;
}

export interface FeedGroupObjects_objects_Attachment_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface FeedGroupObjects_objects_Attachment {
  __typename: "Attachment";
  href: string | null;
  counts: FeedGroupObjects_objects_Attachment_counts | null;
  id: number | null;
  title: string | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  file_extension: string | null;
  updated_at: string | null;
  user: FeedGroupObjects_objects_Attachment_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: FeedGroupObjects_objects_Attachment_connection | null;
  source: FeedGroupObjects_objects_Attachment_source | null;
}

export interface FeedGroupObjects_objects_User {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
  label: string | null;
  initials: string | null;
  avatar: string | null;
}

export interface FeedGroupObjects_objects_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  href: string | null;
  visibility: string | null;
  label: string | null;
  initials: string | null;
  avatar: string | null;
}

export type FeedGroupObjects_objects = FeedGroupObjects_objects_Comment | FeedGroupObjects_objects_Channel | FeedGroupObjects_objects_Text | FeedGroupObjects_objects_Image | FeedGroupObjects_objects_Link | FeedGroupObjects_objects_Embed | FeedGroupObjects_objects_Attachment | FeedGroupObjects_objects_User | FeedGroupObjects_objects_Group;

export interface FeedGroupObjects {
  __typename: "DeedGroup";
  objects: (FeedGroupObjects_objects | null)[] | null;
}
