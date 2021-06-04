/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MyGroup
// ====================================================

export interface MyGroup_subscription_plan {
  __typename: "Plan";
  id: string | null;
  term: string | null;
}

export interface MyGroup_subscription_users {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface MyGroup_subscription {
  __typename: "PremiumSubscription";
  id: string | null;
  plan: MyGroup_subscription_plan | null;
  users: (MyGroup_subscription_users | null)[] | null;
}

export interface MyGroup_user_can {
  __typename: "UserCan";
  cancel_premium: boolean | null;
}

export interface MyGroup_user {
  __typename: "User";
  id: number | null;
  name: string | null;
  hidden_email: string | null;
  is_premium: boolean | null;
  is_canceled: boolean | null;
  can: MyGroup_user_can | null;
  href: string | null;
  initials: string | null;
  avatar: string | null;
}

export interface MyGroup_users_can {
  __typename: "UserCan";
  cancel_premium: boolean | null;
}

export interface MyGroup_users {
  __typename: "User";
  id: number | null;
  name: string | null;
  hidden_email: string | null;
  is_premium: boolean | null;
  is_canceled: boolean | null;
  can: MyGroup_users_can | null;
  href: string | null;
  initials: string | null;
  avatar: string | null;
  is_upgradeable: boolean | null;
  is_approaching_either_connections_limit: boolean | null;
  is_exceeding_either_connections_limit: boolean | null;
}

export interface MyGroup_owner {
  __typename: "User";
  id: number | null;
  name: string | null;
  hidden_email: string | null;
  is_premium: boolean | null;
  href: string | null;
  initials: string | null;
  avatar: string | null;
}

export interface MyGroup {
  __typename: "Group";
  id: number | null;
  /**
   * Is *every* user in the group Premium?
   */
  is_premium: boolean | null;
  /**
   * Are *any* users in the group upgradeable to Premium?
   */
  is_upgradeable: boolean | null;
  subscription: MyGroup_subscription | null;
  name: string | null;
  href: string | null;
  initials: string | null;
  avatar: string | null;
  user: MyGroup_user | null;
  users: (MyGroup_users | null)[] | null;
  owner: MyGroup_owner | null;
}
