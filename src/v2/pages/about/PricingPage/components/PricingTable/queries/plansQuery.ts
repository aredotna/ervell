import { gql } from '@apollo/client'

export const PlansQuery = gql`
  query Plans {
    plans {
      id
      amount
    }
  }
`
