/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BlockPageMetaTags
// ====================================================

export interface BlockPageMetaTags_Channel {
  __typename: "Channel";
  id: number;
  meta_title: string;
  meta_description: string | null;
  canonical: string;
}

export interface BlockPageMetaTags_Attachment {
  __typename: "Attachment";
  id: number;
  meta_title: string;
  meta_description: string | null;
  canonical: string;
  is_nsfw: boolean;
  meta_image: string | null;
}

export interface BlockPageMetaTags_Embed {
  __typename: "Embed";
  id: number;
  meta_title: string;
  meta_description: string | null;
  canonical: string;
  is_nsfw: boolean;
  meta_image: string | null;
}

export interface BlockPageMetaTags_Image {
  __typename: "Image";
  id: number;
  meta_title: string;
  meta_description: string | null;
  canonical: string;
  is_nsfw: boolean;
  meta_image: string | null;
}

export interface BlockPageMetaTags_Link {
  __typename: "Link";
  id: number;
  meta_title: string;
  meta_description: string | null;
  canonical: string;
  is_nsfw: boolean;
  meta_image: string | null;
}

export interface BlockPageMetaTags_PendingBlock {
  __typename: "PendingBlock" | "Text";
  id: number;
  meta_title: string;
  meta_description: string | null;
  canonical: string;
  is_nsfw: boolean;
}

export type BlockPageMetaTags = BlockPageMetaTags_Channel | BlockPageMetaTags_Attachment | BlockPageMetaTags_Embed | BlockPageMetaTags_Image | BlockPageMetaTags_Link | BlockPageMetaTags_PendingBlock;
