/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FullBlockText
// ====================================================

export interface FullBlockText_can {
  __typename: "BlockCan";
  manage: boolean | null;
}

export interface FullBlockText {
  __typename: "Text";
  id: number;
  content: string;
  can: FullBlockText_can | null;
}
