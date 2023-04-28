/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: KonnectableChannelPreview
// ====================================================

export interface KonnectableChannelPreview_channel_preview_connectables_PendingBlock {
  __typename: "PendingBlock";
  id: number;
}

export interface KonnectableChannelPreview_channel_preview_connectables_Text {
  __typename: "Text";
  id: number;
  preview_content: string;
}

export interface KonnectableChannelPreview_channel_preview_connectables_Image {
  __typename: "Image";
  id: number;
  preview_image_url: string | null;
}

export interface KonnectableChannelPreview_channel_preview_connectables_Link {
  __typename: "Link";
  id: number;
  preview_image_url: string | null;
}

export interface KonnectableChannelPreview_channel_preview_connectables_Attachment {
  __typename: "Attachment";
  id: number;
  preview_image_url: string | null;
  file_extension: string | null;
}

export interface KonnectableChannelPreview_channel_preview_connectables_Embed {
  __typename: "Embed";
  id: number;
  preview_image_url: string | null;
}

export interface KonnectableChannelPreview_channel_preview_connectables_Channel_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export interface KonnectableChannelPreview_channel_preview_connectables_Channel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
}

export type KonnectableChannelPreview_channel_preview_connectables_Channel_owner = KonnectableChannelPreview_channel_preview_connectables_Channel_owner_User | KonnectableChannelPreview_channel_preview_connectables_Channel_owner_Group;

export interface KonnectableChannelPreview_channel_preview_connectables_Channel {
  __typename: "Channel";
  id: number;
  preview_title: string;
  visibility: string;
  owner: KonnectableChannelPreview_channel_preview_connectables_Channel_owner;
}

export type KonnectableChannelPreview_channel_preview_connectables = KonnectableChannelPreview_channel_preview_connectables_PendingBlock | KonnectableChannelPreview_channel_preview_connectables_Text | KonnectableChannelPreview_channel_preview_connectables_Image | KonnectableChannelPreview_channel_preview_connectables_Link | KonnectableChannelPreview_channel_preview_connectables_Attachment | KonnectableChannelPreview_channel_preview_connectables_Embed | KonnectableChannelPreview_channel_preview_connectables_Channel;

export interface KonnectableChannelPreview_channel {
  __typename: "Channel";
  id: number;
  preview_connectables: KonnectableChannelPreview_channel_preview_connectables[];
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
