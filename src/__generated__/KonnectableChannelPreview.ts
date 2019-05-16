/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: KonnectableChannelPreview
// ====================================================

export interface KonnectableChannelPreview_channel_blocks_PendingBlock {
  __typename: "PendingBlock";
  id: number | null;
}

export interface KonnectableChannelPreview_channel_blocks_Text {
  __typename: "Text";
  id: number | null;
  preview_content: string | null;
}

export interface KonnectableChannelPreview_channel_blocks_Image {
  __typename: "Image";
  id: number | null;
  preview_image_url: string | null;
}

export interface KonnectableChannelPreview_channel_blocks_Link {
  __typename: "Link";
  id: number | null;
  preview_image_url: string | null;
}

export interface KonnectableChannelPreview_channel_blocks_Attachment {
  __typename: "Attachment";
  id: number | null;
  preview_image_url: string | null;
  file_extension: string | null;
}

export interface KonnectableChannelPreview_channel_blocks_Embed {
  __typename: "Embed";
  id: number | null;
  preview_image_url: string | null;
}

export interface KonnectableChannelPreview_channel_blocks_Channel_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface KonnectableChannelPreview_channel_blocks_Channel_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
}

export type KonnectableChannelPreview_channel_blocks_Channel_owner = KonnectableChannelPreview_channel_blocks_Channel_owner_User | KonnectableChannelPreview_channel_blocks_Channel_owner_Group;

export interface KonnectableChannelPreview_channel_blocks_Channel {
  __typename: "Channel";
  id: number | null;
  preview_title: string | null;
  visibility: string | null;
  owner: KonnectableChannelPreview_channel_blocks_Channel_owner | null;
}

export type KonnectableChannelPreview_channel_blocks = KonnectableChannelPreview_channel_blocks_PendingBlock | KonnectableChannelPreview_channel_blocks_Text | KonnectableChannelPreview_channel_blocks_Image | KonnectableChannelPreview_channel_blocks_Link | KonnectableChannelPreview_channel_blocks_Attachment | KonnectableChannelPreview_channel_blocks_Embed | KonnectableChannelPreview_channel_blocks_Channel;

export interface KonnectableChannelPreview_channel {
  __typename: "Channel";
  id: number | null;
  blocks: (KonnectableChannelPreview_channel_blocks | null)[] | null;
}

export interface KonnectableChannelPreview {
  /**
   * A single channel
   */
  channel: KonnectableChannelPreview_channel | null;
}

export interface KonnectableChannelPreviewVariables {
  id: string;
  amount: number;
}
