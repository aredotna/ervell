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
  id: number | null;
  name: string | null;
  href: string | null;
  visibility: string | null;
  initials: string | null;
  avatar: string | null;
}

export interface ToggleMyGroupsDropdownVisibility_set_me_flags_me {
  __typename: "Me";
  id: number | null;
  is_my_groups_dropdown_hidden: boolean | null;
  groups: (ToggleMyGroupsDropdownVisibility_set_me_flags_me_groups | null)[] | null;
}

export interface ToggleMyGroupsDropdownVisibility_set_me_flags {
  __typename: "SetMeFlagsPayload";
  me: ToggleMyGroupsDropdownVisibility_set_me_flags_me | null;
}

export interface ToggleMyGroupsDropdownVisibility {
  set_me_flags: ToggleMyGroupsDropdownVisibility_set_me_flags | null;
}

export interface ToggleMyGroupsDropdownVisibilityVariables {
  flags: (MeFlagInput | null)[];
}
