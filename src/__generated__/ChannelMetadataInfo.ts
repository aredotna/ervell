/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ChannelMetadataInfo
// ====================================================

export interface ChannelMetadataInfo_counts {
  __typename: "ChannelCounts";
  followers: number | null;
}

export interface ChannelMetadataInfo_can {
  __typename: "ChannelCan";
  share: boolean | null;
}

export interface ChannelMetadataInfo_user {
  __typename: "User";
  id: number | null;
  href: string | null;
  name: string | null;
}

export interface ChannelMetadataInfo {
  __typename: "Channel";
  id: number | null;
  href: string | null;
  visibility: string | null;
  info: string | null;
  counts: ChannelMetadataInfo_counts | null;
  can: ChannelMetadataInfo_can | null;
  user: ChannelMetadataInfo_user | null;
}
