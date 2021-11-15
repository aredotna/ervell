import { gql } from '@apollo/client'

export default gql`
  query GetFirstChannel {
    me {
      channels(per: 1, sort_by: CREATED_AT, direction: ASC) {
        href
      }
    }
  }
`
