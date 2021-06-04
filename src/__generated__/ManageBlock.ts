/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ManageBlock
// ====================================================

export interface ManageBlock_Channel {
  __typename: "Channel" | "Image" | "Link" | "Embed" | "Attachment" | "PendingBlock";
  id: number | null;
  editable_title: string | null;
  editable_description: string | null;
}

export interface ManageBlock_Text {
  __typename: "Text";
  id: number | null;
  editable_title: string | null;
  editable_description: string | null;
  editable_content: string | null;
}

export type ManageBlock = ManageBlock_Channel | ManageBlock_Text;
