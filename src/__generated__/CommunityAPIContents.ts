/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CommunityAPIContents
// ====================================================

export interface CommunityAPIContents_channel_blokks_Attachment {
  __typename: "Attachment" | "Channel" | "Embed" | "Image" | "PendingBlock" | "Text";
  id: number;
}

export interface CommunityAPIContents_channel_blokks_Link {
  __typename: "Link";
  id: number;
  title: string;
  image_url: string | null;
  description: string | null;
  source_url: string | null;
}

export type CommunityAPIContents_channel_blokks = CommunityAPIContents_channel_blokks_Attachment | CommunityAPIContents_channel_blokks_Link;

export interface CommunityAPIContents_channel {
  __typename: "Channel";
  id: number;
  added_to_at: string | null;
  href: string | null;
  blokks: CommunityAPIContents_channel_blokks[] | null;
}

export interface CommunityAPIContents {
  /**
   * A single channel
   */
  channel: CommunityAPIContents_channel | null;
}
