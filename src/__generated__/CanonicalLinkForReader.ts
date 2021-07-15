/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CanonicalLinkForReader
// ====================================================

export interface CanonicalLinkForReader_blokk_Attachment {
  __typename: "Attachment" | "Channel" | "Embed" | "Image" | "PendingBlock" | "Text";
}

export interface CanonicalLinkForReader_blokk_Link_canonical_link {
  __typename: "CanonicalLink";
  id: number;
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
  id: number;
  canonical_link: CanonicalLinkForReader_blokk_Link_canonical_link | null;
}

export type CanonicalLinkForReader_blokk = CanonicalLinkForReader_blokk_Attachment | CanonicalLinkForReader_blokk_Link;

export interface CanonicalLinkForReader {
  blokk: CanonicalLinkForReader_blokk | null;
}

export interface CanonicalLinkForReaderVariables {
  id: string;
}
