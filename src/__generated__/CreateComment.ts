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
  id: number | null;
  name: string | null;
  href: string | null;
}

export interface CreateComment_create_comment_comment_commentable_comments_can {
  __typename: "CommentCan";
  destroy: boolean | null;
}

export interface CreateComment_create_comment_comment_commentable_comments {
  __typename: "Comment";
  id: number | null;
  body: string | null;
  created_at: string | null;
  user: CreateComment_create_comment_comment_commentable_comments_user | null;
  can: CreateComment_create_comment_comment_commentable_comments_can | null;
}

export interface CreateComment_create_comment_comment_commentable {
  __typename: "Text" | "Image" | "Link" | "Embed" | "Attachment" | "PendingBlock";
  id: number | null;
  counts: CreateComment_create_comment_comment_commentable_counts | null;
  comments: (CreateComment_create_comment_comment_commentable_comments | null)[] | null;
}

export interface CreateComment_create_comment_comment {
  __typename: "Comment";
  id: number | null;
  commentable: CreateComment_create_comment_comment_commentable | null;
}

export interface CreateComment_create_comment {
  __typename: "CreateCommentPayload";
  comment: CreateComment_create_comment_comment | null;
}

export interface CreateComment {
  create_comment: CreateComment_create_comment | null;
}

export interface CreateCommentVariables {
  body: string;
  block_id: string;
}
