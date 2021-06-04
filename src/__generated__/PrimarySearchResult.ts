/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PrimarySearchResult
// ====================================================

export interface PrimarySearchResult_User {
  __typename: "User";
  id: number | null;
  label: string | null;
  href: string | null;
}

export interface PrimarySearchResult_Group {
  __typename: "Group";
  id: number | null;
  label: string | null;
  href: string | null;
  visibility: string | null;
}

export interface PrimarySearchResult_Channel_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface PrimarySearchResult_Channel_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  visibility: string | null;
}

export type PrimarySearchResult_Channel_owner = PrimarySearchResult_Channel_owner_User | PrimarySearchResult_Channel_owner_Group;

export interface PrimarySearchResult_Channel {
  __typename: "Channel";
  id: number | null;
  label: string | null;
  href: string | null;
  visibility: string | null;
  owner: PrimarySearchResult_Channel_owner | null;
}

export type PrimarySearchResult = PrimarySearchResult_User | PrimarySearchResult_Group | PrimarySearchResult_Channel;
