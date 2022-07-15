/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: AdvancedQuickSearchResult
// ====================================================

export interface AdvancedQuickSearchResult_Attachment {
  __typename: "Attachment" | "Embed" | "Image" | "Link" | "PendingBlock" | "Text";
}

export interface AdvancedQuickSearchResult_User {
  __typename: "User";
  id: number;
  label: string;
  href: string | null;
}

export interface AdvancedQuickSearchResult_Group {
  __typename: "Group";
  id: number;
  label: string;
  href: string | null;
  visibility: string;
}

export interface AdvancedQuickSearchResult_Channel_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export interface AdvancedQuickSearchResult_Channel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export type AdvancedQuickSearchResult_Channel_owner = AdvancedQuickSearchResult_Channel_owner_User | AdvancedQuickSearchResult_Channel_owner_Group;

export interface AdvancedQuickSearchResult_Channel {
  __typename: "Channel";
  id: number;
  label: string;
  href: string | null;
  visibility: string;
  owner: AdvancedQuickSearchResult_Channel_owner;
}

export type AdvancedQuickSearchResult = AdvancedQuickSearchResult_Attachment | AdvancedQuickSearchResult_User | AdvancedQuickSearchResult_Group | AdvancedQuickSearchResult_Channel;
