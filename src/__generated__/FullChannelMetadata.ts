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
  href: string | null;
}

export interface FullChannelMetadata_channel_can {
  __typename: "ChannelCan";
  mute: boolean | null;
}

export interface FullChannelMetadata_channel {
  __typename: "Channel";
  created_at_unix_time: string | null;
  created_at_timestamp: string | null;
  created_at: string | null;
  updated_at: string | null;
  updated_at_timestamp: string | null;
  title: string;
  description: string | null;
  user: FullChannelMetadata_channel_user | null;
  id: number;
  can: FullChannelMetadata_channel_can | null;
  shareable_href: string | null;
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
