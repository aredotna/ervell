/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BlockLightboxComments
// ====================================================

export interface BlockLightboxComments_Channel {
  __typename: "Channel";
  id: number | null;
}

export interface BlockLightboxComments_Text_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface BlockLightboxComments_Text_comments_user {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
}

export interface BlockLightboxComments_Text_comments_can {
  __typename: "CommentCan";
  destroy: boolean | null;
}

export interface BlockLightboxComments_Text_comments {
  __typename: "Comment";
  id: number | null;
  body: string | null;
  created_at: string | null;
  user: BlockLightboxComments_Text_comments_user | null;
  can: BlockLightboxComments_Text_comments_can | null;
}

export interface BlockLightboxComments_Text {
  __typename: "Text" | "Image" | "Link" | "Embed" | "Attachment" | "PendingBlock";
  id: number | null;
  counts: BlockLightboxComments_Text_counts | null;
  comments: (BlockLightboxComments_Text_comments | null)[] | null;
}

export type BlockLightboxComments = BlockLightboxComments_Channel | BlockLightboxComments_Text;
