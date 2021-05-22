/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BlockLightboxText
// ====================================================

export interface BlockLightboxText_can {
  __typename: "BlockCan";
  manage: boolean | null;
}

export interface BlockLightboxText {
  __typename: "Text";
  id: number | null;
  content: string | null;
  can: BlockLightboxText_can | null;
}
