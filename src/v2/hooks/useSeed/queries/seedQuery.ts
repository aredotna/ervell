import { gql } from '@apollo/client'

export default gql`
  query UseSeedQuery {
    sharify @client {
      seed: SEED
    }
  }
`
