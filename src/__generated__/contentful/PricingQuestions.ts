/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PricingQuestions
// ====================================================

export interface PricingQuestions_pricingQuestionsCollection_items {
  __typename: "PricingQuestions";
  question: string | null;
  answer: string | null;
}

export interface PricingQuestions_pricingQuestionsCollection {
  __typename: "PricingQuestionsCollection";
  items: (PricingQuestions_pricingQuestionsCollection_items | null)[];
}

export interface PricingQuestions {
  pricingQuestionsCollection: PricingQuestions_pricingQuestionsCollection | null;
}
