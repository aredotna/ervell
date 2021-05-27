/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: KonnectableSimpleDisplay
// ====================================================

export interface KonnectableSimpleDisplay_PendingBlock {
  __typename: "PendingBlock";
  id: number | null;
}

export interface KonnectableSimpleDisplay_Text {
  __typename: "Text";
  id: number | null;
  preview_content: string | null;
}

export interface KonnectableSimpleDisplay_Image {
  __typename: "Image";
  id: number | null;
  preview_image_url: string | null;
}

export interface KonnectableSimpleDisplay_Link {
  __typename: "Link";
  id: number | null;
  preview_image_url: string | null;
}

export interface KonnectableSimpleDisplay_Attachment {
  __typename: "Attachment";
  id: number | null;
  preview_image_url: string | null;
  file_extension: string | null;
}

export interface KonnectableSimpleDisplay_Embed {
  __typename: "Embed";
  id: number | null;
  preview_image_url: string | null;
}

export interface KonnectableSimpleDisplay_Channel_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface KonnectableSimpleDisplay_Channel_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
}

export type KonnectableSimpleDisplay_Channel_owner = KonnectableSimpleDisplay_Channel_owner_User | KonnectableSimpleDisplay_Channel_owner_Group;

export interface KonnectableSimpleDisplay_Channel {
  __typename: "Channel";
  id: number | null;
  preview_title: string | null;
  visibility: string | null;
  owner: KonnectableSimpleDisplay_Channel_owner | null;
}

export type KonnectableSimpleDisplay = KonnectableSimpleDisplay_PendingBlock | KonnectableSimpleDisplay_Text | KonnectableSimpleDisplay_Image | KonnectableSimpleDisplay_Link | KonnectableSimpleDisplay_Attachment | KonnectableSimpleDisplay_Embed | KonnectableSimpleDisplay_Channel;
