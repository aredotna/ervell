import { gql } from '@apollo/client'

export default gql`
  mutation acceptGroupInvite($code: String!) {
    __typename
    accept_group_invite(input: { code: $code }) {
      group {
        id
        href
      }
    }
  }
`
