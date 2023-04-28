/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FullBlockComments
// ====================================================

export interface FullBlockComments_Channel {
  __typename: "Channel";
  id: number;
}

export interface FullBlockComments_Attachment_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface FullBlockComments_Attachment_comments_user {
  __typename: "User";
  id: number;
  name: string;
  href: string;
}

export interface FullBlockComments_Attachment_comments_can {
  __typename: "CommentCan";
  destroy: boolean;
}

export interface FullBlockComments_Attachment_comments {
  __typename: "Comment";
  id: number;
  body: string | null;
  created_at: string;
  user: FullBlockComments_Attachment_comments_user | null;
  can: FullBlockComments_Attachment_comments_can;
}

export interface FullBlockComments_Attachment {
  __typename: "Attachment" | "Embed" | "Image" | "Link" | "PendingBlock" | "Text";
  id: number;
  counts: FullBlockComments_Attachment_counts | null;
  comments: FullBlockComments_Attachment_comments[];
}

export type FullBlockComments = FullBlockComments_Channel | FullBlockComments_Attachment;
