/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ConnectableTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: ChannelContentCount
// ====================================================

export interface ChannelContentCount_channel_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface ChannelContentCount_channel {
  __typename: "Channel";
  id: number;
  counts: ChannelContentCount_channel_counts | null;
}

export interface ChannelContentCount {
  /**
   * A single channel
   */
  channel: ChannelContentCount_channel | null;
}

export interface ChannelContentCountVariables {
  id: string;
  type?: ConnectableTypeEnum | null;
  user_id?: string | null;
}
