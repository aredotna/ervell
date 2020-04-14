import gql from 'graphql-tag'

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
