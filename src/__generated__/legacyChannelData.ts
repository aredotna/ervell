/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: legacyChannelData
// ====================================================

export interface legacyChannelData_channel_owner_Group {
  __typename: "Group";
  id: number | null;
}

export interface legacyChannelData_channel_owner_User {
  __typename: "User";
  id: number | null;
}

export type legacyChannelData_channel_owner = legacyChannelData_channel_owner_Group | legacyChannelData_channel_owner_User;

export interface legacyChannelData_channel_can {
  __typename: "ChannelCan";
  add_to: boolean | null;
  update: boolean | null;
}

export interface legacyChannelData_channel {
  __typename: "Channel";
  id: number | null;
  owner: legacyChannelData_channel_owner | null;
  can: legacyChannelData_channel_can | null;
}

export interface legacyChannelData {
  /**
   * A single channel
   */
  channel: legacyChannelData_channel | null;
}

export interface legacyChannelDataVariables {
  id: string;
}
