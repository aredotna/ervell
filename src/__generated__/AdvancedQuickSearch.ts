/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Term, Where, What, Fields, Order, WhatEnum, WhereEnum, FieldsEnum, SortOrderEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: AdvancedQuickSearch
// ====================================================

export interface AdvancedQuickSearch_searches_advanced_filters {
  __typename: "AdvancedFilterResult";
  what: WhatEnum[] | null;
  where: WhereEnum[] | null;
  fields: FieldsEnum[] | null;
  order: SortOrderEnum[] | null;
}

export interface AdvancedQuickSearch_searches_advanced_results_Attachment {
  __typename: "Attachment" | "Embed" | "Image" | "Link" | "PendingBlock" | "Text";
}

export interface AdvancedQuickSearch_searches_advanced_results_User {
  __typename: "User";
  id: number;
  label: string;
  href: string | null;
}

export interface AdvancedQuickSearch_searches_advanced_results_Group {
  __typename: "Group";
  id: number;
  label: string;
  href: string | null;
  visibility: string;
}

export interface AdvancedQuickSearch_searches_advanced_results_Channel_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export interface AdvancedQuickSearch_searches_advanced_results_Channel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export type AdvancedQuickSearch_searches_advanced_results_Channel_owner = AdvancedQuickSearch_searches_advanced_results_Channel_owner_User | AdvancedQuickSearch_searches_advanced_results_Channel_owner_Group;

export interface AdvancedQuickSearch_searches_advanced_results_Channel {
  __typename: "Channel";
  id: number;
  label: string;
  href: string | null;
  visibility: string;
  owner: AdvancedQuickSearch_searches_advanced_results_Channel_owner;
}

export type AdvancedQuickSearch_searches_advanced_results = AdvancedQuickSearch_searches_advanced_results_Attachment | AdvancedQuickSearch_searches_advanced_results_User | AdvancedQuickSearch_searches_advanced_results_Group | AdvancedQuickSearch_searches_advanced_results_Channel;

export interface AdvancedQuickSearch_searches_advanced {
  __typename: "AdvancedResult";
  total: number;
  filters: AdvancedQuickSearch_searches_advanced_filters | null;
  results: (AdvancedQuickSearch_searches_advanced_results | null)[] | null;
}

export interface AdvancedQuickSearch_searches {
  __typename: "Searches";
  advanced: AdvancedQuickSearch_searches_advanced;
}

export interface AdvancedQuickSearch {
  searches: AdvancedQuickSearch_searches | null;
}

export interface AdvancedQuickSearchVariables {
  term?: Term | null;
  where?: Where | null;
  what?: What | null;
  fields?: Fields | null;
  order?: Order | null;
  page?: number | null;
  per?: number | null;
}
