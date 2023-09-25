/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: KonnectableMetadata
// ====================================================

export interface KonnectableMetadata_Channel_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface KonnectableMetadata_Channel_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface KonnectableMetadata_Channel_connection {
  __typename: "Connection";
  created_at: string;
  user: KonnectableMetadata_Channel_connection_user | null;
}

export interface KonnectableMetadata_Channel {
  __typename: "Channel" | "Embed" | "Image" | "PendingBlock" | "Text";
  updated_at: string;
  title: string;
  user: KonnectableMetadata_Channel_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: KonnectableMetadata_Channel_connection | null;
}

export interface KonnectableMetadata_Attachment_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface KonnectableMetadata_Attachment_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface KonnectableMetadata_Attachment_connection {
  __typename: "Connection";
  created_at: string;
  user: KonnectableMetadata_Attachment_connection_user | null;
}

export interface KonnectableMetadata_Attachment {
  __typename: "Attachment";
  updated_at: string;
  title: string;
  user: KonnectableMetadata_Attachment_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: KonnectableMetadata_Attachment_connection | null;
  file_extension: string | null;
}

export interface KonnectableMetadata_Link_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface KonnectableMetadata_Link_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface KonnectableMetadata_Link_connection {
  __typename: "Connection";
  created_at: string;
  user: KonnectableMetadata_Link_connection_user | null;
}

export interface KonnectableMetadata_Link {
  __typename: "Link";
  updated_at: string;
  title: string;
  user: KonnectableMetadata_Link_user;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: KonnectableMetadata_Link_connection | null;
  source_url: string | null;
}

export type KonnectableMetadata = KonnectableMetadata_Channel | KonnectableMetadata_Attachment | KonnectableMetadata_Link;
