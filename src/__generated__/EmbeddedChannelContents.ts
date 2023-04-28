/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: EmbeddedChannelContents
// ====================================================

export interface EmbeddedChannelContents_counts {
  __typename: "ChannelCounts";
  contents: number;
}

export interface EmbeddedChannelContents_contents_PendingBlock {
  __typename: "PendingBlock";
  id: number;
  title: string;
  href: string;
}

export interface EmbeddedChannelContents_contents_Text {
  __typename: "Text";
  id: number;
  preview_content: string;
  title: string;
  href: string;
}

export interface EmbeddedChannelContents_contents_Image {
  __typename: "Image";
  id: number;
  preview_image_url: string | null;
  title: string;
  href: string;
}

export interface EmbeddedChannelContents_contents_Link {
  __typename: "Link";
  id: number;
  preview_image_url: string | null;
  title: string;
  href: string;
}

export interface EmbeddedChannelContents_contents_Attachment {
  __typename: "Attachment";
  id: number;
  preview_image_url: string | null;
  file_extension: string | null;
  title: string;
  href: string;
}

export interface EmbeddedChannelContents_contents_Embed {
  __typename: "Embed";
  id: number;
  preview_image_url: string | null;
  title: string;
  href: string;
}

export interface EmbeddedChannelContents_contents_Channel_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export interface EmbeddedChannelContents_contents_Channel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
}

export type EmbeddedChannelContents_contents_Channel_owner = EmbeddedChannelContents_contents_Channel_owner_User | EmbeddedChannelContents_contents_Channel_owner_Group;

export interface EmbeddedChannelContents_contents_Channel {
  __typename: "Channel";
  id: number;
  preview_title: string;
  visibility: string;
  owner: EmbeddedChannelContents_contents_Channel_owner;
  title: string;
  href: string;
}

export type EmbeddedChannelContents_contents = EmbeddedChannelContents_contents_PendingBlock | EmbeddedChannelContents_contents_Text | EmbeddedChannelContents_contents_Image | EmbeddedChannelContents_contents_Link | EmbeddedChannelContents_contents_Attachment | EmbeddedChannelContents_contents_Embed | EmbeddedChannelContents_contents_Channel;

export interface EmbeddedChannelContents {
  __typename: "Channel";
  id: number;
  href: string;
  counts: EmbeddedChannelContents_counts;
  contents: EmbeddedChannelContents_contents[];
}
