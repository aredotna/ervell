import gql from 'graphql-tag';

import emptyFeedConnectTwitterFragment from 'react/pages/feed/components/EmptyConnectTwitter/fragments/emptyFeedConnectTwitter';

export default gql`
  query EmptyFeedConnectTwitterQuery {
    me {
      ...EmptyFeedConnectTwitter
    }
  }
  ${emptyFeedConnectTwitterFragment}
`;
