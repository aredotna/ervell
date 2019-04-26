import gql from 'graphql-tag'

export default gql`
  fragment BlockLightboxComment on Comment {
    __typename
    id
    body(format: HTML)
    created_at(relative: true)
    user {
      __typename
      id
      name
      href
    }
    can {
      destroy
    }
  }
`
