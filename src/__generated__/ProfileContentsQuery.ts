/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ConnectableTypeEnum, SearchSorts } from "./globalTypes";

// ====================================================
// GraphQL query operation: ProfileContentsQuery
// ====================================================

export interface ProfileContentsQuery_identity_identifiable_Group {
  __typename: "Group";
}

export interface ProfileContentsQuery_identity_identifiable_User_contents_Attachment_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ProfileContentsQuery_identity_identifiable_User_contents_Attachment_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ProfileContentsQuery_identity_identifiable_User_contents_Attachment_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ProfileContentsQuery_identity_identifiable_User_contents_Attachment_connection_user | null;
}

export interface ProfileContentsQuery_identity_identifiable_User_contents_Attachment_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ProfileContentsQuery_identity_identifiable_User_contents_Attachment_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ProfileContentsQuery_identity_identifiable_User_contents_Attachment {
  __typename: "Attachment";
  id: number;
  href: string | null;
  updated_at: string | null;
  title: string;
  user: ProfileContentsQuery_identity_identifiable_User_contents_Attachment_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileContentsQuery_identity_identifiable_User_contents_Attachment_connection | null;
  source: ProfileContentsQuery_identity_identifiable_User_contents_Attachment_source | null;
  counts: ProfileContentsQuery_identity_identifiable_User_contents_Attachment_counts | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  file_extension: string | null;
}

export interface ProfileContentsQuery_identity_identifiable_User_contents_Embed_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ProfileContentsQuery_identity_identifiable_User_contents_Embed_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ProfileContentsQuery_identity_identifiable_User_contents_Embed_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ProfileContentsQuery_identity_identifiable_User_contents_Embed_connection_user | null;
}

export interface ProfileContentsQuery_identity_identifiable_User_contents_Embed_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ProfileContentsQuery_identity_identifiable_User_contents_Embed_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ProfileContentsQuery_identity_identifiable_User_contents_Embed {
  __typename: "Embed";
  id: number;
  href: string | null;
  updated_at: string | null;
  title: string;
  user: ProfileContentsQuery_identity_identifiable_User_contents_Embed_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileContentsQuery_identity_identifiable_User_contents_Embed_connection | null;
  source: ProfileContentsQuery_identity_identifiable_User_contents_Embed_source | null;
  counts: ProfileContentsQuery_identity_identifiable_User_contents_Embed_counts | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
}

export interface ProfileContentsQuery_identity_identifiable_User_contents_Image_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ProfileContentsQuery_identity_identifiable_User_contents_Image_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ProfileContentsQuery_identity_identifiable_User_contents_Image_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ProfileContentsQuery_identity_identifiable_User_contents_Image_connection_user | null;
}

export interface ProfileContentsQuery_identity_identifiable_User_contents_Image_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ProfileContentsQuery_identity_identifiable_User_contents_Image_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ProfileContentsQuery_identity_identifiable_User_contents_Image_original_dimensions {
  __typename: "Dimensions";
  width: number | null;
  height: number | null;
}

export interface ProfileContentsQuery_identity_identifiable_User_contents_Image {
  __typename: "Image";
  id: number;
  href: string | null;
  updated_at: string | null;
  title: string;
  user: ProfileContentsQuery_identity_identifiable_User_contents_Image_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileContentsQuery_identity_identifiable_User_contents_Image_connection | null;
  source: ProfileContentsQuery_identity_identifiable_User_contents_Image_source | null;
  counts: ProfileContentsQuery_identity_identifiable_User_contents_Image_counts | null;
  alt_text: string | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  original_dimensions: ProfileContentsQuery_identity_identifiable_User_contents_Image_original_dimensions | null;
}

export interface ProfileContentsQuery_identity_identifiable_User_contents_Link_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ProfileContentsQuery_identity_identifiable_User_contents_Link_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ProfileContentsQuery_identity_identifiable_User_contents_Link_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ProfileContentsQuery_identity_identifiable_User_contents_Link_connection_user | null;
}

export interface ProfileContentsQuery_identity_identifiable_User_contents_Link_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ProfileContentsQuery_identity_identifiable_User_contents_Link_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ProfileContentsQuery_identity_identifiable_User_contents_Link {
  __typename: "Link";
  id: number;
  href: string | null;
  updated_at: string | null;
  title: string;
  user: ProfileContentsQuery_identity_identifiable_User_contents_Link_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileContentsQuery_identity_identifiable_User_contents_Link_connection | null;
  source: ProfileContentsQuery_identity_identifiable_User_contents_Link_source | null;
  counts: ProfileContentsQuery_identity_identifiable_User_contents_Link_counts | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  external_url: string | null;
}

export interface ProfileContentsQuery_identity_identifiable_User_contents_PendingBlock_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ProfileContentsQuery_identity_identifiable_User_contents_PendingBlock_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ProfileContentsQuery_identity_identifiable_User_contents_PendingBlock_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ProfileContentsQuery_identity_identifiable_User_contents_PendingBlock_connection_user | null;
}

