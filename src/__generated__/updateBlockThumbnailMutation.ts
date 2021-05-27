/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateBlockThumbnailMutation
// ====================================================

export interface updateBlockThumbnailMutation_update_block_thumbnail_blokk {
  __typename: "Channel" | "Text" | "Image" | "Link" | "Embed" | "Attachment" | "PendingBlock";
  id: number | null;
}

export interface updateBlockThumbnailMutation_update_block_thumbnail {
  __typename: "UpdateBlockThumbnailPayload";
  blokk: updateBlockThumbnailMutation_update_block_thumbnail_blokk | null;
}

export interface updateBlockThumbnailMutation {
  update_block_thumbnail: updateBlockThumbnailMutation_update_block_thumbnail | null;
}

export interface updateBlockThumbnailMutationVariables {
  id: string;
  image_url: string;
}
