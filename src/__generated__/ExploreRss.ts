/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ExploreRss
// ====================================================

export interface ExploreRss_exxplore_Channel_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ExploreRss_exxplore_Channel {
  __typename: "Channel" | "PendingBlock";
  id: number;
  updated_at: string | null;
  title: string;
  href: string | null;
  source: ExploreRss_exxplore_Channel_source | null;
}

export interface ExploreRss_exxplore_Image_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ExploreRss_exxplore_Image {
  __typename: "Image";
  id: number;
  updated_at: string | null;
  title: string;
  href: string | null;
  source: ExploreRss_exxplore_Image_source | null;
  image_url: string | null;
}

export interface ExploreRss_exxplore_Embed_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ExploreRss_exxplore_Embed {
  __typename: "Embed";
  id: number;
  updated_at: string | null;
  title: string;
  href: string | null;
  source: ExploreRss_exxplore_Embed_source | null;
  embed_html: string | null;
}

export interface ExploreRss_exxplore_Attachment_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ExploreRss_exxplore_Attachment {
  __typename: "Attachment";
  id: number;
  updated_at: string | null;
  title: string;
  href: string | null;
  source: ExploreRss_exxplore_Attachment_source | null;
  file_url: string | null;
}

export interface ExploreRss_exxplore_Link_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ExploreRss_exxplore_Link {
  __typename: "Link";
  id: number;
  updated_at: string | null;
  title: string;
  href: string | null;
  source: ExploreRss_exxplore_Link_source | null;
  description: string | null;
  image_url: string | null;
}

export interface ExploreRss_exxplore_Text_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ExploreRss_exxplore_Text {
  __typename: "Text";
  id: number;
  updated_at: string | null;
  title: string;
  href: string | null;
  source: ExploreRss_exxplore_Text_source | null;
  content: string;
}

export type ExploreRss_exxplore = ExploreRss_exxplore_Channel | ExploreRss_exxplore_Image | ExploreRss_exxplore_Embed | ExploreRss_exxplore_Attachment | ExploreRss_exxplore_Link | ExploreRss_exxplore_Text;

export interface ExploreRss {
  exxplore: ExploreRss_exxplore[] | null;
}
