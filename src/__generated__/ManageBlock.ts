/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ManageBlock
// ====================================================

export interface ManageBlock_Attachment {
  __typename: "Attachment" | "Channel" | "Embed" | "Image" | "Link" | "PendingBlock";
  id: number;
  editable_title: string;
  editable_description: string | null;
}

export interface ManageBlock_Text {
  __typename: "Text";
  id: number;
  editable_title: string;
  editable_description: string | null;
  editable_content: string;
}

export type ManageBlock = ManageBlock_Attachment | ManageBlock_Text;
