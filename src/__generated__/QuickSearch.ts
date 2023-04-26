/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QuickSearch
// ====================================================

export interface QuickSearch_searches_results_User {
  __typename: "User";
  id: number;
  label: string;
  href: string;
}

export interface QuickSearch_searches_results_Group {
  __typename: "Group";
  id: number;
  label: string;
  href: string;
  visibility: string;
}

export interface QuickSearch_searches_results_Channel_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export interface QuickSearch_searches_results_Channel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export type QuickSearch_searches_results_Channel_owner = QuickSearch_searches_results_Channel_owner_User | QuickSearch_searches_results_Channel_owner_Group;

export interface QuickSearch_searches_results_Channel {
  __typename: "Channel";
  id: number;
  label: string;
  href: string;
  visibility: string;
  owner: QuickSearch_searches_results_Channel_owner;
}

export type QuickSearch_searches_results = QuickSearch_searches_results_User | QuickSearch_searches_results_Group | QuickSearch_searches_results_Channel;

export interface QuickSearch_searches {
  __typename: "Searches";
  results: QuickSearch_searches_results[] | null;
}

export interface QuickSearch {
  searches: QuickSearch_searches | null;
}

export interface QuickSearchVariables {
  query: string;
}
