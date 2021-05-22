/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SerializeMeQueryHook
// ====================================================

export interface SerializeMeQueryHook_serializedMe {
  __typename: "ClientSerializedMe";
  id: string | null;
  name: string | null;
  initials: string | null;
  avatar: string | null;
  authentication_token: string | null;
  slug: string | null;
  is_premium: boolean | null;
  is_lifetime_premium: boolean | null;
  is_supporter: boolean | null;
  hide_notification_count: boolean | null;
}

export interface SerializeMeQueryHook {
  serializedMe: SerializeMeQueryHook_serializedMe | null;
}
