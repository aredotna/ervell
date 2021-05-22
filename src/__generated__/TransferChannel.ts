/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TransferChannel
// ====================================================

export interface TransferChannel_can {
  __typename: "ChannelCan";
  transfer: boolean | null;
}

export interface TransferChannel_transfer_request_recipient_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface TransferChannel_transfer_request_recipient_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
}

export type TransferChannel_transfer_request_recipient = TransferChannel_transfer_request_recipient_User | TransferChannel_transfer_request_recipient_Group;

export interface TransferChannel_transfer_request {
  __typename: "ChannelTransferRequest";
  recipient: TransferChannel_transfer_request_recipient | null;
  is_recipient_member: boolean | null;
}

export interface TransferChannel {
  __typename: "Channel";
  id: number | null;
  can: TransferChannel_can | null;
  is_pending_transfer: boolean | null;
  transfer_request: TransferChannel_transfer_request | null;
  visibility: string | null;
}
