/* tslint:disable */
/* eslint-disable */
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
}

export interface SerializeMeQuery {
  serializedMe: SerializeMeQuery_serializedMe | null;
}
