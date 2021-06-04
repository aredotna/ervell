import { gql } from '@apollo/client'

export const addBlockFragment = gql`
  fragment AddBlock on Channel {
    can {
      add_to
      add_to_as_premium
    }
    visibility
  }
`
