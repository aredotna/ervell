import gql from 'graphql-tag';

import feedGroupSentenceFragment from 'react/components/Feed/components/FeedGroupSentence/fragments/sentence';
import feedGroupItemsFragment from 'react/components/Feed/components/FeedGroupItems/fragments/items';

export default gql`
  fragment FeedGroup on DeedGroup {
    __typename
    ...FeedGroupSentence
    ...FeedGroupItems
  }
  ${feedGroupSentenceFragment}
  ${feedGroupItemsFragment}
`;
