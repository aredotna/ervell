import { gql } from '@apollo/client'

import feedGroupFragment from 'v2/components/FeedGroups/fragments/group'

export default gql`
  query FeedQuery($offset: Int, $limit: Int, $type: String) {
    me {
      id
      __typename
      feed(offset: $offset, limit: $limit, type: $type) {
        groups {
          ...FeedGroup
        }
      }
    }
  }
  ${feedGroupFragment}
`
