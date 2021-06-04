/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CanonicalLinkForReader
// ====================================================

export interface CanonicalLinkForReader_blokk_Channel {
  __typename: "Channel" | "Text" | "Image" | "Embed" | "Attachment" | "PendingBlock";
}

export interface CanonicalLinkForReader_blokk_Link_canonical_link {
  __typename: "CanonicalLink";
  id: number | null;
  url: string | null;
  title: string | null;
  content: string | null;
  provider_name: string | null;
  authors: string | null;
  published_at: string | null;
  state: string | null;
}

export interface CanonicalLinkForReader_blokk_Link {
  __typename: "Link";
  id: number | null;
  canonical_link: CanonicalLinkForReader_blokk_Link_canonical_link | null;
}

export type CanonicalLinkForReader_blokk = CanonicalLinkForReader_blokk_Channel | CanonicalLinkForReader_blokk_Link;

export interface CanonicalLinkForReader {
  blokk: CanonicalLinkForReader_blokk | null;
}

export interface CanonicalLinkForReaderVariables {
  id: string;
}
