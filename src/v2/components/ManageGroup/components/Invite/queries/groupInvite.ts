import gql from 'graphql-tag'

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
