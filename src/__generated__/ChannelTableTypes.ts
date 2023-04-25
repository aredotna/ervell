/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ConnectableTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: ChannelTableTypes
// ====================================================

export interface ChannelTableTypes_channel {
  __typename: "Channel";
  id: number;
  types: ConnectableTypeEnum[];
}

export interface ChannelTableTypes {
  /**
   * A single channel
   */
  channel: ChannelTableTypes_channel | null;
}

export interface ChannelTableTypesVariables {
  id: string;
}
