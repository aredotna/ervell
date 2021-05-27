import { gql } from '@apollo/client'

export default gql`
  query GroupInvite($id: ID!) {
    group(id: $id) {
      __typename
      id
      invite {
        code
      }
    }
  }
`
