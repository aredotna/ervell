/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Term, Where, What, Fields, Order, WhatEnum, WhereEnum, FieldsEnum, SortOrder } from "./globalTypes";

// ====================================================
// GraphQL query operation: AdvancedSearch
// ====================================================

export interface AdvancedSearch_searches_advanced_filters {
  __typename: "AdvancedFilterResult";
  what: WhatEnum[] | null;
  where: WhereEnum[] | null;
  fields: FieldsEnum[] | null;
  order: SortOrder[] | null;
}

export interface AdvancedSearch_searches_advanced {
  __typename: "AdvancedResult";
  total: number;
  filters: AdvancedSearch_searches_advanced_filters | null;
}

export interface AdvancedSearch_searches {
  __typename: "Searches";
  advanced: AdvancedSearch_searches_advanced;
}

export interface AdvancedSearch {
  searches: AdvancedSearch_searches | null;
}

export interface AdvancedSearchVariables {
  term?: Term | null;
  where?: Where | null;
  what?: What | null;
  fields?: Fields | null;
  order?: Order | null;
  page?: number | null;
  per?: number | null;
}
