/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: NewChannelGroups
// ====================================================

export interface NewChannelGroups_groups {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
  href: string | null;
  initials: string;
  avatar: string | null;
}

export interface NewChannelGroups {
  __typename: "Me";
  id: number;
  name: string;
  href: string | null;
  initials: string;
  avatar: string | null;
  groups: NewChannelGroups_groups[];
}
