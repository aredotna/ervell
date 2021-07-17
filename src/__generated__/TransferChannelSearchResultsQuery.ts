/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TransferChannelSearchResultsQuery
// ====================================================

export interface TransferChannelSearchResultsQuery_results_members_User {
  __typename: "User";
  id: number;
  name: string;
  href: string | null;
  hidden_email: string;
  initials: string;
  avatar: string | null;
}

export interface TransferChannelSearchResultsQuery_results_members_Group_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface TransferChannelSearchResultsQuery_results_members_Group {
  __typename: "Group";
  id: number;
  name: string;
  user: TransferChannelSearchResultsQuery_results_members_Group_user;
  href: string | null;
  initials: string;
  avatar: string | null;
}

export type TransferChannelSearchResultsQuery_results_members = TransferChannelSearchResultsQuery_results_members_User | TransferChannelSearchResultsQuery_results_members_Group;

export interface TransferChannelSearchResultsQuery_results {
  __typename: "Searches";
  members: TransferChannelSearchResultsQuery_results_members[] | null;
}

export interface TransferChannelSearchResultsQuery {
  results: TransferChannelSearchResultsQuery_results | null;
}

export interface TransferChannelSearchResultsQueryVariables {
  query: string;
}
