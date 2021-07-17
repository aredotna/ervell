/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BlockLightboxFold
// ====================================================

export interface BlockLightboxFold_block_Channel_current_user_channels_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface BlockLightboxFold_block_Channel_current_user_channels_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type BlockLightboxFold_block_Channel_current_user_channels_owner = BlockLightboxFold_block_Channel_current_user_channels_owner_Group | BlockLightboxFold_block_Channel_current_user_channels_owner_User;

export interface BlockLightboxFold_block_Channel_current_user_channels_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface BlockLightboxFold_block_Channel_current_user_channels {
  __typename: "Channel";
  id: number;
  href: string | null;
  visibility: string;
  title: string;
  owner: BlockLightboxFold_block_Channel_current_user_channels_owner;
  counts: BlockLightboxFold_block_Channel_current_user_channels_counts | null;
  label: string;
}

export interface BlockLightboxFold_block_Channel_public_channels_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface BlockLightboxFold_block_Channel_public_channels_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type BlockLightboxFold_block_Channel_public_channels_owner = BlockLightboxFold_block_Channel_public_channels_owner_Group | BlockLightboxFold_block_Channel_public_channels_owner_User;

export interface BlockLightboxFold_block_Channel_public_channels_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface BlockLightboxFold_block_Channel_public_channels {
  __typename: "Channel";
  id: number;
  href: string | null;
  visibility: string;
  title: string;
  owner: BlockLightboxFold_block_Channel_public_channels_owner;
  counts: BlockLightboxFold_block_Channel_public_channels_counts | null;
  label: string;
}

export interface BlockLightboxFold_block_Channel_private_channels_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface BlockLightboxFold_block_Channel_private_channels_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type BlockLightboxFold_block_Channel_private_channels_owner = BlockLightboxFold_block_Channel_private_channels_owner_Group | BlockLightboxFold_block_Channel_private_channels_owner_User;

export interface BlockLightboxFold_block_Channel_private_channels_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface BlockLightboxFold_block_Channel_private_channels {
  __typename: "Channel";
  id: number;
  href: string | null;
  visibility: string;
  title: string;
  owner: BlockLightboxFold_block_Channel_private_channels_owner;
  counts: BlockLightboxFold_block_Channel_private_channels_counts | null;
  label: string;
}

export interface BlockLightboxFold_block_Channel_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface BlockLightboxFold_block_Channel {
  __typename: "Channel";
  id: number;
  current_user_channels: BlockLightboxFold_block_Channel_current_user_channels[] | null;
  public_channels: BlockLightboxFold_block_Channel_public_channels[] | null;
  private_channels: BlockLightboxFold_block_Channel_private_channels[] | null;
  source: BlockLightboxFold_block_Channel_source | null;
}

export interface BlockLightboxFold_block_Attachment_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
  private_channels: number | null;
  comments: number | null;
  current_user_channels: number | null;
  channels_with_same_source: number | null;
}

export interface BlockLightboxFold_block_Attachment_current_user_channels_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface BlockLightboxFold_block_Attachment_current_user_channels_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type BlockLightboxFold_block_Attachment_current_user_channels_owner = BlockLightboxFold_block_Attachment_current_user_channels_owner_Group | BlockLightboxFold_block_Attachment_current_user_channels_owner_User;

export interface BlockLightboxFold_block_Attachment_current_user_channels_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface BlockLightboxFold_block_Attachment_current_user_channels {
  __typename: "Channel";
  id: number;
  href: string | null;
  visibility: string;
  title: string;
  owner: BlockLightboxFold_block_Attachment_current_user_channels_owner;
  counts: BlockLightboxFold_block_Attachment_current_user_channels_counts | null;
  label: string;
}

export interface BlockLightboxFold_block_Attachment_public_channels_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface BlockLightboxFold_block_Attachment_public_channels_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type BlockLightboxFold_block_Attachment_public_channels_owner = BlockLightboxFold_block_Attachment_public_channels_owner_Group | BlockLightboxFold_block_Attachment_public_channels_owner_User;

export interface BlockLightboxFold_block_Attachment_public_channels_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface BlockLightboxFold_block_Attachment_public_channels {
  __typename: "Channel";
  id: number;
  href: string | null;
  visibility: string;
  title: string;
  owner: BlockLightboxFold_block_Attachment_public_channels_owner;
  counts: BlockLightboxFold_block_Attachment_public_channels_counts | null;
  label: string;
}

export interface BlockLightboxFold_block_Attachment_private_channels_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface BlockLightboxFold_block_Attachment_private_channels_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type BlockLightboxFold_block_Attachment_private_channels_owner = BlockLightboxFold_block_Attachment_private_channels_owner_Group | BlockLightboxFold_block_Attachment_private_channels_owner_User;

export interface BlockLightboxFold_block_Attachment_private_channels_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface BlockLightboxFold_block_Attachment_private_channels {
  __typename: "Channel";
  id: number;
  href: string | null;
  visibility: string;
  title: string;
  owner: BlockLightboxFold_block_Attachment_private_channels_owner;
  counts: BlockLightboxFold_block_Attachment_private_channels_counts | null;
  label: string;
}

export interface BlockLightboxFold_block_Attachment_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface BlockLightboxFold_block_Attachment_channels_with_same_source_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface BlockLightboxFold_block_Attachment_channels_with_same_source_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type BlockLightboxFold_block_Attachment_channels_with_same_source_owner = BlockLightboxFold_block_Attachment_channels_with_same_source_owner_Group | BlockLightboxFold_block_Attachment_channels_with_same_source_owner_User;

export interface BlockLightboxFold_block_Attachment_channels_with_same_source_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface BlockLightboxFold_block_Attachment_channels_with_same_source {
  __typename: "Channel";
  id: number;
  href: string | null;
  visibility: string;
  title: string;
  owner: BlockLightboxFold_block_Attachment_channels_with_same_source_owner;
  counts: BlockLightboxFold_block_Attachment_channels_with_same_source_counts | null;
  label: string;
}

export interface BlockLightboxFold_block_Attachment_comments_user {
  __typename: "User";
  id: number;
  name: string;
  href: string | null;
}

export interface BlockLightboxFold_block_Attachment_comments_can {
  __typename: "CommentCan";
  destroy: boolean | null;
}

export interface BlockLightboxFold_block_Attachment_comments {
  __typename: "Comment";
  id: number;
  body: string | null;
  created_at: string | null;
  user: BlockLightboxFold_block_Attachment_comments_user | null;
  can: BlockLightboxFold_block_Attachment_comments_can | null;
}

export interface BlockLightboxFold_block_Attachment {
  __typename: "Attachment" | "Embed" | "Image" | "Link" | "PendingBlock" | "Text";
  id: number;
  counts: BlockLightboxFold_block_Attachment_counts | null;
  current_user_channels: BlockLightboxFold_block_Attachment_current_user_channels[] | null;
  public_channels: BlockLightboxFold_block_Attachment_public_channels[] | null;
  private_channels: BlockLightboxFold_block_Attachment_private_channels[] | null;
  source: BlockLightboxFold_block_Attachment_source | null;
  channels_with_same_source: BlockLightboxFold_block_Attachment_channels_with_same_source[] | null;
  comments: BlockLightboxFold_block_Attachment_comments[] | null;
}

export type BlockLightboxFold_block = BlockLightboxFold_block_Channel | BlockLightboxFold_block_Attachment;

export interface BlockLightboxFold {
  block: BlockLightboxFold_block | null;
}

export interface BlockLightboxFoldVariables {
  id: string;
  page?: number | null;
  per?: number | null;
}
