import { gql } from '@apollo/client'

export default gql`
  mutation DeleteGroupInvite($group_id: ID!) {
    __typename
    delete_group_invite(input: { group_id: $group_id }) {
      group {
        id
        href
        invite {
          code
        }
      }
    }
  }
`
