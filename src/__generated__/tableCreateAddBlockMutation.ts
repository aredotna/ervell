/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: tableCreateAddBlockMutation
// ====================================================

export interface tableCreateAddBlockMutation_create_block_block {
  __typename: "Attachment" | "Channel" | "Embed" | "Image" | "Link" | "PendingBlock" | "Text";
  id: number;
}

export interface tableCreateAddBlockMutation_create_block {
  __typename: "CreateBlockMutationPayload";
  block: tableCreateAddBlockMutation_create_block_block;
}

export interface tableCreateAddBlockMutation {
  create_block: tableCreateAddBlockMutation_create_block | null;
}

export interface tableCreateAddBlockMutationVariables {
  channel_id: string;
  value?: string | null;
}
