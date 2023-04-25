/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MutableTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: ProfileIsMutedQuery
// ====================================================

export interface ProfileIsMutedQuery_mutable_Channel {
  __typename: "Channel";
  id: number;
  is_muted: boolean;
}

export interface ProfileIsMutedQuery_mutable_Connectable {
  __typename: "Connectable";
  id: number;
  is_muted: boolean;
}

export interface ProfileIsMutedQuery_mutable_User {
  __typename: "User";
  id: number;
  is_muted: boolean;
}

export type ProfileIsMutedQuery_mutable = ProfileIsMutedQuery_mutable_Channel | ProfileIsMutedQuery_mutable_Connectable | ProfileIsMutedQuery_mutable_User;

export interface ProfileIsMutedQuery {
  /**
   * Interface for getting the mute status of blocks or channels
   */
  mutable: ProfileIsMutedQuery_mutable | null;
}

export interface ProfileIsMutedQueryVariables {
  id: string;
  type: MutableTypeEnum;
}
