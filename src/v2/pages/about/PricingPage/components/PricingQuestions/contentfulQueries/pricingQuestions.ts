import { gql } from '@apollo/client'

export const PricingQuestionsQuery = gql`
  query PricingQuestions {
    pricingQuestionsCollection(order: sys_firstPublishedAt_ASC) {
      items {
        question
        answer
      }
    }
  }
`
