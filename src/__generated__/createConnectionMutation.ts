/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BaseConnectableTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createConnectionMutation
// ====================================================

export interface createConnectionMutation_create_connection_konnectable_Attachment {
  __typename: "Attachment" | "Embed" | "Image" | "Link" | "PendingBlock" | "Text";
}

export interface createConnectionMutation_create_connection_konnectable_Channel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface createConnectionMutation_create_connection_konnectable_Channel_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type createConnectionMutation_create_connection_konnectable_Channel_owner = createConnectionMutation_create_connection_konnectable_Channel_owner_Group | createConnectionMutation_create_connection_konnectable_Channel_owner_User;

export interface createConnectionMutation_create_connection_konnectable_Channel {
  __typename: "Channel";
  id: number;
  title: string;
  visibility: string;
  owner: createConnectionMutation_create_connection_konnectable_Channel_owner;
}

export type createConnectionMutation_create_connection_konnectable = createConnectionMutation_create_connection_konnectable_Attachment | createConnectionMutation_create_connection_konnectable_Channel;

export interface createConnectionMutation_create_connection {
  __typename: "CreateConnectionMutationPayload";
  konnectable: createConnectionMutation_create_connection_konnectable;
}

export interface createConnectionMutation {
  create_connection: createConnectionMutation_create_connection | null;
}

export interface createConnectionMutationVariables {
  channel_ids: (string | null)[];
  connectable_id: string;
  connectable_type: BaseConnectableTypeEnum;
}
