import gql from 'graphql-tag'

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
