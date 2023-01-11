import { gql } from '@apollo/client'

export const PremiumPlansQuery = gql`
  query PremiumPlans {
    plans {
      id
      amount
    }
  }
`
