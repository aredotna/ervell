import { gql } from '@apollo/client'

export default gql`
  fragment FullBlockText on Text {
    __typename
    id
    content(format: HTML)
    raw: content(format: MARKDOWN)
    can {
      manage
    }
  }
`
