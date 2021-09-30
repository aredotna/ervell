/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FullChannelMetadataActions
// ====================================================

export interface FullChannelMetadataActions_can {
  __typename: "ChannelCan";
  mute: boolean | null;
}

export interface FullChannelMetadataActions {
  __typename: "Channel";
  id: number;
  can: FullChannelMetadataActions_can | null;
  shareable_href: string | null;
  shareable_title: string;
}
