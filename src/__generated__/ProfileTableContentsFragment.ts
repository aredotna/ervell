/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProfileTableContentsFragment
// ====================================================

export interface ProfileTableContentsFragment_contents_PendingBlock_user {
  __typename: "User";
  name: string;
}

export interface ProfileTableContentsFragment_contents_PendingBlock_connection {
  __typename: "Connection";
  id: number;
  created_at: string;
  selected: boolean;
}

export interface ProfileTableContentsFragment_contents_PendingBlock_counts {
  __typename: "BlockCounts";
  public_channels: number;
}

export interface ProfileTableContentsFragment_contents_PendingBlock {
  __typename: "PendingBlock";
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  user: ProfileTableContentsFragment_contents_PendingBlock_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileTableContentsFragment_contents_PendingBlock_connection | null;
  href: string;
  counts: ProfileTableContentsFragment_contents_PendingBlock_counts;
}

export interface ProfileTableContentsFragment_contents_Attachment_user {
  __typename: "User";
  name: string;
}

export interface ProfileTableContentsFragment_contents_Attachment_connection {
  __typename: "Connection";
  id: number;
  created_at: string;
  selected: boolean;
}

export interface ProfileTableContentsFragment_contents_Attachment_counts {
  __typename: "BlockCounts";
  public_channels: number;
}

export interface ProfileTableContentsFragment_contents_Attachment_source {
  __typename: "ConnectableSource";
  url: string | null;
  provider_url: string | null;
}

export interface ProfileTableContentsFragment_contents_Attachment {
  __typename: "Attachment";
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  user: ProfileTableContentsFragment_contents_Attachment_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileTableContentsFragment_contents_Attachment_connection | null;
  counts: ProfileTableContentsFragment_contents_Attachment_counts;
  file_url: string | null;
  image_url: string | null;
  href: string;
  source: ProfileTableContentsFragment_contents_Attachment_source | null;
}

export interface ProfileTableContentsFragment_contents_Embed_user {
  __typename: "User";
  name: string;
}

export interface ProfileTableContentsFragment_contents_Embed_connection {
  __typename: "Connection";
  id: number;
  created_at: string;
  selected: boolean;
}

export interface ProfileTableContentsFragment_contents_Embed_counts {
  __typename: "BlockCounts";
  public_channels: number;
}

export interface ProfileTableContentsFragment_contents_Embed_source {
  __typename: "ConnectableSource";
  url: string | null;
  provider_url: string | null;
}

export interface ProfileTableContentsFragment_contents_Embed {
  __typename: "Embed";
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  user: ProfileTableContentsFragment_contents_Embed_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileTableContentsFragment_contents_Embed_connection | null;
  counts: ProfileTableContentsFragment_contents_Embed_counts;
  embed_html: string | null;
  image_url: string | null;
  href: string;
  source: ProfileTableContentsFragment_contents_Embed_source | null;
}

export interface ProfileTableContentsFragment_contents_Image_user {
  __typename: "User";
  name: string;
}

export interface ProfileTableContentsFragment_contents_Image_connection {
  __typename: "Connection";
  id: number;
  created_at: string;
  selected: boolean;
}

export interface ProfileTableContentsFragment_contents_Image_counts {
  __typename: "BlockCounts";
  public_channels: number;
}

export interface ProfileTableContentsFragment_contents_Image_source {
  __typename: "ConnectableSource";
  url: string | null;
  provider_url: string | null;
}

export interface ProfileTableContentsFragment_contents_Image {
  __typename: "Image";
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  user: ProfileTableContentsFragment_contents_Image_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileTableContentsFragment_contents_Image_connection | null;
  counts: ProfileTableContentsFragment_contents_Image_counts;
  image_url: string | null;
  href: string;
  /**
   * URL to find the original image on various services
   */
  find_original_url: string | null;
  source: ProfileTableContentsFragment_contents_Image_source | null;
}

export interface ProfileTableContentsFragment_contents_Link_user {
  __typename: "User";
  name: string;
}

export interface ProfileTableContentsFragment_contents_Link_connection {
  __typename: "Connection";
  id: number;
  created_at: string;
  selected: boolean;
}

export interface ProfileTableContentsFragment_contents_Link_counts {
  __typename: "BlockCounts";
  public_channels: number;
}

export interface ProfileTableContentsFragment_contents_Link_source {
  __typename: "ConnectableSource";
  url: string | null;
  provider_url: string | null;
}

export interface ProfileTableContentsFragment_contents_Link {
  __typename: "Link";
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  user: ProfileTableContentsFragment_contents_Link_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileTableContentsFragment_contents_Link_connection | null;
  counts: ProfileTableContentsFragment_contents_Link_counts;
  image_url: string | null;
  href: string;
  source: ProfileTableContentsFragment_contents_Link_source | null;
}

export interface ProfileTableContentsFragment_contents_Text_user {
  __typename: "User";
  name: string;
}

export interface ProfileTableContentsFragment_contents_Text_connection {
  __typename: "Connection";
  id: number;
  created_at: string;
  selected: boolean;
}

export interface ProfileTableContentsFragment_contents_Text_counts {
  __typename: "BlockCounts";
  public_channels: number;
}

export interface ProfileTableContentsFragment_contents_Text_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ProfileTableContentsFragment_contents_Text {
  __typename: "Text";
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  user: ProfileTableContentsFragment_contents_Text_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileTableContentsFragment_contents_Text_connection | null;
  counts: ProfileTableContentsFragment_contents_Text_counts;
  content: string;
  html: string;
  /**
   * URL to find the original image on various services
   */
  find_original_url: string | null;
  href: string;
  source: ProfileTableContentsFragment_contents_Text_source | null;
}

export interface ProfileTableContentsFragment_contents_Channel_user {
  __typename: "User";
  name: string;
}

export interface ProfileTableContentsFragment_contents_Channel_connection {
  __typename: "Connection";
  id: number;
  created_at: string;
  selected: boolean;
}

export interface ProfileTableContentsFragment_contents_Channel_counts {
  __typename: "ChannelCounts";
  connected_to_channels: number;
  contents: number;
}

export interface ProfileTableContentsFragment_contents_Channel {
  __typename: "Channel";
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  user: ProfileTableContentsFragment_contents_Channel_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileTableContentsFragment_contents_Channel_connection | null;
  visibility: string;
  href: string;
  counts: ProfileTableContentsFragment_contents_Channel_counts;
}

export type ProfileTableContentsFragment_contents = ProfileTableContentsFragment_contents_PendingBlock | ProfileTableContentsFragment_contents_Attachment | ProfileTableContentsFragment_contents_Embed | ProfileTableContentsFragment_contents_Image | ProfileTableContentsFragment_contents_Link | ProfileTableContentsFragment_contents_Text | ProfileTableContentsFragment_contents_Channel;

export interface ProfileTableContentsFragment {
  __typename: "User";
  id: number;
  name: string;
  contents: ProfileTableContentsFragment_contents[];
}
