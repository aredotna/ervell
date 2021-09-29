/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FullBlockLinkQuery
// ====================================================

export interface FullBlockLinkQuery_block_Attachment {
  __typename: "Attachment" | "Channel" | "Embed" | "Image" | "PendingBlock" | "Text";
}

export interface FullBlockLinkQuery_block_Link_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
  provider_name: string | null;
  provider_url: string | null;
}

export interface FullBlockLinkQuery_block_Link {
  __typename: "Link";
  id: number;
  title: string;
  source_url: string | null;
  image_url: string | null;
  image_updated_at: string | null;
  image_updated_at_unix_time: string | null;
  source: FullBlockLinkQuery_block_Link_source | null;
}

export type FullBlockLinkQuery_block = FullBlockLinkQuery_block_Attachment | FullBlockLinkQuery_block_Link;

export interface FullBlockLinkQuery {
  block: FullBlockLinkQuery_block | null;
}

export interface FullBlockLinkQueryVariables {
  id: string;
}
