/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ChannelPreviewBlock
// ====================================================

export interface ChannelPreviewBlock_PendingBlock {
  __typename: "PendingBlock";
  id: number | null;
}

export interface ChannelPreviewBlock_Text {
  __typename: "Text";
  id: number | null;
  preview_content: string | null;
}

export interface ChannelPreviewBlock_Image {
  __typename: "Image";
  id: number | null;
  preview_image_url: string | null;
}

export interface ChannelPreviewBlock_Link {
  __typename: "Link";
  id: number | null;
  preview_image_url: string | null;
}

export interface ChannelPreviewBlock_Attachment {
  __typename: "Attachment";
  id: number | null;
  preview_image_url: string | null;
  file_extension: string | null;
}

export interface ChannelPreviewBlock_Embed {
  __typename: "Embed";
  id: number | null;
  preview_image_url: string | null;
}

export interface ChannelPreviewBlock_Channel_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ChannelPreviewBlock_Channel_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
}

export type ChannelPreviewBlock_Channel_owner = ChannelPreviewBlock_Channel_owner_User | ChannelPreviewBlock_Channel_owner_Group;

export interface ChannelPreviewBlock_Channel {
  __typename: "Channel";
  id: number | null;
  preview_title: string | null;
  visibility: string | null;
  owner: ChannelPreviewBlock_Channel_owner | null;
}

export type ChannelPreviewBlock = ChannelPreviewBlock_PendingBlock | ChannelPreviewBlock_Text | ChannelPreviewBlock_Image | ChannelPreviewBlock_Link | ChannelPreviewBlock_Attachment | ChannelPreviewBlock_Embed | ChannelPreviewBlock_Channel;
