/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ManageChannelQuery
// ====================================================

export interface ManageChannelQuery_channel_can {
  __typename: "ChannelCan";
  destroy: boolean | null;
  export: boolean | null;
  transfer: boolean | null;
}

export interface ManageChannelQuery_channel_user {
  __typename: "User";
  id: number;
}

export interface ManageChannelQuery_channel_owner_User {
  __typename: "User";
  id: number;
}

export interface ManageChannelQuery_channel_owner_Group {
  __typename: "Group";
  id: number;
}

export type ManageChannelQuery_channel_owner = ManageChannelQuery_channel_owner_User | ManageChannelQuery_channel_owner_Group;

export interface ManageChannelQuery_channel_transfer_request_recipient_User {
  __typename: "User";
  id: number;
  name: string;
}

export interface ManageChannelQuery_channel_transfer_request_recipient_Group {
  __typename: "Group";
  id: number;
  name: string;
}

export type ManageChannelQuery_channel_transfer_request_recipient = ManageChannelQuery_channel_transfer_request_recipient_User | ManageChannelQuery_channel_transfer_request_recipient_Group;

export interface ManageChannelQuery_channel_transfer_request {
  __typename: "ChannelTransferRequest";
  recipient: ManageChannelQuery_channel_transfer_request_recipient;
  is_recipient_member: boolean | null;
}

export interface ManageChannelQuery_channel {
  __typename: "Channel";
  id: number;
  href: string | null;
  title: string;
  description: string | null;
  visibility: string;
  content_flag: string | null;
  can: ManageChannelQuery_channel_can | null;
  user: ManageChannelQuery_channel_user | null;
  owner: ManageChannelQuery_channel_owner;
  is_pending_transfer: boolean;
  transfer_request: ManageChannelQuery_channel_transfer_request | null;
}

export interface ManageChannelQuery_me_counts {
  __typename: "MeCounts";
  groups: number | null;
}

export interface ManageChannelQuery_me {
  __typename: "Me";
  id: number;
  counts: ManageChannelQuery_me_counts | null;
}

export interface ManageChannelQuery {
  /**
   * A single channel
   */
  channel: ManageChannelQuery_channel | null;
  /**
   * The current logged in user
   */
  me: ManageChannelQuery_me | null;
}

export interface ManageChannelQueryVariables {
  id: string;
}
