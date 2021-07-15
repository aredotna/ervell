/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ConnectableInput, Movements } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: moveConnectableMutation
// ====================================================

export interface moveConnectableMutation_move_connectable_mutation_channel {
  __typename: "Channel";
  id: number;
}

export interface moveConnectableMutation_move_connectable_mutation {
  __typename: "MoveConnectableMutationPayload";
  channel: moveConnectableMutation_move_connectable_mutation_channel;
}

export interface moveConnectableMutation {
  move_connectable_mutation: moveConnectableMutation_move_connectable_mutation | null;
}

export interface moveConnectableMutationVariables {
  channel_id: string;
  connectable: ConnectableInput;
  action?: Movements | null;
  insert_at?: number | null;
}
