/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: regenerateCanonicalLink
// ====================================================

export interface regenerateCanonicalLink_regenerate_canonical_link_blokk_Channel {
  __typename: "Channel" | "Text" | "Image" | "Embed" | "Attachment" | "PendingBlock";
  id: number | null;
}

export interface regenerateCanonicalLink_regenerate_canonical_link_blokk_Link_canonical_link {
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

export interface regenerateCanonicalLink_regenerate_canonical_link_blokk_Link {
  __typename: "Link";
  id: number | null;
  canonical_link: regenerateCanonicalLink_regenerate_canonical_link_blokk_Link_canonical_link | null;
}

export type regenerateCanonicalLink_regenerate_canonical_link_blokk = regenerateCanonicalLink_regenerate_canonical_link_blokk_Channel | regenerateCanonicalLink_regenerate_canonical_link_blokk_Link;

export interface regenerateCanonicalLink_regenerate_canonical_link {
  __typename: "RegenerateCanonicalLinkPayload";
  blokk: regenerateCanonicalLink_regenerate_canonical_link_blokk | null;
}

export interface regenerateCanonicalLink {
  regenerate_canonical_link: regenerateCanonicalLink_regenerate_canonical_link | null;
}

export interface regenerateCanonicalLinkVariables {
  block_id: string;
}
