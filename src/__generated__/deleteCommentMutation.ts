/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deleteCommentMutation
// ====================================================

export interface deleteCommentMutation_delete_comment_commentable_counts {
  __typename: "BlockCounts";
  comments: number;
}

export interface deleteCommentMutation_delete_comment_commentable_comments_user {
  __typename: "User";
  id: number;
  name: string;
  href: string;
}

export interface deleteCommentMutation_delete_comment_commentable_comments_can {
  __typename: "CommentCan";
  destroy: boolean;
}

export interface deleteCommentMutation_delete_comment_commentable_comments {
  __typename: "Comment";
  id: number;
  body: string | null;
  created_at: string;
  user: deleteCommentMutation_delete_comment_commentable_comments_user | null;
  can: deleteCommentMutation_delete_comment_commentable_comments_can;
}

export interface deleteCommentMutation_delete_comment_commentable {
  __typename: "Attachment" | "Embed" | "Image" | "Link" | "PendingBlock" | "Text";
  id: number;
  counts: deleteCommentMutation_delete_comment_commentable_counts;
  comments: deleteCommentMutation_delete_comment_commentable_comments[];
}

export interface deleteCommentMutation_delete_comment {
  __typename: "DeleteCommentMutationPayload";
  commentable: deleteCommentMutation_delete_comment_commentable;
}

export interface deleteCommentMutation {
  delete_comment: deleteCommentMutation_delete_comment | null;
}

export interface deleteCommentMutationVariables {
  id: string;
}
