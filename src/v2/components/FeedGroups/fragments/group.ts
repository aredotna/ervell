import { gql } from '@apollo/client'

import feedGroupSentenceFragment from 'v2/components/FeedGroups/components/FeedGroupSentence/fragments/sentence'
import feedGroupObjectsFragment from 'v2/components/FeedGroups/components/FeedGroupObjects/fragments/objects'

export default gql`
  fragment FeedGroup on DeedGroup {
    __typename
    ...FeedGroupSentence
    ...FeedGroupObjects
  }
  ${feedGroupSentenceFragment}
  ${feedGroupObjectsFragment}
`
