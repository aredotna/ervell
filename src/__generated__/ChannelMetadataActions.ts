/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ChannelMetadataActions
// ====================================================

export interface ChannelMetadataActions_can {
  __typename: "ChannelCan";
  follow: boolean | null;
  update: boolean | null;
  destroy: boolean | null;
  mute: boolean | null;
}

export interface ChannelMetadataActions {
  __typename: "Channel";
  id: number | null;
  can: ChannelMetadataActions_can | null;
  is_muted: boolean | null;
}
