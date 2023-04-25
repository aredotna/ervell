/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MeFlagInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: ToggleMyGroupsDropdownVisibility
// ====================================================

export interface ToggleMyGroupsDropdownVisibility_set_me_flags_me_groups {
  __typename: "Group";
  id: number;
  name: string;
  href: string;
  visibility: string;
  initials: string;
  avatar: string | null;
}

export interface ToggleMyGroupsDropdownVisibility_set_me_flags_me {
  __typename: "Me";
  id: number;
  is_my_groups_dropdown_hidden: boolean;
  groups: ToggleMyGroupsDropdownVisibility_set_me_flags_me_groups[];
}

export interface ToggleMyGroupsDropdownVisibility_set_me_flags {
  __typename: "SetMeFlagsMutationPayload";
  me: ToggleMyGroupsDropdownVisibility_set_me_flags_me;
}

export interface ToggleMyGroupsDropdownVisibility {
  set_me_flags: ToggleMyGroupsDropdownVisibility_set_me_flags | null;
}

export interface ToggleMyGroupsDropdownVisibilityVariables {
  flags: (MeFlagInput | null)[];
}
