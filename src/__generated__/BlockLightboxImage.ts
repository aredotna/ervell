/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BlockLightboxImage
// ====================================================

export interface BlockLightboxImage_Channel {
  __typename: "Channel" | "Text" | "Link" | "Embed" | "Attachment" | "PendingBlock";
}

export interface BlockLightboxImage_Image {
  __typename: "Image";
  id: number | null;
  title: string | null;
  thumb_url: string | null;
  image_url: string | null;
  original_image_url: string | null;
  downloadable_image: string | null;
}

export type BlockLightboxImage = BlockLightboxImage_Channel | BlockLightboxImage_Image;
