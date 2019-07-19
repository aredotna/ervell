import gql from 'graphql-tag'

import feedGroupObjectFragment from 'v2/components/FeedGroups/components/FeedGroupObjects/fragments/object'

export default gql`
  fragment FeedGroupObjects on DeedGroup {
    objects {
      ...Object
    }
  }
  ${feedGroupObjectFragment}
`
