/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Term, Where, What, Fields, ExtensionsEnum, Order, WhatEnum, WhereEnum, FieldsEnum, SortOrderEnum } from "./globalTypes";

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

export interface AdvancedQuickSearch_searches_advanced_results_User {
  __typename: "User";
  id: number;
  label: string;
  href: string;
}

export interface AdvancedQuickSearch_searches_advanced_results_Group {
  __typename: "Group";
  id: number;
  label: string;
  href: string;
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

export interface AdvancedQuickSearch_searches_advanced_results_Channel_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface AdvancedQuickSearch_searches_advanced_results_Channel {
  __typename: "Channel";
  id: number;
  label: string;
  href: string;
  visibility: string;
  owner: AdvancedQuickSearch_searches_advanced_results_Channel_owner;
  title: string;
  user: AdvancedQuickSearch_searches_advanced_results_Channel_user;
}

export interface AdvancedQuickSearch_searches_advanced_results_Attachment_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface AdvancedQuickSearch_searches_advanced_results_Attachment {
  __typename: "Attachment";
  id: number;
  title: string;
  href: string;
  user: AdvancedQuickSearch_searches_advanced_results_Attachment_user;
  src: string | null;
}

export interface AdvancedQuickSearch_searches_advanced_results_PendingBlock_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface AdvancedQuickSearch_searches_advanced_results_PendingBlock {
  __typename: "PendingBlock";
  id: number;
  title: string;
  href: string;
  user: AdvancedQuickSearch_searches_advanced_results_PendingBlock_user;
}

export interface AdvancedQuickSearch_searches_advanced_results_Embed_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface AdvancedQuickSearch_searches_advanced_results_Embed {
  __typename: "Embed";
  id: number;
  title: string;
  href: string;
  user: AdvancedQuickSearch_searches_advanced_results_Embed_user;
  src: string | null;
}

export interface AdvancedQuickSearch_searches_advanced_results_Image_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface AdvancedQuickSearch_searches_advanced_results_Image {
  __typename: "Image";
  id: number;
  title: string;
  href: string;
  user: AdvancedQuickSearch_searches_advanced_results_Image_user;
  src: string | null;
}

export interface AdvancedQuickSearch_searches_advanced_results_Link_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface AdvancedQuickSearch_searches_advanced_results_Link {
  __typename: "Link";
  id: number;
  title: string;
  href: string;
  user: AdvancedQuickSearch_searches_advanced_results_Link_user;
  src: string | null;
}

export interface AdvancedQuickSearch_searches_advanced_results_Text_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface AdvancedQuickSearch_searches_advanced_results_Text {
  __typename: "Text";
  id: number;
  title: string;
  href: string;
  user: AdvancedQuickSearch_searches_advanced_results_Text_user;
  content: string;
}

export type AdvancedQuickSearch_searches_advanced_results = AdvancedQuickSearch_searches_advanced_results_User | AdvancedQuickSearch_searches_advanced_results_Group | AdvancedQuickSearch_searches_advanced_results_Channel | AdvancedQuickSearch_searches_advanced_results_Attachment | AdvancedQuickSearch_searches_advanced_results_PendingBlock | AdvancedQuickSearch_searches_advanced_results_Embed | AdvancedQuickSearch_searches_advanced_results_Image | AdvancedQuickSearch_searches_advanced_results_Link | AdvancedQuickSearch_searches_advanced_results_Text;

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
  where?: Where[] | null;
  what?: What | null;
  fields?: Fields | null;
  extensions?: ExtensionsEnum[] | null;
  order?: Order | null;
  page?: number | null;
  per?: number | null;
  before?: string | null;
  after?: string | null;
}
