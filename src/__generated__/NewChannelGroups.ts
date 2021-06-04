/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: NewChannelGroups
// ====================================================

export interface NewChannelGroups_groups {
  __typename: "Group";
  id: number | null;
  name: string | null;
  visibility: string | null;
  href: string | null;
  initials: string | null;
  avatar: string | null;
}

export interface NewChannelGroups {
  __typename: "Me";
  id: number | null;
  name: string | null;
  href: string | null;
  initials: string | null;
  avatar: string | null;
  groups: (NewChannelGroups_groups | null)[] | null;
}
