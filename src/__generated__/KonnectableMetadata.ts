/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: KonnectableMetadata
// ====================================================

export interface KonnectableMetadata_Channel_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface KonnectableMetadata_Channel_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface KonnectableMetadata_Channel_connection {
  __typename: "Connection";
  created_at: string | null;
  user: KonnectableMetadata_Channel_connection_user | null;
}

export interface KonnectableMetadata_Channel {
  __typename: "Channel" | "Text" | "Image" | "Link" | "Embed" | "PendingBlock";
  updated_at: string | null;
  title: string | null;
  user: KonnectableMetadata_Channel_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: KonnectableMetadata_Channel_connection | null;
}

export interface KonnectableMetadata_Attachment_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface KonnectableMetadata_Attachment_connection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface KonnectableMetadata_Attachment_connection {
  __typename: "Connection";
  created_at: string | null;
  user: KonnectableMetadata_Attachment_connection_user | null;
}

export interface KonnectableMetadata_Attachment {
  __typename: "Attachment";
  updated_at: string | null;
  title: string | null;
  user: KonnectableMetadata_Attachment_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: KonnectableMetadata_Attachment_connection | null;
  file_extension: string | null;
}

export type KonnectableMetadata = KonnectableMetadata_Channel | KonnectableMetadata_Attachment;
