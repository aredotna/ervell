/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Mutable
// ====================================================

export interface Mutable_Channel {
  __typename: "Channel";
  id: number | null;
  is_muted: boolean | null;
}

export interface Mutable_Connectable {
  __typename: "Connectable";
  id: number | null;
  is_muted: boolean | null;
}

export type Mutable = Mutable_Channel | Mutable_Connectable;
