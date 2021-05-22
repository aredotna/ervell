/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TransferChannelSearchResultsQuery
// ====================================================

export interface TransferChannelSearchResultsQuery_results_members_User {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
  hidden_email: string | null;
  initials: string | null;
  avatar: string | null;
}

export interface TransferChannelSearchResultsQuery_results_members_Group_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface TransferChannelSearchResultsQuery_results_members_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  user: TransferChannelSearchResultsQuery_results_members_Group_user | null;
  href: string | null;
  initials: string | null;
  avatar: string | null;
}

export type TransferChannelSearchResultsQuery_results_members = TransferChannelSearchResultsQuery_results_members_User | TransferChannelSearchResultsQuery_results_members_Group;

export interface TransferChannelSearchResultsQuery_results {
  __typename: "Searches";
  members: (TransferChannelSearchResultsQuery_results_members | null)[] | null;
}

export interface TransferChannelSearchResultsQuery {
  results: TransferChannelSearchResultsQuery_results | null;
}

export interface TransferChannelSearchResultsQueryVariables {
  query: string;
}
