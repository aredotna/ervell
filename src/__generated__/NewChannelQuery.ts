/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: NewChannelQuery
// ====================================================

export interface NewChannelQuery_me_groups {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
  href: string | null;
  initials: string;
  avatar: string | null;
}

export interface NewChannelQuery_me {
  __typename: "Me";
  id: number;
  name: string;
  href: string | null;
  initials: string;
  avatar: string | null;
  groups: NewChannelQuery_me_groups[];
}

export interface NewChannelQuery {
  /**
   * The current logged in user
   */
  me: NewChannelQuery_me | null;
}
