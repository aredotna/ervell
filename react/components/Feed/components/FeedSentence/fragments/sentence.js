import gql from 'graphql-tag';

import feedObjectFragment from 'react/components/Feed/components/FeedItem/fragments/object';

export default gql`
  fragment FeedSentence on Deed {
    __typename
    id: key
    key
    length
    user {
      __typename
      id
      label: name
      href
    }
    verb
    object {
      ...FeedObject
    }
    object_phrase(truncate: 60)
    connector
    target {
      ...FeedObject
    }
    target_phrase
    created_at(relative: true)
  }
  ${feedObjectFragment}
`;
