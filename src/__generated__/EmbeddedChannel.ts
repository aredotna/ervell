/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: EmbeddedChannel
// ====================================================

export interface EmbeddedChannel_channel_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
}

export interface EmbeddedChannel_channel_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  href: string | null;
}

export type EmbeddedChannel_channel_owner = EmbeddedChannel_channel_owner_User | EmbeddedChannel_channel_owner_Group;

export interface EmbeddedChannel_channel_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface EmbeddedChannel_channel_contents_PendingBlock {
  __typename: "PendingBlock";
  id: number | null;
  title: string | null;
  href: string | null;
}

export interface EmbeddedChannel_channel_contents_Text {
  __typename: "Text";
  id: number | null;
  preview_content: string | null;
  title: string | null;
  href: string | null;
}

export interface EmbeddedChannel_channel_contents_Image {
  __typename: "Image";
  id: number | null;
  preview_image_url: string | null;
  title: string | null;
  href: string | null;
}

export interface EmbeddedChannel_channel_contents_Link {
  __typename: "Link";
  id: number | null;
  preview_image_url: string | null;
  title: string | null;
  href: string | null;
}

export interface EmbeddedChannel_channel_contents_Attachment {
  __typename: "Attachment";
  id: number | null;
  preview_image_url: string | null;
  file_extension: string | null;
  title: string | null;
  href: string | null;
}

export interface EmbeddedChannel_channel_contents_Embed {
  __typename: "Embed";
  id: number | null;
  preview_image_url: string | null;
  title: string | null;
  href: string | null;
}

export interface EmbeddedChannel_channel_contents_Channel_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface EmbeddedChannel_channel_contents_Channel_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
}

export type EmbeddedChannel_channel_contents_Channel_owner = EmbeddedChannel_channel_contents_Channel_owner_User | EmbeddedChannel_channel_contents_Channel_owner_Group;

export interface EmbeddedChannel_channel_contents_Channel {
  __typename: "Channel";
  id: number | null;
  preview_title: string | null;
  visibility: string | null;
  owner: EmbeddedChannel_channel_contents_Channel_owner | null;
  title: string | null;
  href: string | null;
}

export type EmbeddedChannel_channel_contents = EmbeddedChannel_channel_contents_PendingBlock | EmbeddedChannel_channel_contents_Text | EmbeddedChannel_channel_contents_Image | EmbeddedChannel_channel_contents_Link | EmbeddedChannel_channel_contents_Attachment | EmbeddedChannel_channel_contents_Embed | EmbeddedChannel_channel_contents_Channel;

export interface EmbeddedChannel_channel {
  __typename: "Channel";
  id: number | null;
  title: string | null;
  truncatedTitle: string | null;
  href: string | null;
  visibility: string | null;
  owner: EmbeddedChannel_channel_owner | null;
  counts: EmbeddedChannel_channel_counts | null;
  contents: (EmbeddedChannel_channel_contents | null)[] | null;
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
