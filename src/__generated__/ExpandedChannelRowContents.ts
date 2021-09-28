/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ExpandedChannelRowContents
// ====================================================

export interface ExpandedChannelRowContents_channel_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface ExpandedChannelRowContents_channel_contents_PendingBlock {
  __typename: "PendingBlock";
  id: number;
  title: string;
  href: string | null;
}

export interface ExpandedChannelRowContents_channel_contents_Text {
  __typename: "Text";
  id: number;
  preview_content: string;
  title: string;
  href: string | null;
}

export interface ExpandedChannelRowContents_channel_contents_Image {
  __typename: "Image";
  id: number;
  preview_image_url: string | null;
  title: string;
  href: string | null;
}

export interface ExpandedChannelRowContents_channel_contents_Link {
  __typename: "Link";
  id: number;
  preview_image_url: string | null;
  title: string;
  href: string | null;
}

export interface ExpandedChannelRowContents_channel_contents_Attachment {
  __typename: "Attachment";
  id: number;
  preview_image_url: string | null;
  file_extension: string | null;
  title: string;
  href: string | null;
}

export interface ExpandedChannelRowContents_channel_contents_Embed {
  __typename: "Embed";
  id: number;
  preview_image_url: string | null;
  title: string;
  href: string | null;
}

export interface ExpandedChannelRowContents_channel_contents_Channel_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export interface ExpandedChannelRowContents_channel_contents_Channel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
}

export type ExpandedChannelRowContents_channel_contents_Channel_owner = ExpandedChannelRowContents_channel_contents_Channel_owner_User | ExpandedChannelRowContents_channel_contents_Channel_owner_Group;

export interface ExpandedChannelRowContents_channel_contents_Channel {
  __typename: "Channel";
  id: number;
  preview_title: string;
  visibility: string;
  owner: ExpandedChannelRowContents_channel_contents_Channel_owner;
  title: string;
  href: string | null;
}

export type ExpandedChannelRowContents_channel_contents = ExpandedChannelRowContents_channel_contents_PendingBlock | ExpandedChannelRowContents_channel_contents_Text | ExpandedChannelRowContents_channel_contents_Image | ExpandedChannelRowContents_channel_contents_Link | ExpandedChannelRowContents_channel_contents_Attachment | ExpandedChannelRowContents_channel_contents_Embed | ExpandedChannelRowContents_channel_contents_Channel;

export interface ExpandedChannelRowContents_channel {
  __typename: "Channel";
  id: number;
  href: string | null;
  counts: ExpandedChannelRowContents_channel_counts | null;
  contents: ExpandedChannelRowContents_channel_contents[] | null;
}

export interface ExpandedChannelRowContents {
  /**
   * A single channel
   */
  channel: ExpandedChannelRowContents_channel | null;
}

export interface ExpandedChannelRowContentsVariables {
  id: string;
  per?: number | null;
}
