/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BlockLightboxContentPane
// ====================================================

export interface BlockLightboxContentPane_Channel {
  __typename: "Channel" | "PendingBlock";
}

export interface BlockLightboxContentPane_Image {
  __typename: "Image";
  id: number;
  title: string;
  thumb_url: string | null;
  image_url: string | null;
  original_image_url: string | null;
}

export interface BlockLightboxContentPane_Text_can {
  __typename: "BlockCan";
  manage: boolean | null;
}

export interface BlockLightboxContentPane_Text {
  __typename: "Text";
  id: number;
  content: string;
  can: BlockLightboxContentPane_Text_can | null;
}

export interface BlockLightboxContentPane_Link_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
  provider_name: string | null;
  provider_url: string | null;
}

export interface BlockLightboxContentPane_Link {
  __typename: "Link";
  id: number;
  title: string;
  source_url: string | null;
  image_url: string | null;
  image_updated_at: string | null;
  image_updated_at_unix_time: string | null;
  source: BlockLightboxContentPane_Link_source | null;
}

export interface BlockLightboxContentPane_Attachment {
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

export interface BlockLightboxContentPane_Embed {
  __typename: "Embed";
  id: number;
  title: string;
  embed_html: string | null;
  embed_width: number | null;
  embed_height: number | null;
}

export type BlockLightboxContentPane = BlockLightboxContentPane_Channel | BlockLightboxContentPane_Image | BlockLightboxContentPane_Text | BlockLightboxContentPane_Link | BlockLightboxContentPane_Attachment | BlockLightboxContentPane_Embed;
