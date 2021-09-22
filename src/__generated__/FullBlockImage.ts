/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FullBlockImage
// ====================================================

export interface FullBlockImage_Attachment {
  __typename: "Attachment" | "Channel" | "Embed" | "Link" | "PendingBlock" | "Text";
}

export interface FullBlockImage_Image {
  __typename: "Image";
  id: number;
  title: string;
  thumb_url: string | null;
  image_url: string | null;
  original_image_url: string | null;
}

export type FullBlockImage = FullBlockImage_Attachment | FullBlockImage_Image;
