/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PricingQuestionsQuery
// ====================================================

export interface PricingQuestionsQuery_pricingQuestionsCollection_items {
  __typename: "PricingQuestions";
  question: string | null;
  answer: string | null;
}

export interface PricingQuestionsQuery_pricingQuestionsCollection {
  __typename: "PricingQuestionsCollection";
  items: (PricingQuestionsQuery_pricingQuestionsCollection_items | null)[];
}

export interface PricingQuestionsQuery {
  pricingQuestionsCollection: PricingQuestionsQuery_pricingQuestionsCollection | null;
}
