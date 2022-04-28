/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { NewsletterListEnum } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: subscribeToNewsletter
// ====================================================

export interface subscribeToNewsletter_subscribe_to_newsletter {
  __typename: "SubscribeToNewsletterMutationPayload";
  status: string;
}

export interface subscribeToNewsletter {
  subscribe_to_newsletter: subscribeToNewsletter_subscribe_to_newsletter | null;
}

export interface subscribeToNewsletterVariables {
  email: string;
  list?: NewsletterListEnum | null;
}
