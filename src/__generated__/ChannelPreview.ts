/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ChannelPreview
// ====================================================

export interface ChannelPreview_channel_blocks_PendingBlock {
  __typename: "PendingBlock";
  id: number | null;
}

export interface ChannelPreview_channel_blocks_Text {
  __typename: "Text";
  id: number | null;
  preview_content: string | null;
}

export interface ChannelPreview_channel_blocks_Image {
  __typename: "Image";
  id: number | null;
  preview_image_url: string | null;
}

export interface ChannelPreview_channel_blocks_Link {
  __typename: "Link";
  id: number | null;
  preview_image_url: string | null;
}

export interface ChannelPreview_channel_blocks_Attachment {
  __typename: "Attachment";
  id: number | null;
  preview_image_url: string | null;
  file_extension: string | null;
}

export interface ChannelPreview_channel_blocks_Embed {
  __typename: "Embed";
  id: number | null;
  preview_image_url: string | null;
}

export interface ChannelPreview_channel_blocks_Channel_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ChannelPreview_channel_blocks_Channel_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
}

export type ChannelPreview_channel_blocks_Channel_owner = ChannelPreview_channel_blocks_Channel_owner_User | ChannelPreview_channel_blocks_Channel_owner_Group;

export interface ChannelPreview_channel_blocks_Channel {
  __typename: "Channel";
  id: number | null;
  preview_title: string | null;
  visibility: string | null;
  owner: ChannelPreview_channel_blocks_Channel_owner | null;
}

export type ChannelPreview_channel_blocks = ChannelPreview_channel_blocks_PendingBlock | ChannelPreview_channel_blocks_Text | ChannelPreview_channel_blocks_Image | ChannelPreview_channel_blocks_Link | ChannelPreview_channel_blocks_Attachment | ChannelPreview_channel_blocks_Embed | ChannelPreview_channel_blocks_Channel;

export interface ChannelPreview_channel {
  __typename: "Channel";
  id: number | null;
  blocks: (ChannelPreview_channel_blocks | null)[] | null;
}

export interface ChannelPreview {
  /**
   * A single channel
   */
  channel: ChannelPreview_channel | null;
}

export interface ChannelPreviewVariables {
  id: string;
  amount: number;
}
