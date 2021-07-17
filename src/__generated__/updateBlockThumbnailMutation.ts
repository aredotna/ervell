/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateBlockThumbnailMutation
// ====================================================

export interface updateBlockThumbnailMutation_update_block_thumbnail_blokk {
  __typename: "Attachment" | "Channel" | "Embed" | "Image" | "Link" | "PendingBlock" | "Text";
  id: number;
}

export interface updateBlockThumbnailMutation_update_block_thumbnail {
  __typename: "UpdateBlockThumbnailMutationPayload";
  blokk: updateBlockThumbnailMutation_update_block_thumbnail_blokk;
}

export interface updateBlockThumbnailMutation {
  update_block_thumbnail: updateBlockThumbnailMutation_update_block_thumbnail | null;
}

export interface updateBlockThumbnailMutationVariables {
  id: string;
  image_url: string;
}
