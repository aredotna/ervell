/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SerializeMeQuery
// ====================================================

export interface SerializeMeQuery_serializedMe {
  __typename: "ClientSerializedMe";
  id: string | null;
  name: string | null;
  initials: string | null;
  avatar: string | null;
  authentication_token: string | null;
  is_premium: boolean | null;
}

export interface SerializeMeQuery {
  serializedMe: SerializeMeQuery_serializedMe | null;
}
