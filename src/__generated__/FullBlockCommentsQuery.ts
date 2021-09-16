/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FullBlockCommentsQuery
// ====================================================

export interface FullBlockCommentsQuery_block_Channel {
  __typename: "Channel";
  id: number;
}

export interface FullBlockCommentsQuery_block_Attachment_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface FullBlockCommentsQuery_block_Attachment_comments_user {
  __typename: "User";
  id: number;
  name: string;
  href: string | null;
}

export interface FullBlockCommentsQuery_block_Attachment_comments_can {
  __typename: "CommentCan";
  destroy: boolean | null;
}

export interface FullBlockCommentsQuery_block_Attachment_comments {
  __typename: "Comment";
  id: number;
  body: string | null;
  created_at: string | null;
  user: FullBlockCommentsQuery_block_Attachment_comments_user | null;
  can: FullBlockCommentsQuery_block_Attachment_comments_can | null;
}

export interface FullBlockCommentsQuery_block_Attachment {
  __typename: "Attachment" | "Embed" | "Image" | "Link" | "PendingBlock" | "Text";
  id: number;
  counts: FullBlockCommentsQuery_block_Attachment_counts | null;
  comments: FullBlockCommentsQuery_block_Attachment_comments[] | null;
}

export type FullBlockCommentsQuery_block = FullBlockCommentsQuery_block_Channel | FullBlockCommentsQuery_block_Attachment;

export interface FullBlockCommentsQuery {
  block: FullBlockCommentsQuery_block | null;
}

export interface FullBlockCommentsQueryVariables {
  id: string;
}
