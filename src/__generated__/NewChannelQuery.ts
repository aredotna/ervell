/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: NewChannelQuery
// ====================================================

export interface NewChannelQuery_me_groups {
  __typename: "Group";
  id: number | null;
  name: string | null;
  visibility: string | null;
  href: string | null;
  initials: string | null;
  avatar: string | null;
}

export interface NewChannelQuery_me {
  __typename: "Me";
  id: number | null;
  name: string | null;
  href: string | null;
  initials: string | null;
  avatar: string | null;
  groups: (NewChannelQuery_me_groups | null)[] | null;
}

export interface NewChannelQuery {
  /**
   * The current logged in user
   */
  me: NewChannelQuery_me | null;
}
