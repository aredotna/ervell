/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: NewChannelGroupsQuery
// ====================================================

export interface NewChannelGroupsQuery_me_groups {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
  href: string;
  initials: string;
  avatar: string | null;
}

export interface NewChannelGroupsQuery_me {
  __typename: "Me";
  id: number;
  name: string;
  href: string;
  initials: string;
  avatar: string | null;
  groups: NewChannelGroupsQuery_me_groups[];
}

export interface NewChannelGroupsQuery {
  /**
   * The current logged in user
   */
  me: NewChannelGroupsQuery_me | null;
}
