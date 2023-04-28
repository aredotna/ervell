/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ChangelogChannelContents
// ====================================================

export interface ChangelogChannelContents_channel_blokks_Attachment {
  __typename: "Attachment" | "Channel" | "Embed" | "Image" | "Link" | "PendingBlock";
  id: number;
  created_at: string;
  href: string;
  title: string;
}

export interface ChangelogChannelContents_channel_blokks_Text {
  __typename: "Text";
  id: number;
  created_at: string;
  href: string;
  title: string;
  content: string;
  raw: string;
}

export type ChangelogChannelContents_channel_blokks = ChangelogChannelContents_channel_blokks_Attachment | ChangelogChannelContents_channel_blokks_Text;

export interface ChangelogChannelContents_channel {
  __typename: "Channel";
  id: number;
  added_to_at: string | null;
  href: string;
  blokks: ChangelogChannelContents_channel_blokks[];
}

export interface ChangelogChannelContents {
  /**
   * A single channel
   */
  channel: ChangelogChannelContents_channel | null;
}

export interface ChangelogChannelContentsVariables {
  id: string;
}
