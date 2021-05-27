/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BlockContent
// ====================================================

export interface BlockContent_blokk_Channel {
  __typename: "Channel" | "PendingBlock";
  id: number | null;
  title: string | null;
}

export interface BlockContent_blokk_Image {
  __typename: "Image";
  id: number | null;
  title: string | null;
  thumb_url: string | null;
  image_url: string | null;
  original_image_url: string | null;
}

export interface BlockContent_blokk_Text_can {
  __typename: "BlockCan";
  manage: boolean | null;
}

export interface BlockContent_blokk_Text {
  __typename: "Text";
  id: number | null;
  title: string | null;
  content: string | null;
  can: BlockContent_blokk_Text_can | null;
}

export interface BlockContent_blokk_Link_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
  provider_name: string | null;
  provider_url: string | null;
}

export interface BlockContent_blokk_Link {
  __typename: "Link";
  id: number | null;
  title: string | null;
  source_url: string | null;
  image_url: string | null;
  image_updated_at: string | null;
  image_updated_at_unix_time: string | null;
  source: BlockContent_blokk_Link_source | null;
}

export interface BlockContent_blokk_Attachment {
  __typename: "Attachment";
  id: number | null;
  title: string | null;
  file_extension: string | null;
  file_url: string | null;
  file_size: string | null;
  file_content_type: string | null;
  image_url: string | null;
  image_updated_at: string | null;
  image_updated_at_unix_time: string | null;
}

export interface BlockContent_blokk_Embed {
  __typename: "Embed";
  id: number | null;
  title: string | null;
  embed_html: string | null;
  embed_width: number | null;
  embed_height: number | null;
}

export type BlockContent_blokk = BlockContent_blokk_Channel | BlockContent_blokk_Image | BlockContent_blokk_Text | BlockContent_blokk_Link | BlockContent_blokk_Attachment | BlockContent_blokk_Embed;

export interface BlockContent {
  blokk: BlockContent_blokk | null;
}

export interface BlockContentVariables {
  block_id: string;
}
