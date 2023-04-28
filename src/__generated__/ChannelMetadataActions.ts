/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ChannelMetadataActions
// ====================================================

export interface ChannelMetadataActions_can {
  __typename: "ChannelCan";
  follow: boolean;
  update: boolean;
  destroy: boolean;
  mute: boolean;
}

export interface ChannelMetadataActions {
  __typename: "Channel";
  id: number;
  can: ChannelMetadataActions_can;
  is_muted: boolean;
}
