import { gql } from '@apollo/client'

export const CustomerCountQuery = gql`
  query CustomerCount {
    roadmap(id: "XIpMMSAIWz0OlWhW7GEUy") {
      sys {
        id
      }
      statsRawCustomers
    }
  }
`
