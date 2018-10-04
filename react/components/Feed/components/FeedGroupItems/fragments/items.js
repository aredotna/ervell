import gql from 'graphql-tag';

import feedGroupItemFragment from 'react/components/Feed/components/FeedGroupItems/fragments/item';

export default gql`
  fragment FeedGroupItems on DeedGroup {
    items {
      ...Item
    }
  }
  ${feedGroupItemFragment}
`;
