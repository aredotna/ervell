/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateComment
// ====================================================

export interface CreateComment_create_comment_comment_commentable_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface CreateComment_create_comment_comment_commentable_comments_user {
  __typename: "User";
  id: number;
  name: string;
  href: string;
}

export interface CreateComment_create_comment_comment_commentable_comments_can {
  __typename: "CommentCan";
  destroy: boolean;
}

export interface CreateComment_create_comment_comment_commentable_comments {
  __typename: "Comment";
  id: number;
  body: string | null;
  created_at: string;
  user: CreateComment_create_comment_comment_commentable_comments_user | null;
  can: CreateComment_create_comment_comment_commentable_comments_can;
}

export interface CreateComment_create_comment_comment_commentable {
  __typename: "Attachment" | "Embed" | "Image" | "Link" | "PendingBlock" | "Text";
  id: number;
  counts: CreateComment_create_comment_comment_commentable_counts | null;
  comments: CreateComment_create_comment_comment_commentable_comments[];
}

export interface CreateComment_create_comment_comment {
  __typename: "Comment";
  id: number;
  commentable: CreateComment_create_comment_comment_commentable;
}

export interface CreateComment_create_comment {
  __typename: "CreateCommentMutationPayload";
  comment: CreateComment_create_comment_comment;
}

export interface CreateComment {
  create_comment: CreateComment_create_comment | null;
}

export interface CreateCommentVariables {
  body: string;
  block_id: string;
}
