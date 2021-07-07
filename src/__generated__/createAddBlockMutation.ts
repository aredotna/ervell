/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createAddBlockMutation
// ====================================================

export interface createAddBlockMutation_create_block_block {
  __typename: "Attachment" | "Channel" | "Embed" | "Image" | "Link" | "PendingBlock" | "Text";
  id: number;
}

export interface createAddBlockMutation_create_block {
  __typename: "CreateBlockMutationPayload";
  block: createAddBlockMutation_create_block_block;
}

export interface createAddBlockMutation {
  create_block: createAddBlockMutation_create_block | null;
}

export interface createAddBlockMutationVariables {
  channel_id: string;
  value?: string | null;
}
