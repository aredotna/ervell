import gql from 'graphql-tag'

export default gql`
  mutation updateCustomBadge($avatar_url: String!) {
    update_account(input: { avatar_url: $avatar_url }) {
      me {
        __typename
        id
        avatar(size: LARGE)
      }
    }
  }
`
