import gql from 'graphql-tag'

import feedGroupFragment from 'v2/components/FeedGroups/fragments/group'

export default gql`
  query GroupFeedQuery($id: ID!, $offset: Int, $limit: Int) {
    group(id: $id) {
      feed(offset: $offset, limit: $limit) {
        groups {
          ...FeedGroup
        }
      }
    }
  }
  ${feedGroupFragment}
`
