import gql from 'graphql-tag';

import feedSentenceFragment from 'react/components/Feed/components/FeedSentence/fragments/sentence';

export default gql`
  query FeedQuery($offset: Int, $limit: Int) {
    me {
      id
      __typename
      feed(offset: $offset, limit: $limit) {
        groups {
          ...FeedSentence
        }
      }
    }
  }
  ${feedSentenceFragment}
`;
