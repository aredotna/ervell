/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MyGroupLinks
// ====================================================

export interface MyGroupLinks_groups {
  __typename: "Group";
  id: number;
  name: string;
  href: string | null;
  visibility: string;
  initials: string;
  avatar: string | null;
}

export interface MyGroupLinks {
  __typename: "Me";
  id: number;
  is_my_groups_dropdown_hidden: boolean | null;
  groups: MyGroupLinks_groups[];
}
