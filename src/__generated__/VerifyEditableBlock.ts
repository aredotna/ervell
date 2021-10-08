/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: VerifyEditableBlock
// ====================================================

export interface VerifyEditableBlock_blokk_Channel {
  __typename: "Channel";
  id: number;
}

export interface VerifyEditableBlock_blokk_Attachment_can {
  __typename: "BlockCan";
  manage: boolean | null;
}

export interface VerifyEditableBlock_blokk_Attachment {
  __typename: "Attachment" | "Embed" | "Image" | "Link" | "PendingBlock" | "Text";
  id: number;
  can: VerifyEditableBlock_blokk_Attachment_can | null;
}

export type VerifyEditableBlock_blokk = VerifyEditableBlock_blokk_Channel | VerifyEditableBlock_blokk_Attachment;

export interface VerifyEditableBlock {
  blokk: VerifyEditableBlock_blokk | null;
}

export interface VerifyEditableBlockVariables {
  id: string;
}
