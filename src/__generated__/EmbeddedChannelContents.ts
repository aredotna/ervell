/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: EmbeddedChannelContents
// ====================================================

export interface EmbeddedChannelContents_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface EmbeddedChannelContents_contents_PendingBlock {
  __typename: "PendingBlock";
  id: number | null;
  title: string | null;
  href: string | null;
}

export interface EmbeddedChannelContents_contents_Text {
  __typename: "Text";
  id: number | null;
  preview_content: string | null;
  title: string | null;
  href: string | null;
}

export interface EmbeddedChannelContents_contents_Image {
  __typename: "Image";
  id: number | null;
  preview_image_url: string | null;
  title: string | null;
  href: string | null;
}

export interface EmbeddedChannelContents_contents_Link {
  __typename: "Link";
  id: number | null;
  preview_image_url: string | null;
  title: string | null;
  href: string | null;
}

export interface EmbeddedChannelContents_contents_Attachment {
  __typename: "Attachment";
  id: number | null;
  preview_image_url: string | null;
  file_extension: string | null;
  title: string | null;
  href: string | null;
}

export interface EmbeddedChannelContents_contents_Embed {
  __typename: "Embed";
  id: number | null;
  preview_image_url: string | null;
  title: string | null;
  href: string | null;
}

export interface EmbeddedChannelContents_contents_Channel_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface EmbeddedChannelContents_contents_Channel_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
}

export type EmbeddedChannelContents_contents_Channel_owner = EmbeddedChannelContents_contents_Channel_owner_User | EmbeddedChannelContents_contents_Channel_owner_Group;

export interface EmbeddedChannelContents_contents_Channel {
  __typename: "Channel";
  id: number | null;
  preview_title: string | null;
  visibility: string | null;
  owner: EmbeddedChannelContents_contents_Channel_owner | null;
  title: string | null;
  href: string | null;
}

export type EmbeddedChannelContents_contents = EmbeddedChannelContents_contents_PendingBlock | EmbeddedChannelContents_contents_Text | EmbeddedChannelContents_contents_Image | EmbeddedChannelContents_contents_Link | EmbeddedChannelContents_contents_Attachment | EmbeddedChannelContents_contents_Embed | EmbeddedChannelContents_contents_Channel;

export interface EmbeddedChannelContents {
  __typename: "Channel";
  id: number | null;
  href: string | null;
  counts: EmbeddedChannelContents_counts | null;
  contents: (EmbeddedChannelContents_contents | null)[] | null;
}
