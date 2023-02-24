/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SupportedPlanEnum } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: SubscribeToPremiumForUsers
// ====================================================

export interface SubscribeToPremiumForUsers_subscribe_to_premium_for_users_me_customer_default_payment_method {
  __typename: "PaymentMethod";
  id: string | null;
}

export interface SubscribeToPremiumForUsers_subscribe_to_premium_for_users_me_customer_payment_methods_card {
  __typename: "CreditCard";
  id: string | null;
  brand: string | null;
  last4: string | null;
  exp_year: string | null;
  exp_month: string | null;
}

export interface SubscribeToPremiumForUsers_subscribe_to_premium_for_users_me_customer_payment_methods {
  __typename: "PaymentMethod";
  id: string | null;
  card: SubscribeToPremiumForUsers_subscribe_to_premium_for_users_me_customer_payment_methods_card | null;
}

export interface SubscribeToPremiumForUsers_subscribe_to_premium_for_users_me_customer {
  __typename: "Customer";
  id: number;
  default_payment_method: SubscribeToPremiumForUsers_subscribe_to_premium_for_users_me_customer_default_payment_method | null;
  payment_methods: SubscribeToPremiumForUsers_subscribe_to_premium_for_users_me_customer_payment_methods[] | null;
}

export interface SubscribeToPremiumForUsers_subscribe_to_premium_for_users_me {
  __typename: "Me";
  id: number;
  customer: SubscribeToPremiumForUsers_subscribe_to_premium_for_users_me_customer | null;
}

export interface SubscribeToPremiumForUsers_subscribe_to_premium_for_users {
  __typename: "SubscribeToPremiumForUsersMutationPayload";
  me: SubscribeToPremiumForUsers_subscribe_to_premium_for_users_me;
}

export interface SubscribeToPremiumForUsers {
  subscribe_to_premium_for_users: SubscribeToPremiumForUsers_subscribe_to_premium_for_users | null;
}

export interface SubscribeToPremiumForUsersVariables {
  group_id: string;
  user_ids: (string | null)[];
  token: string;
  plan_id: SupportedPlanEnum;
  coupon_code?: string | null;
}
