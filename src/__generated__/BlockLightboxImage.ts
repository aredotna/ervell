/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BlockLightboxImage
// ====================================================

export interface BlockLightboxImage_Attachment {
  __typename: "Attachment" | "Channel" | "Embed" | "Link" | "PendingBlock" | "Text";
}

export interface BlockLightboxImage_Image {
  __typename: "Image";
  id: number;
  title: string;
  thumb_url: string | null;
  image_url: string | null;
  original_image_url: string | null;
}

export type BlockLightboxImage = BlockLightboxImage_Attachment | BlockLightboxImage_Image;
