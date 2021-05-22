/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QuickSearch
// ====================================================

export interface QuickSearch_searches_results_User {
  __typename: "User";
  id: number | null;
  label: string | null;
  href: string | null;
}

export interface QuickSearch_searches_results_Group {
  __typename: "Group";
  id: number | null;
  label: string | null;
  href: string | null;
  visibility: string | null;
}

export interface QuickSearch_searches_results_Channel_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface QuickSearch_searches_results_Channel_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  visibility: string | null;
}

export type QuickSearch_searches_results_Channel_owner = QuickSearch_searches_results_Channel_owner_User | QuickSearch_searches_results_Channel_owner_Group;

export interface QuickSearch_searches_results_Channel {
  __typename: "Channel";
  id: number | null;
  label: string | null;
  href: string | null;
  visibility: string | null;
  owner: QuickSearch_searches_results_Channel_owner | null;
}

export type QuickSearch_searches_results = QuickSearch_searches_results_User | QuickSearch_searches_results_Group | QuickSearch_searches_results_Channel;

export interface QuickSearch_searches {
  __typename: "Searches";
  results: (QuickSearch_searches_results | null)[] | null;
}

export interface QuickSearch {
  searches: QuickSearch_searches | null;
}

export interface QuickSearchVariables {
  query: string;
}
