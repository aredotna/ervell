/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ChannelMetadataInfo
// ====================================================

export interface ChannelMetadataInfo_counts {
  __typename: "ChannelCounts";
  followers: number;
}

export interface ChannelMetadataInfo_can {
  __typename: "ChannelCan";
  share: boolean;
}

export interface ChannelMetadataInfo_user {
  __typename: "User";
  id: number;
  href: string;
  name: string;
}

export interface ChannelMetadataInfo {
  __typename: "Channel";
  id: number;
  href: string;
  visibility: string;
  info: string | null;
  counts: ChannelMetadataInfo_counts;
  can: ChannelMetadataInfo_can;
  user: ChannelMetadataInfo_user | null;
}
