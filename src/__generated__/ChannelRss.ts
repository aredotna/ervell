/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ChannelRss
// ====================================================

export interface ChannelRss_channel_blocks_Channel_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelRss_channel_blocks_Channel {
  __typename: "Channel" | "PendingBlock";
  id: number;
  updated_at: string;
  title: string;
  href: string;
  source: ChannelRss_channel_blocks_Channel_source | null;
}

export interface ChannelRss_channel_blocks_Image_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelRss_channel_blocks_Image {
  __typename: "Image";
  id: number;
  updated_at: string;
  title: string;
  href: string;
  source: ChannelRss_channel_blocks_Image_source | null;
  image_url: string | null;
}

export interface ChannelRss_channel_blocks_Embed_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelRss_channel_blocks_Embed {
  __typename: "Embed";
  id: number;
  updated_at: string;
  title: string;
  href: string;
  source: ChannelRss_channel_blocks_Embed_source | null;
  embed_html: string | null;
}

export interface ChannelRss_channel_blocks_Attachment_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelRss_channel_blocks_Attachment {
  __typename: "Attachment";
  id: number;
  updated_at: string;
  title: string;
  href: string;
  source: ChannelRss_channel_blocks_Attachment_source | null;
  file_url: string | null;
}

export interface ChannelRss_channel_blocks_Link_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelRss_channel_blocks_Link {
  __typename: "Link";
  id: number;
  updated_at: string;
  title: string;
  href: string;
  source: ChannelRss_channel_blocks_Link_source | null;
  description: string | null;
  image_url: string | null;
}

export interface ChannelRss_channel_blocks_Text_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ChannelRss_channel_blocks_Text {
  __typename: "Text";
  id: number;
  updated_at: string;
  title: string;
  href: string;
  source: ChannelRss_channel_blocks_Text_source | null;
  content: string;
}

export type ChannelRss_channel_blocks = ChannelRss_channel_blocks_Channel | ChannelRss_channel_blocks_Image | ChannelRss_channel_blocks_Embed | ChannelRss_channel_blocks_Attachment | ChannelRss_channel_blocks_Link | ChannelRss_channel_blocks_Text;

export interface ChannelRss_channel {
  __typename: "Channel";
  title: string;
  href: string;
  description: string | null;
  updated_at: string;
  blocks: ChannelRss_channel_blocks[];
}

export interface ChannelRss {
  /**
   * A single channel
   */
  channel: ChannelRss_channel | null;
}

export interface ChannelRssVariables {
  id: string;
}
