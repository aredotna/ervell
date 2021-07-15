/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MyGroup
// ====================================================

export interface MyGroup_subscription_plan {
  __typename: "Plan";
  id: string;
  term: string | null;
}

export interface MyGroup_subscription_users {
  __typename: "User";
  id: number;
  name: string;
}

export interface MyGroup_subscription {
  __typename: "PremiumSubscription";
  id: string;
  plan: MyGroup_subscription_plan | null;
  users: MyGroup_subscription_users[] | null;
}

export interface MyGroup_user_can {
  __typename: "UserCan";
  cancel_premium: boolean | null;
}

export interface MyGroup_user {
  __typename: "User";
  id: number;
  name: string;
  hidden_email: string;
  is_premium: boolean;
  is_canceled: boolean;
  can: MyGroup_user_can | null;
  href: string | null;
  initials: string;
  avatar: string | null;
}

export interface MyGroup_users_can {
  __typename: "UserCan";
  cancel_premium: boolean | null;
}

export interface MyGroup_users {
  __typename: "User";
  id: number;
  name: string;
  hidden_email: string;
  is_premium: boolean;
  is_canceled: boolean;
  can: MyGroup_users_can | null;
  href: string | null;
  initials: string;
  avatar: string | null;
  is_upgradeable: boolean;
  is_approaching_either_connections_limit: boolean;
  is_exceeding_either_connections_limit: boolean;
}

export interface MyGroup_owner {
  __typename: "User";
  id: number;
  name: string;
  hidden_email: string;
  is_premium: boolean;
  href: string | null;
  initials: string;
  avatar: string | null;
}

export interface MyGroup {
  __typename: "Group";
  id: number;
  /**
   * Is *every* user in the group Premium?
   */
  is_premium: boolean | null;
  /**
   * Are *any* users in the group upgradeable to Premium?
   */
  is_upgradeable: boolean | null;
  subscription: MyGroup_subscription | null;
  name: string;
  href: string | null;
  initials: string;
  avatar: string | null;
  user: MyGroup_user;
  users: MyGroup_users[] | null;
  owner: MyGroup_owner;
}
