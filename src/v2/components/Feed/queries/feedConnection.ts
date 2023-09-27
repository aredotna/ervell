import { gql } from '@apollo/client'

import feedGroupFragment from 'v2/components/FeedGroups/fragments/group'

export default gql`
  query FeedConnectionQuery($start: String, $limit: Int, $type: FeedType) {
    me {
      id
      __typename
      feed: feed_connection(limit: $limit, type: $type, start: $start) {
        page_info {
          next_cursor
          has_next_page
        }

        groups {
          ...FeedGroup
        }
      }
    }
  }
  ${feedGroupFragment}
`
