/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Term, Where, What, Fields, Order } from "./globalTypes";

// ====================================================
// GraphQL query operation: AdvancedQuickSearchTotal
// ====================================================

export interface AdvancedQuickSearchTotal_searches_advanced {
  __typename: "AdvancedResult";
  total: number;
}

export interface AdvancedQuickSearchTotal_searches {
  __typename: "Searches";
  advanced: AdvancedQuickSearchTotal_searches_advanced;
}

export interface AdvancedQuickSearchTotal {
  searches: AdvancedQuickSearchTotal_searches | null;
}

export interface AdvancedQuickSearchTotalVariables {
  term?: Term | null;
  where?: Where | null;
  what?: What | null;
  fields?: Fields | null;
  order?: Order | null;
  page?: number | null;
  per?: number | null;
}
