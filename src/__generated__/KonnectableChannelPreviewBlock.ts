/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: KonnectableChannelPreviewBlock
// ====================================================

export interface KonnectableChannelPreviewBlock_PendingBlock {
  __typename: "PendingBlock";
  id: number | null;
}

export interface KonnectableChannelPreviewBlock_Text {
  __typename: "Text";
  id: number | null;
  preview_content: string | null;
}

export interface KonnectableChannelPreviewBlock_Image {
  __typename: "Image";
  id: number | null;
  preview_image_url: string | null;
}

export interface KonnectableChannelPreviewBlock_Link {
  __typename: "Link";
  id: number | null;
  preview_image_url: string | null;
}

export interface KonnectableChannelPreviewBlock_Attachment {
  __typename: "Attachment";
  id: number | null;
  preview_image_url: string | null;
  file_extension: string | null;
}

export interface KonnectableChannelPreviewBlock_Embed {
  __typename: "Embed";
  id: number | null;
  preview_image_url: string | null;
}

export interface KonnectableChannelPreviewBlock_Channel_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface KonnectableChannelPreviewBlock_Channel_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
}

export type KonnectableChannelPreviewBlock_Channel_owner = KonnectableChannelPreviewBlock_Channel_owner_User | KonnectableChannelPreviewBlock_Channel_owner_Group;

export interface KonnectableChannelPreviewBlock_Channel {
  __typename: "Channel";
  id: number | null;
  preview_title: string | null;
  visibility: string | null;
  owner: KonnectableChannelPreviewBlock_Channel_owner | null;
}

export type KonnectableChannelPreviewBlock = KonnectableChannelPreviewBlock_PendingBlock | KonnectableChannelPreviewBlock_Text | KonnectableChannelPreviewBlock_Image | KonnectableChannelPreviewBlock_Link | KonnectableChannelPreviewBlock_Attachment | KonnectableChannelPreviewBlock_Embed | KonnectableChannelPreviewBlock_Channel;
