/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ChangelogChannelContents
// ====================================================

export interface ChangelogChannelContents_channel_blokks_Channel {
  __typename: "Channel" | "Image" | "Link" | "Embed" | "Attachment" | "PendingBlock";
  id: number | null;
  created_at: string | null;
  href: string | null;
  title: string | null;
}

export interface ChangelogChannelContents_channel_blokks_Text {
  __typename: "Text";
  id: number | null;
  created_at: string | null;
  href: string | null;
  title: string | null;
  content: string | null;
}

export type ChangelogChannelContents_channel_blokks = ChangelogChannelContents_channel_blokks_Channel | ChangelogChannelContents_channel_blokks_Text;

export interface ChangelogChannelContents_channel {
  __typename: "Channel";
  id: number | null;
  added_to_at: string | null;
  href: string | null;
  blokks: (ChangelogChannelContents_channel_blokks | null)[] | null;
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
