import gql from 'graphql-tag';

import feedObjectFragment from 'react/components/Feed/components/FeedGroupSentence/fragments/object';

export default gql`
  fragment FeedGroupSentence on DeedGroup {
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
    owner {
      __typename
      ... on User {
        id
        label: name
        href
      }
      ... on Group {
        id
        label: name
        href
      }
    }
    action
    item {
      ...FeedObject
    }
    item_phrase(truncate: 100)
    connector
    target {
      ...FeedObject
    }
    target_phrase
    created_at(relative: true)
  }
  ${feedObjectFragment}
`;
