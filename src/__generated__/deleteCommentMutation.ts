/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deleteCommentMutation
// ====================================================

export interface deleteCommentMutation_delete_comment_commentable_counts {
  __typename: "BlockCounts";
  comments: number | null;
}

export interface deleteCommentMutation_delete_comment_commentable_comments_user {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
}

export interface deleteCommentMutation_delete_comment_commentable_comments_can {
  __typename: "CommentCan";
  destroy: boolean | null;
}

export interface deleteCommentMutation_delete_comment_commentable_comments {
  __typename: "Comment";
  id: number | null;
  body: string | null;
  created_at: string | null;
  user: deleteCommentMutation_delete_comment_commentable_comments_user | null;
  can: deleteCommentMutation_delete_comment_commentable_comments_can | null;
}

export interface deleteCommentMutation_delete_comment_commentable {
  __typename: "Text" | "Image" | "Link" | "Embed" | "Attachment" | "PendingBlock";
  id: number | null;
  counts: deleteCommentMutation_delete_comment_commentable_counts | null;
  comments: (deleteCommentMutation_delete_comment_commentable_comments | null)[] | null;
}

export interface deleteCommentMutation_delete_comment {
  __typename: "DeleteCommentPayload";
  commentable: deleteCommentMutation_delete_comment_commentable | null;
}

export interface deleteCommentMutation {
  delete_comment: deleteCommentMutation_delete_comment | null;
}

export interface deleteCommentMutationVariables {
  id: string;
}
