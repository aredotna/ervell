/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createBlockMutation
// ====================================================

export interface createBlockMutation_create_block_block {
  __typename: "Channel" | "Text" | "Image" | "Link" | "Embed" | "Attachment" | "PendingBlock";
  id: number | null;
}

export interface createBlockMutation_create_block {
  __typename: "CreateBlockPayload";
  block: createBlockMutation_create_block_block | null;
}

export interface createBlockMutation {
  create_block: createBlockMutation_create_block | null;
}

export interface createBlockMutationVariables {
  channel_id: string;
  value?: string | null;
}
