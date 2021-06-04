/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BaseConnectableTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createConnectionMutation
// ====================================================

export interface createConnectionMutation_create_connection_konnectable_Text {
  __typename: "Text" | "Image" | "Link" | "Embed" | "Attachment" | "PendingBlock";
}

export interface createConnectionMutation_create_connection_konnectable_Channel_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  visibility: string | null;
}

export interface createConnectionMutation_create_connection_konnectable_Channel_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export type createConnectionMutation_create_connection_konnectable_Channel_owner = createConnectionMutation_create_connection_konnectable_Channel_owner_Group | createConnectionMutation_create_connection_konnectable_Channel_owner_User;

export interface createConnectionMutation_create_connection_konnectable_Channel {
  __typename: "Channel";
  id: number | null;
  title: string | null;
  visibility: string | null;
  owner: createConnectionMutation_create_connection_konnectable_Channel_owner | null;
}

export type createConnectionMutation_create_connection_konnectable = createConnectionMutation_create_connection_konnectable_Text | createConnectionMutation_create_connection_konnectable_Channel;

export interface createConnectionMutation_create_connection {
  __typename: "CreateConnectionPayload";
  konnectable: createConnectionMutation_create_connection_konnectable | null;
}

export interface createConnectionMutation {
  create_connection: createConnectionMutation_create_connection | null;
}

export interface createConnectionMutationVariables {
  channel_ids: (string | null)[];
  connectable_id: string;
  connectable_type: BaseConnectableTypeEnum;
}
