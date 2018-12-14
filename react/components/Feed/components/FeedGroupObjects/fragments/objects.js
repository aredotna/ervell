import gql from 'graphql-tag';

import feedGroupObjectFragment from 'react/components/Feed/components/FeedGroupObjects/fragments/object';

export default gql`
  fragment FeedGroupObjects on DeedGroup {
    objects {
      ...Object
    }
  }
  ${feedGroupObjectFragment}
`;
