/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BlockLightboxAttachment
// ====================================================

export interface BlockLightboxAttachment_Channel {
  __typename: "Channel" | "Embed" | "Image" | "Link" | "PendingBlock" | "Text";
}

export interface BlockLightboxAttachment_Attachment {
  __typename: "Attachment";
  id: number;
  title: string;
  file_extension: string | null;
  file_url: string | null;
  file_size: string | null;
  file_content_type: string | null;
  image_url: string | null;
  image_updated_at: string | null;
  image_updated_at_unix_time: string | null;
}

export type BlockLightboxAttachment = BlockLightboxAttachment_Channel | BlockLightboxAttachment_Attachment;
