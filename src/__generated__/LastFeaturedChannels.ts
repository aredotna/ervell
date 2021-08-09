/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: LastFeaturedChannels
// ====================================================

export interface LastFeaturedChannels_channel_contents_Attachment {
  __typename: "Attachment" | "Embed" | "Image" | "Link" | "PendingBlock" | "Text";
}

export interface LastFeaturedChannels_channel_contents_Channel {
  __typename: "Channel";
  to_s: string;
  id: number;
}

export type LastFeaturedChannels_channel_contents = LastFeaturedChannels_channel_contents_Attachment | LastFeaturedChannels_channel_contents_Channel;

export interface LastFeaturedChannels_channel {
  __typename: "Channel";
  contents: LastFeaturedChannels_channel_contents[] | null;
}

export interface LastFeaturedChannels {
  /**
   * A single channel
   */
  channel: LastFeaturedChannels_channel | null;
}
