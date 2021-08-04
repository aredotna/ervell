import { gql } from '@apollo/client'

export const PricingFeaturesQuery = gql`
  query PricingFeatures {
    planFeaturesCollection(order: sys_firstPublishedAt_ASC) {
      items {
        feature
      }
    }
  }
`
