/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FullBlockFold
// ====================================================

export interface FullBlockFold_block_Channel {
  __typename: "Channel";
  id: number;
}

export interface FullBlockFold_block_Attachment_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
  private_channels: number | null;
  comments: number | null;
}

export interface FullBlockFold_block_Attachment_can {
  __typename: "BlockCan";
  manage: boolean | null;
  comment: boolean | null;
}

export interface FullBlockFold_block_Attachment {
  __typename: "Attachment" | "Embed" | "Image" | "Link" | "PendingBlock" | "Text";
  id: number;
  counts: FullBlockFold_block_Attachment_counts | null;
  can: FullBlockFold_block_Attachment_can | null;
}

export type FullBlockFold_block = FullBlockFold_block_Channel | FullBlockFold_block_Attachment;

export interface FullBlockFold {
  block: FullBlockFold_block | null;
}

export interface FullBlockFoldVariables {
  id: string;
}
