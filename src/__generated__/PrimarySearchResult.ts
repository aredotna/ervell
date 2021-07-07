/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PrimarySearchResult
// ====================================================

export interface PrimarySearchResult_User {
  __typename: "User";
  id: number;
  label: string;
  href: string | null;
}

export interface PrimarySearchResult_Group {
  __typename: "Group";
  id: number;
  label: string;
  href: string | null;
  visibility: string;
}

export interface PrimarySearchResult_Channel_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export interface PrimarySearchResult_Channel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export type PrimarySearchResult_Channel_owner = PrimarySearchResult_Channel_owner_User | PrimarySearchResult_Channel_owner_Group;

export interface PrimarySearchResult_Channel {
  __typename: "Channel";
  id: number;
  label: string;
  href: string | null;
  visibility: string;
  owner: PrimarySearchResult_Channel_owner;
}

export type PrimarySearchResult = PrimarySearchResult_User | PrimarySearchResult_Group | PrimarySearchResult_Channel;
