/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MyGroupLinks
// ====================================================

export interface MyGroupLinks_groups {
  __typename: "Group";
  id: number | null;
  name: string | null;
  href: string | null;
  visibility: string | null;
  initials: string | null;
  avatar: string | null;
}

export interface MyGroupLinks {
  __typename: "Me";
  id: number | null;
  is_my_groups_dropdown_hidden: boolean | null;
  groups: (MyGroupLinks_groups | null)[] | null;
}
