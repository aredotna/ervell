/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FullBlockContentPane
// ====================================================

export interface FullBlockContentPane_Channel {
  __typename: "Channel" | "PendingBlock";
}

export interface FullBlockContentPane_Image {
  __typename: "Image";
  id: number;
  title: string;
  thumb_url: string | null;
  image_url: string | null;
  original_image_url: string | null;
  alt_text: string | null;
}

export interface FullBlockContentPane_Text_can {
  __typename: "BlockCan";
  manage: boolean | null;
}

export interface FullBlockContentPane_Text {
  __typename: "Text";
  id: number;
  content: string;
  raw: string;
  can: FullBlockContentPane_Text_can | null;
}

export interface FullBlockContentPane_Link_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
  provider_name: string | null;
  provider_url: string | null;
}

export interface FullBlockContentPane_Link {
  __typename: "Link";
  id: number;
  title: string;
  source_url: string | null;
  image_url: string | null;
  image_updated_at: string | null;
  image_updated_at_unix_time: string | null;
  source: FullBlockContentPane_Link_source | null;
}

export interface FullBlockContentPane_Attachment {
  __typename: "Attachment";
  id: number;
  title: string;
  file_extension: string | null;
  file_url: string | null;
  file_size: string | null;
  file_content_type: string | null;
  image_url: string | null;
  image_updated_at: string | null;
  image_updated_at_unix_time: string | null;
}

export interface FullBlockContentPane_Embed {
  __typename: "Embed";
  id: number;
  title: string;
  embed_html: string | null;
  embed_width: number | null;
  embed_height: number | null;
}

export type FullBlockContentPane = FullBlockContentPane_Channel | FullBlockContentPane_Image | FullBlockContentPane_Text | FullBlockContentPane_Link | FullBlockContentPane_Attachment | FullBlockContentPane_Embed;
