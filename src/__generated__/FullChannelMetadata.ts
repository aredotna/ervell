/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FullChannelMetadata
// ====================================================

export interface FullChannelMetadata_channel_user {
  __typename: "User";
  id: number;
  name: string;
  href: string;
}

export interface FullChannelMetadata_channel_can {
  __typename: "ChannelCan";
  mute: boolean;
  follow: boolean;
}

export interface FullChannelMetadata_channel {
  __typename: "Channel";
  created_at_unix_time: string;
  created_at_timestamp: string;
  created_at: string;
  updated_at: string;
  updated_at_timestamp: string;
  title: string;
  description: string | null;
  user: FullChannelMetadata_channel_user;
  id: number;
  can: FullChannelMetadata_channel_can;
  shareable_href: string;
  shareable_title: string;
}

export interface FullChannelMetadata {
  /**
   * A single channel
   */
  channel: FullChannelMetadata_channel | null;
}

export interface FullChannelMetadataVariables {
  id: string;
}
