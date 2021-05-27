/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MentionTextareaUserSuggestions
// ====================================================

export interface MentionTextareaUserSuggestions_suggestions_users_User {
  __typename: "User";
  id: string | null;
  label: string | null;
}

export interface MentionTextareaUserSuggestions_suggestions_users_Group {
  __typename: "Group";
  id: string | null;
  label: string | null;
}

export type MentionTextareaUserSuggestions_suggestions_users = MentionTextareaUserSuggestions_suggestions_users_User | MentionTextareaUserSuggestions_suggestions_users_Group;

export interface MentionTextareaUserSuggestions_suggestions {
  __typename: "Searches";
  users: (MentionTextareaUserSuggestions_suggestions_users | null)[] | null;
}

export interface MentionTextareaUserSuggestions {
  suggestions: MentionTextareaUserSuggestions_suggestions | null;
}

export interface MentionTextareaUserSuggestionsVariables {
  query: string;
}
