/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BlockLightboxChannelsAlsoIn
// ====================================================

export interface BlockLightboxChannelsAlsoIn_Channel {
  __typename: "Channel";
  id: number | null;
}

export interface BlockLightboxChannelsAlsoIn_Text_counts {
  __typename: "BlockCounts";
  channels_with_same_source: number | null;
}

export interface BlockLightboxChannelsAlsoIn_Text_channels_with_same_source_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  visibility: string | null;
}

export interface BlockLightboxChannelsAlsoIn_Text_channels_with_same_source_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export type BlockLightboxChannelsAlsoIn_Text_channels_with_same_source_owner = BlockLightboxChannelsAlsoIn_Text_channels_with_same_source_owner_Group | BlockLightboxChannelsAlsoIn_Text_channels_with_same_source_owner_User;

export interface BlockLightboxChannelsAlsoIn_Text_channels_with_same_source_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface BlockLightboxChannelsAlsoIn_Text_channels_with_same_source {
  __typename: "Channel";
  id: number | null;
  href: string | null;
  visibility: string | null;
  title: string | null;
  owner: BlockLightboxChannelsAlsoIn_Text_channels_with_same_source_owner | null;
  counts: BlockLightboxChannelsAlsoIn_Text_channels_with_same_source_counts | null;
  label: string | null;
}

export interface BlockLightboxChannelsAlsoIn_Text {
  __typename: "Text" | "Image" | "Link" | "Embed" | "Attachment" | "PendingBlock";
  id: number | null;
  counts: BlockLightboxChannelsAlsoIn_Text_counts | null;
  channels_with_same_source: (BlockLightboxChannelsAlsoIn_Text_channels_with_same_source | null)[] | null;
}

export type BlockLightboxChannelsAlsoIn = BlockLightboxChannelsAlsoIn_Channel | BlockLightboxChannelsAlsoIn_Text;
