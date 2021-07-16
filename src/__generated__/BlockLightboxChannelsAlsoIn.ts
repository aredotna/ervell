/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BlockLightboxChannelsAlsoIn
// ====================================================

export interface BlockLightboxChannelsAlsoIn_Channel {
  __typename: "Channel";
  id: number;
}

export interface BlockLightboxChannelsAlsoIn_Attachment_counts {
  __typename: "BlockCounts";
  channels_with_same_source: number | null;
}

export interface BlockLightboxChannelsAlsoIn_Attachment_channels_with_same_source_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface BlockLightboxChannelsAlsoIn_Attachment_channels_with_same_source_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type BlockLightboxChannelsAlsoIn_Attachment_channels_with_same_source_owner = BlockLightboxChannelsAlsoIn_Attachment_channels_with_same_source_owner_Group | BlockLightboxChannelsAlsoIn_Attachment_channels_with_same_source_owner_User;

export interface BlockLightboxChannelsAlsoIn_Attachment_channels_with_same_source_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface BlockLightboxChannelsAlsoIn_Attachment_channels_with_same_source {
  __typename: "Channel";
  id: number;
  href: string | null;
  visibility: string;
  title: string;
  owner: BlockLightboxChannelsAlsoIn_Attachment_channels_with_same_source_owner;
  counts: BlockLightboxChannelsAlsoIn_Attachment_channels_with_same_source_counts | null;
  label: string;
}

export interface BlockLightboxChannelsAlsoIn_Attachment {
  __typename: "Attachment" | "Embed" | "Image" | "Link" | "PendingBlock" | "Text";
  id: number;
  counts: BlockLightboxChannelsAlsoIn_Attachment_counts | null;
  channels_with_same_source: BlockLightboxChannelsAlsoIn_Attachment_channels_with_same_source[] | null;
}

export type BlockLightboxChannelsAlsoIn = BlockLightboxChannelsAlsoIn_Channel | BlockLightboxChannelsAlsoIn_Attachment;
