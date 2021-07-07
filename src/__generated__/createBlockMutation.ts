/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createBlockMutation
// ====================================================

export interface createBlockMutation_create_block_block {
  __typename: "Attachment" | "Channel" | "Embed" | "Image" | "Link" | "PendingBlock" | "Text";
  id: number;
}

export interface createBlockMutation_create_block {
  __typename: "CreateBlockMutationPayload";
  block: createBlockMutation_create_block_block;
}

export interface createBlockMutation {
  create_block: createBlockMutation_create_block | null;
}

export interface createBlockMutationVariables {
  channel_ids: (string | null)[];
  value?: string | null;
  original_source_url?: string | null;
  original_source_title?: string | null;
  title?: string | null;
  description?: string | null;
}
