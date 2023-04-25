/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: EmbeddedChannel
// ====================================================

export interface EmbeddedChannel_channel_owner_User {
  __typename: "User";
  id: number;
  name: string;
  href: string;
}

export interface EmbeddedChannel_channel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  href: string;
}

export type EmbeddedChannel_channel_owner = EmbeddedChannel_channel_owner_User | EmbeddedChannel_channel_owner_Group;

export interface EmbeddedChannel_channel_counts {
  __typename: "ChannelCounts";
  contents: number;
}

export interface EmbeddedChannel_channel_contents_PendingBlock {
  __typename: "PendingBlock";
  id: number;
  title: string;
  href: string;
}

export interface EmbeddedChannel_channel_contents_Text {
  __typename: "Text";
  id: number;
  preview_content: string;
  title: string;
  href: string;
}

export interface EmbeddedChannel_channel_contents_Image {
  __typename: "Image";
  id: number;
  preview_image_url: string | null;
  title: string;
  href: string;
}

export interface EmbeddedChannel_channel_contents_Link {
  __typename: "Link";
  id: number;
  preview_image_url: string | null;
  title: string;
  href: string;
}

export interface EmbeddedChannel_channel_contents_Attachment {
  __typename: "Attachment";
  id: number;
  preview_image_url: string | null;
  file_extension: string | null;
  title: string;
  href: string;
}

export interface EmbeddedChannel_channel_contents_Embed {
  __typename: "Embed";
  id: number;
  preview_image_url: string | null;
  title: string;
  href: string;
}

export interface EmbeddedChannel_channel_contents_Channel_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export interface EmbeddedChannel_channel_contents_Channel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
}

export type EmbeddedChannel_channel_contents_Channel_owner = EmbeddedChannel_channel_contents_Channel_owner_User | EmbeddedChannel_channel_contents_Channel_owner_Group;

export interface EmbeddedChannel_channel_contents_Channel {
  __typename: "Channel";
  id: number;
  preview_title: string;
  visibility: string;
  owner: EmbeddedChannel_channel_contents_Channel_owner;
  title: string;
  href: string;
}

export type EmbeddedChannel_channel_contents = EmbeddedChannel_channel_contents_PendingBlock | EmbeddedChannel_channel_contents_Text | EmbeddedChannel_channel_contents_Image | EmbeddedChannel_channel_contents_Link | EmbeddedChannel_channel_contents_Attachment | EmbeddedChannel_channel_contents_Embed | EmbeddedChannel_channel_contents_Channel;

export interface EmbeddedChannel_channel {
  __typename: "Channel";
  id: number;
  title: string;
  truncatedTitle: string;
  href: string;
  visibility: string;
  owner: EmbeddedChannel_channel_owner;
  counts: EmbeddedChannel_channel_counts;
  contents: EmbeddedChannel_channel_contents[];
}

export interface EmbeddedChannel {
  /**
   * A single channel
   */
  channel: EmbeddedChannel_channel | null;
}

export interface EmbeddedChannelVariables {
  id: string;
  per?: number | null;
}
