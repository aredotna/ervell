/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MutableTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: MuteQuery
// ====================================================

export interface MuteQuery_mutable_Channel {
  __typename: "Channel";
  id: number | null;
  is_muted: boolean | null;
}

export interface MuteQuery_mutable_Connectable {
  __typename: "Connectable";
  id: number | null;
  is_muted: boolean | null;
}

export type MuteQuery_mutable = MuteQuery_mutable_Channel | MuteQuery_mutable_Connectable;

export interface MuteQuery {
  /**
   * Interface for getting the mute status of blocks or channels
   */
  mutable: MuteQuery_mutable | null;
}

export interface MuteQueryVariables {
  id: string;
  type: MutableTypeEnum;
}
