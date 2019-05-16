/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ChannelContentsItemThumbnail
// ====================================================

export interface ChannelContentsItemThumbnail_Channel {
  __typename: "Channel" | "Text" | "PendingBlock";
  id: number | null;
}

export interface ChannelContentsItemThumbnail_Image {
  __typename: "Image";
  id: number | null;
  meta_image: string | null;
}

export interface ChannelContentsItemThumbnail_Link {
  __typename: "Link";
  id: number | null;
  meta_image: string | null;
}

export interface ChannelContentsItemThumbnail_Embed {
  __typename: "Embed";
  id: number | null;
  meta_image: string | null;
}

export interface ChannelContentsItemThumbnail_Attachment {
  __typename: "Attachment";
  id: number | null;
  meta_image: string | null;
}

export type ChannelContentsItemThumbnail = ChannelContentsItemThumbnail_Channel | ChannelContentsItemThumbnail_Image | ChannelContentsItemThumbnail_Link | ChannelContentsItemThumbnail_Embed | ChannelContentsItemThumbnail_Attachment;
