import { gql } from '@apollo/client'

export const PremiumRevenueQuery = gql`
  query PremiumRevenue {
    roadmap(id: "XIpMMSAIWz0OlWhW7GEUy") {
      sys {
        id
      }
      rawMrr
    }
  }
`
