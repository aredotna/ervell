/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createAddBlockMutation
// ====================================================

export interface createAddBlockMutation_create_block_block {
  __typename: "Channel" | "Text" | "Image" | "Link" | "Embed" | "Attachment" | "PendingBlock";
  id: number | null;
}

export interface createAddBlockMutation_create_block {
  __typename: "CreateBlockPayload";
  block: createAddBlockMutation_create_block_block | null;
}

export interface createAddBlockMutation {
  create_block: createAddBlockMutation_create_block | null;
}

export interface createAddBlockMutationVariables {
  channel_id: string;
  value?: string | null;
}
