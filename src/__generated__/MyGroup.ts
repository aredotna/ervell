/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MyGroup
// ====================================================

export interface MyGroup_group_subscription_plan {
  __typename: "Plan";
  id: string;
  term: string | null;
}

export interface MyGroup_group_subscription_users {
  __typename: "User";
  id: number;
  name: string;
}

export interface MyGroup_group_subscription {
  __typename: "PremiumSubscription";
  id: string;
  plan: MyGroup_group_subscription_plan | null;
  users: MyGroup_group_subscription_users[] | null;
}

export interface MyGroup_group_user_can {
  __typename: "UserCan";
  cancel_premium: boolean;
}

export interface MyGroup_group_user {
  __typename: "User";
  id: number;
  name: string;
  hidden_email: string;
  is_premium: boolean;
  is_canceled: boolean;
  can: MyGroup_group_user_can;
  href: string;
  initials: string;
  avatar: string | null;
}

export interface MyGroup_group_users_can {
  __typename: "UserCan";
  cancel_premium: boolean;
}

export interface MyGroup_group_users {
  __typename: "User";
  id: number;
  name: string;
  hidden_email: string;
  is_premium: boolean;
  is_canceled: boolean;
  can: MyGroup_group_users_can;
  href: string;
  initials: string;
  avatar: string | null;
  is_upgradeable: boolean;
  is_approaching_either_connections_limit: boolean;
  is_exceeding_either_connections_limit: boolean;
}

export interface MyGroup_group_owner {
  __typename: "User";
  id: number;
  name: string;
  hidden_email: string;
  is_premium: boolean;
  href: string;
  initials: string;
  avatar: string | null;
}

export interface MyGroup_group {
  __typename: "Group";
  id: number;
  /**
   * Is *every* user in the group Premium?
   */
  is_premium: boolean;
  /**
   * Are *any* users in the group upgradeable to Premium?
   */
  is_upgradeable: boolean;
  subscription: MyGroup_group_subscription | null;
  name: string;
  href: string;
  initials: string;
  avatar: string | null;
  user: MyGroup_group_user;
  users: MyGroup_group_users[];
  owner: MyGroup_group_owner;
}

export interface MyGroup {
  group: MyGroup_group | null;
}

export interface MyGroupVariables {
  id: string;
}
