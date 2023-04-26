/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: rejectChannelTransferMutation
// ====================================================

export interface rejectChannelTransferMutation_reject_channel_transfer_channel {
  __typename: "Channel";
  id: number;
  title: string;
  href: string;
}

export interface rejectChannelTransferMutation_reject_channel_transfer {
  __typename: "RejectChannelTransferMutationPayload";
  channel: rejectChannelTransferMutation_reject_channel_transfer_channel;
}

export interface rejectChannelTransferMutation {
  reject_channel_transfer: rejectChannelTransferMutation_reject_channel_transfer | null;
}

export interface rejectChannelTransferMutationVariables {
  token: string;
}
