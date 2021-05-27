/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BlockPageMetaTags
// ====================================================

export interface BlockPageMetaTags_Channel {
  __typename: "Channel";
  id: number | null;
  meta_title: string | null;
  meta_description: string | null;
  canonical: string | null;
}

export interface BlockPageMetaTags_Text {
  __typename: "Text" | "PendingBlock";
  id: number | null;
  meta_title: string | null;
  meta_description: string | null;
  canonical: string | null;
  is_nsfw: boolean | null;
}

export interface BlockPageMetaTags_Image {
  __typename: "Image";
  id: number | null;
  meta_title: string | null;
  meta_description: string | null;
  canonical: string | null;
  is_nsfw: boolean | null;
  meta_image: string | null;
}

export interface BlockPageMetaTags_Link {
  __typename: "Link";
  id: number | null;
  meta_title: string | null;
  meta_description: string | null;
  canonical: string | null;
  is_nsfw: boolean | null;
  meta_image: string | null;
}

export interface BlockPageMetaTags_Embed {
  __typename: "Embed";
  id: number | null;
  meta_title: string | null;
  meta_description: string | null;
  canonical: string | null;
  is_nsfw: boolean | null;
  meta_image: string | null;
}

export interface BlockPageMetaTags_Attachment {
  __typename: "Attachment";
  id: number | null;
  meta_title: string | null;
  meta_description: string | null;
  canonical: string | null;
  is_nsfw: boolean | null;
  meta_image: string | null;
}

export type BlockPageMetaTags = BlockPageMetaTags_Channel | BlockPageMetaTags_Text | BlockPageMetaTags_Image | BlockPageMetaTags_Link | BlockPageMetaTags_Embed | BlockPageMetaTags_Attachment;
