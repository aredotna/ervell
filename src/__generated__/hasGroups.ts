/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: hasGroups
// ====================================================

export interface hasGroups_me_groups {
  __typename: "Group";
  id: number | null;
}

export interface hasGroups_me {
  __typename: "Me";
  groups: (hasGroups_me_groups | null)[] | null;
}

export interface hasGroups {
  /**
   * The current logged in user
   */
  me: hasGroups_me | null;
}
