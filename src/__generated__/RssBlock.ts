/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: RssBlock
// ====================================================

export interface RssBlock_Channel_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface RssBlock_Channel {
  __typename: "Channel" | "PendingBlock";
  id: number;
  updated_at: string;
  title: string;
  href: string;
  source: RssBlock_Channel_source | null;
}

export interface RssBlock_Image_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface RssBlock_Image {
  __typename: "Image";
  id: number;
  updated_at: string;
  title: string;
  href: string;
  source: RssBlock_Image_source | null;
  image_url: string | null;
}

export interface RssBlock_Embed_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface RssBlock_Embed {
  __typename: "Embed";
  id: number;
  updated_at: string;
  title: string;
  href: string;
  source: RssBlock_Embed_source | null;
  embed_html: string | null;
}

export interface RssBlock_Attachment_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface RssBlock_Attachment {
  __typename: "Attachment";
  id: number;
  updated_at: string;
  title: string;
  href: string;
  source: RssBlock_Attachment_source | null;
  file_url: string | null;
}

export interface RssBlock_Link_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface RssBlock_Link {
  __typename: "Link";
  id: number;
  updated_at: string;
  title: string;
  href: string;
  source: RssBlock_Link_source | null;
  description: string | null;
  image_url: string | null;
}

export interface RssBlock_Text_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface RssBlock_Text {
  __typename: "Text";
  id: number;
  updated_at: string;
  title: string;
  href: string;
  source: RssBlock_Text_source | null;
  content: string;
}

export type RssBlock = RssBlock_Channel | RssBlock_Image | RssBlock_Embed | RssBlock_Attachment | RssBlock_Link | RssBlock_Text;
