/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProfileTableRow
// ====================================================

export interface ProfileTableRow_Attachment_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface ProfileTableRow_Attachment_source {
  __typename: "ConnectableSource";
  url: string | null;
  provider_url: string | null;
}

export interface ProfileTableRow_Attachment_user {
  __typename: "User";
  name: string;
}

export interface ProfileTableRow_Attachment {
  __typename: "Attachment";
  id: number;
  created_at: string | null;
  updated_at: string | null;
  counts: ProfileTableRow_Attachment_counts | null;
  file_url: string | null;
  image_url: string | null;
  source: ProfileTableRow_Attachment_source | null;
  title: string;
  user: ProfileTableRow_Attachment_user | null;
}

export interface ProfileTableRow_Embed_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface ProfileTableRow_Embed_source {
  __typename: "ConnectableSource";
  url: string | null;
  provider_url: string | null;
}

export interface ProfileTableRow_Embed_user {
  __typename: "User";
  name: string;
}

export interface ProfileTableRow_Embed {
  __typename: "Embed";
  id: number;
  created_at: string | null;
  updated_at: string | null;
  counts: ProfileTableRow_Embed_counts | null;
  embed_html: string | null;
  image_url: string | null;
  source: ProfileTableRow_Embed_source | null;
  title: string;
  user: ProfileTableRow_Embed_user | null;
}

export interface ProfileTableRow_Image_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface ProfileTableRow_Image_source {
  __typename: "ConnectableSource";
  url: string | null;
  provider_url: string | null;
}

export interface ProfileTableRow_Image_user {
  __typename: "User";
  name: string;
}

export interface ProfileTableRow_Image {
  __typename: "Image";
  id: number;
  created_at: string | null;
  updated_at: string | null;
  counts: ProfileTableRow_Image_counts | null;
  image_url: string | null;
  source: ProfileTableRow_Image_source | null;
  title: string;
  user: ProfileTableRow_Image_user | null;
}

export interface ProfileTableRow_Link_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface ProfileTableRow_Link_source {
  __typename: "ConnectableSource";
  url: string | null;
  provider_url: string | null;
}

export interface ProfileTableRow_Link_user {
  __typename: "User";
  name: string;
}

export interface ProfileTableRow_Link {
  __typename: "Link";
  id: number;
  created_at: string | null;
  updated_at: string | null;
  counts: ProfileTableRow_Link_counts | null;
  image_url: string | null;
  source: ProfileTableRow_Link_source | null;
  title: string;
  user: ProfileTableRow_Link_user | null;
}

export interface ProfileTableRow_PendingBlock_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface ProfileTableRow_PendingBlock_user {
  __typename: "User";
  name: string;
}

export interface ProfileTableRow_PendingBlock {
  __typename: "PendingBlock";
  id: number;
  created_at: string | null;
  updated_at: string | null;
  counts: ProfileTableRow_PendingBlock_counts | null;
  title: string;
  user: ProfileTableRow_PendingBlock_user | null;
}

export interface ProfileTableRow_Text_counts {
  __typename: "BlockCounts";
  public_channels: number | null;
}

export interface ProfileTableRow_Text_user {
  __typename: "User";
  name: string;
}

export interface ProfileTableRow_Text {
  __typename: "Text";
  id: number;
  created_at: string | null;
  updated_at: string | null;
  counts: ProfileTableRow_Text_counts | null;
  content: string;
  html: string;
  title: string;
  user: ProfileTableRow_Text_user | null;
}

export interface ProfileTableRow_Channel_counts {
  __typename: "ChannelCounts";
  connected_to_channels: number | null;
  contents: number | null;
}

export interface ProfileTableRow_Channel_user {
  __typename: "User";
  name: string;
}

export interface ProfileTableRow_Channel {
  __typename: "Channel";
  id: number;
  created_at: string | null;
  updated_at: string | null;
  visibility: string;
  title: string;
  counts: ProfileTableRow_Channel_counts | null;
  user: ProfileTableRow_Channel_user | null;
}

export type ProfileTableRow = ProfileTableRow_Attachment | ProfileTableRow_Embed | ProfileTableRow_Image | ProfileTableRow_Link | ProfileTableRow_PendingBlock | ProfileTableRow_Text | ProfileTableRow_Channel;
