/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: rejectChannelTransferMutation
// ====================================================

export interface rejectChannelTransferMutation_reject_channel_transfer_channel {
  __typename: "Channel";
  id: number | null;
  title: string | null;
  href: string | null;
}

export interface rejectChannelTransferMutation_reject_channel_transfer {
  __typename: "RejectChannelTransferPayload";
  channel: rejectChannelTransferMutation_reject_channel_transfer_channel | null;
}

export interface rejectChannelTransferMutation {
  reject_channel_transfer: rejectChannelTransferMutation_reject_channel_transfer | null;
}

export interface rejectChannelTransferMutationVariables {
  token: string;
}
