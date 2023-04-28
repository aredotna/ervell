/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FullBlockMetadataPane
// ====================================================

export interface FullBlockMetadataPane_Channel_user {
  __typename: "User";
  id: number;
  name: string;
  href: string;
}

export interface FullBlockMetadataPane_Channel_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface FullBlockMetadataPane_Channel {
  __typename: "Channel";
  created_at_unix_time: string;
  created_at_timestamp: string;
  created_at: string;
  updated_at: string;
  updated_at_timestamp: string;
  title: string;
  description: string | null;
  user: FullBlockMetadataPane_Channel_user | null;
  source: FullBlockMetadataPane_Channel_source | null;
  shareable_href: string;
  shareable_title: string;
  id: number;
  editable_title: string;
  editable_description: string | null;
}

export interface FullBlockMetadataPane_Attachment_user {
  __typename: "User";
  id: number;
  name: string;
  href: string;
}

export interface FullBlockMetadataPane_Attachment_can {
  __typename: "BlockCan";
  manage: boolean;
  comment: boolean;
  mute: boolean;
  potentially_edit_thumbnail: boolean;
  edit_thumbnail: boolean;
}

export interface FullBlockMetadataPane_Attachment_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface FullBlockMetadataPane_Attachment {
  __typename: "Attachment" | "Embed" | "Link" | "PendingBlock";
  created_at_unix_time: string;
  created_at_timestamp: string;
  created_at: string;
  updated_at: string;
  updated_at_timestamp: string;
  title: string;
  description: string | null;
  user: FullBlockMetadataPane_Attachment_user | null;
  can: FullBlockMetadataPane_Attachment_can;
  source: FullBlockMetadataPane_Attachment_source | null;
  shareable_href: string;
  shareable_title: string;
  id: number;
  editable_title: string;
  editable_description: string | null;
}

export interface FullBlockMetadataPane_Image_user {
  __typename: "User";
  id: number;
  name: string;
  href: string;
}

export interface FullBlockMetadataPane_Image_can {
  __typename: "BlockCan";
  manage: boolean;
  comment: boolean;
  mute: boolean;
  potentially_edit_thumbnail: boolean;
  edit_thumbnail: boolean;
}

export interface FullBlockMetadataPane_Image_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface FullBlockMetadataPane_Image {
  __typename: "Image";
  created_at_unix_time: string;
  created_at_timestamp: string;
  created_at: string;
  updated_at: string;
  updated_at_timestamp: string;
  title: string;
  description: string | null;
  user: FullBlockMetadataPane_Image_user | null;
  can: FullBlockMetadataPane_Image_can;
  source: FullBlockMetadataPane_Image_source | null;
  shareable_href: string;
  shareable_title: string;
  /**
   * URL to find the original image on various services
   */
  find_original_url: string | null;
  downloadable_image: string | null;
  id: number;
  editable_title: string;
  editable_description: string | null;
  editable_alt_text: string | null;
}

export interface FullBlockMetadataPane_Text_user {
  __typename: "User";
  id: number;
  name: string;
  href: string;
}

export interface FullBlockMetadataPane_Text_can {
  __typename: "BlockCan";
  manage: boolean;
  comment: boolean;
  mute: boolean;
  potentially_edit_thumbnail: boolean;
  edit_thumbnail: boolean;
}

export interface FullBlockMetadataPane_Text_source {
  __typename: "ConnectableSource";
  title: string | null;
  url: string | null;
}

export interface FullBlockMetadataPane_Text {
  __typename: "Text";
  created_at_unix_time: string;
  created_at_timestamp: string;
  created_at: string;
  updated_at: string;
  updated_at_timestamp: string;
  title: string;
  description: string | null;
  user: FullBlockMetadataPane_Text_user | null;
  can: FullBlockMetadataPane_Text_can;
  source: FullBlockMetadataPane_Text_source | null;
  shareable_href: string;
  shareable_title: string;
  /**
   * URL to find the original image on various services
   */
  find_original_url: string | null;
  id: number;
  editable_title: string;
  editable_description: string | null;
  editable_content: string;
}

export type FullBlockMetadataPane = FullBlockMetadataPane_Channel | FullBlockMetadataPane_Attachment | FullBlockMetadataPane_Image | FullBlockMetadataPane_Text;
