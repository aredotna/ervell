/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FullBlockLink
// ====================================================

export interface FullBlockLink_Attachment {
  __typename: "Attachment" | "Channel" | "Embed" | "Image" | "PendingBlock" | "Text";
}

export interface FullBlockLink_Link_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
  provider_name: string | null;
  provider_url: string | null;
}

export interface FullBlockLink_Link {
  __typename: "Link";
  id: number;
  title: string;
  source_url: string | null;
  image_url: string | null;
  image_updated_at: string | null;
  image_updated_at_unix_time: string | null;
  content: string | null;
  source: FullBlockLink_Link_source | null;
}

export type FullBlockLink = FullBlockLink_Attachment | FullBlockLink_Link;
