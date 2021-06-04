import { gql } from '@apollo/client'

export default gql`
  mutation CreateGroupInvite($group_id: ID!) {
    __typename
    create_group_invite(input: { group_id: $group_id }) {
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