export interface ProfileContentsQuery_identity_identifiable_User_contents_PendingBlock_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ProfileContentsQuery_identity_identifiable_User_contents_PendingBlock_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ProfileContentsQuery_identity_identifiable_User_contents_PendingBlock {
  __typename: "PendingBlock";
  id: number;
  href: string | null;
  updated_at: string | null;
  title: string;
  user: ProfileContentsQuery_identity_identifiable_User_contents_PendingBlock_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileContentsQuery_identity_identifiable_User_contents_PendingBlock_connection | null;
  source: ProfileContentsQuery_identity_identifiable_User_contents_PendingBlock_source | null;
  counts: ProfileContentsQuery_identity_identifiable_User_contents_PendingBlock_counts | null;
}

export interface ProfileContentsQuery_identity_identifiable_User_contents_Text_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ProfileContentsQuery_identity_identifiable_User_contents_Text_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ProfileContentsQuery_identity_identifiable_User_contents_Text_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ProfileContentsQuery_identity_identifiable_User_contents_Text_connection_user | null;
}

export interface ProfileContentsQuery_identity_identifiable_User_contents_Text_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ProfileContentsQuery_identity_identifiable_User_contents_Text_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface ProfileContentsQuery_identity_identifiable_User_contents_Text {
  __typename: "Text";
  id: number;
  href: string | null;
  updated_at: string | null;
  title: string;
  user: ProfileContentsQuery_identity_identifiable_User_contents_Text_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileContentsQuery_identity_identifiable_User_contents_Text_connection | null;
  source: ProfileContentsQuery_identity_identifiable_User_contents_Text_source | null;
  counts: ProfileContentsQuery_identity_identifiable_User_contents_Text_counts | null;
  content: string;
}

export interface ProfileContentsQuery_identity_identifiable_User_contents_Channel_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ProfileContentsQuery_identity_identifiable_User_contents_Channel_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ProfileContentsQuery_identity_identifiable_User_contents_Channel_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ProfileContentsQuery_identity_identifiable_User_contents_Channel_connection_user | null;
}

export interface ProfileContentsQuery_identity_identifiable_User_contents_Channel_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ProfileContentsQuery_identity_identifiable_User_contents_Channel_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface ProfileContentsQuery_identity_identifiable_User_contents_Channel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface ProfileContentsQuery_identity_identifiable_User_contents_Channel_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type ProfileContentsQuery_identity_identifiable_User_contents_Channel_owner = ProfileContentsQuery_identity_identifiable_User_contents_Channel_owner_Group | ProfileContentsQuery_identity_identifiable_User_contents_Channel_owner_User;

export interface ProfileContentsQuery_identity_identifiable_User_contents_Channel {
  __typename: "Channel";
  id: number;
  href: string | null;
  updated_at: string | null;
  title: string;
  user: ProfileContentsQuery_identity_identifiable_User_contents_Channel_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileContentsQuery_identity_identifiable_User_contents_Channel_connection | null;
  source: ProfileContentsQuery_identity_identifiable_User_contents_Channel_source | null;
  truncatedTitle: string;
  visibility: string;
  counts: ProfileContentsQuery_identity_identifiable_User_contents_Channel_counts | null;
  owner: ProfileContentsQuery_identity_identifiable_User_contents_Channel_owner;
  label: string;
}

export type ProfileContentsQuery_identity_identifiable_User_contents = ProfileContentsQuery_identity_identifiable_User_contents_Attachment | ProfileContentsQuery_identity_identifiable_User_contents_Embed | ProfileContentsQuery_identity_identifiable_User_contents_Image | ProfileContentsQuery_identity_identifiable_User_contents_Link | ProfileContentsQuery_identity_identifiable_User_contents_PendingBlock | ProfileContentsQuery_identity_identifiable_User_contents_Text | ProfileContentsQuery_identity_identifiable_User_contents_Channel;

export interface ProfileContentsQuery_identity_identifiable_User {
  __typename: "User";
  id: number;
  name: string;
  contents: ProfileContentsQuery_identity_identifiable_User_contents[] | null;
}

export type ProfileContentsQuery_identity_identifiable = ProfileContentsQuery_identity_identifiable_Group | ProfileContentsQuery_identity_identifiable_User;

export interface ProfileContentsQuery_identity {
  __typename: "Identity";
  identifiable: ProfileContentsQuery_identity_identifiable;
}

export interface ProfileContentsQuery {
  identity: ProfileContentsQuery_identity | null;
}

export interface ProfileContentsQueryVariables {
  id: string;
  type?: ConnectableTypeEnum | null;
  page?: number | null;
  per?: number | null;
  sort?: SearchSorts | null;
  q?: string | null;
  seed?: number | null;
}
