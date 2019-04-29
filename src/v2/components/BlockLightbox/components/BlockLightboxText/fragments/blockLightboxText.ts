import gql from 'graphql-tag'

export default gql`
  fragment BlockLightboxText on Text {
    __typename
    id
    content(format: HTML)
    can {
      manage
    }
  }
`
