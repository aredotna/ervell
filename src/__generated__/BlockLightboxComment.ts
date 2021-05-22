/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BlockLightboxComment
// ====================================================

export interface BlockLightboxComment_user {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
}

export interface BlockLightboxComment_can {
  __typename: "CommentCan";
  destroy: boolean | null;
}

export interface BlockLightboxComment {
  __typename: "Comment";
  id: number | null;
  body: string | null;
  created_at: string | null;
  user: BlockLightboxComment_user | null;
  can: BlockLightboxComment_can | null;
}
