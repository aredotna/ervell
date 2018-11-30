import gql from 'graphql-tag';

import feedGroupSentenceFragment from 'react/components/Feed/components/FeedGroupSentence/fragments/sentence';
import feedGroupObjectsFragment from 'react/components/Feed/components/FeedGroupObjects/fragments/objects';

export default gql`
  fragment FeedGroup on DeedGroup {
    __typename
    ...FeedGroupSentence
    ...FeedGroupObjects
  }
  ${feedGroupSentenceFragment}
  ${feedGroupObjectsFragment}
`;
