/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: cancelChannelTransferMutation
// ====================================================

export interface cancelChannelTransferMutation_cancel_channel_transfer_channel_can {
  __typename: "ChannelCan";
  transfer: boolean | null;
}

export interface cancelChannelTransferMutation_cancel_channel_transfer_channel_transfer_request_recipient_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface cancelChannelTransferMutation_cancel_channel_transfer_channel_transfer_request_recipient_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
}

export type cancelChannelTransferMutation_cancel_channel_transfer_channel_transfer_request_recipient = cancelChannelTransferMutation_cancel_channel_transfer_channel_transfer_request_recipient_User | cancelChannelTransferMutation_cancel_channel_transfer_channel_transfer_request_recipient_Group;

export interface cancelChannelTransferMutation_cancel_channel_transfer_channel_transfer_request {
  __typename: "ChannelTransferRequest";
  recipient: cancelChannelTransferMutation_cancel_channel_transfer_channel_transfer_request_recipient | null;
  is_recipient_member: boolean | null;
}

export interface cancelChannelTransferMutation_cancel_channel_transfer_channel {
  __typename: "Channel";
  id: number | null;
  can: cancelChannelTransferMutation_cancel_channel_transfer_channel_can | null;
  is_pending_transfer: boolean | null;
  transfer_request: cancelChannelTransferMutation_cancel_channel_transfer_channel_transfer_request | null;
  visibility: string | null;
}

export interface cancelChannelTransferMutation_cancel_channel_transfer {
  __typename: "CancelChannelTransferPayload";
  channel: cancelChannelTransferMutation_cancel_channel_transfer_channel | null;
}

export interface cancelChannelTransferMutation {
  cancel_channel_transfer: cancelChannelTransferMutation_cancel_channel_transfer | null;
}

export interface cancelChannelTransferMutationVariables {
  channel_id: string;
}
