/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BlockLightboxComments
// ====================================================

export interface BlockLightboxComments_Channel {
  __typename: "Channel";
  id: number;
}

export interface BlockLightboxComments_Attachment_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface BlockLightboxComments_Attachment_comments_user {
  __typename: "User";
  id: number;
  name: string;
  href: string | null;
}

export interface BlockLightboxComments_Attachment_comments_can {
  __typename: "CommentCan";
  destroy: boolean | null;
}

export interface BlockLightboxComments_Attachment_comments {
  __typename: "Comment";
  id: number;
  body: string | null;
  created_at: string | null;
  user: BlockLightboxComments_Attachment_comments_user | null;
  can: BlockLightboxComments_Attachment_comments_can | null;
}

export interface BlockLightboxComments_Attachment {
  __typename: "Attachment" | "Embed" | "Image" | "Link" | "PendingBlock" | "Text";
  id: number;
  counts: BlockLightboxComments_Attachment_counts | null;
  comments: BlockLightboxComments_Attachment_comments[] | null;
}

export type BlockLightboxComments = BlockLightboxComments_Channel | BlockLightboxComments_Attachment;
