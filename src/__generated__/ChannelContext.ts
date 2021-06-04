/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ChannelContext
// ====================================================

export interface ChannelContext_channel_skeleton {
  __typename: "SkeletalConnectable";
  id: number | null;
  type: string | null;
}

export interface ChannelContext_channel {
  __typename: "Channel";
  id: number | null;
  skeleton: (ChannelContext_channel_skeleton | null)[] | null;
}

export interface ChannelContext {
  /**
   * A single channel
   */
  channel: ChannelContext_channel | null;
}

export interface ChannelContextVariables {
  id: string;
}
