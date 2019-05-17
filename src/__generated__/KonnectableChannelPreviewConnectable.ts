/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: KonnectableChannelPreviewConnectable
// ====================================================

export interface KonnectableChannelPreviewConnectable_PendingBlock {
  __typename: "PendingBlock";
  id: number | null;
}

export interface KonnectableChannelPreviewConnectable_Text {
  __typename: "Text";
  id: number | null;
  preview_content: string | null;
}

export interface KonnectableChannelPreviewConnectable_Image {
  __typename: "Image";
  id: number | null;
  preview_image_url: string | null;
}

export interface KonnectableChannelPreviewConnectable_Link {
  __typename: "Link";
  id: number | null;
  preview_image_url: string | null;
}

export interface KonnectableChannelPreviewConnectable_Attachment {
  __typename: "Attachment";
  id: number | null;
  preview_image_url: string | null;
  file_extension: string | null;
}

export interface KonnectableChannelPreviewConnectable_Embed {
  __typename: "Embed";
  id: number | null;
  preview_image_url: string | null;
}

export interface KonnectableChannelPreviewConnectable_Channel_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface KonnectableChannelPreviewConnectable_Channel_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
}

export type KonnectableChannelPreviewConnectable_Channel_owner = KonnectableChannelPreviewConnectable_Channel_owner_User | KonnectableChannelPreviewConnectable_Channel_owner_Group;

export interface KonnectableChannelPreviewConnectable_Channel {
  __typename: "Channel";
  id: number | null;
  preview_title: string | null;
  visibility: string | null;
  owner: KonnectableChannelPreviewConnectable_Channel_owner | null;
}

export type KonnectableChannelPreviewConnectable = KonnectableChannelPreviewConnectable_PendingBlock | KonnectableChannelPreviewConnectable_Text | KonnectableChannelPreviewConnectable_Image | KonnectableChannelPreviewConnectable_Link | KonnectableChannelPreviewConnectable_Attachment | KonnectableChannelPreviewConnectable_Embed | KonnectableChannelPreviewConnectable_Channel;
