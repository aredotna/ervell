import gql from 'graphql-tag';

import EmptyFeedCheckFragment from 'react/pages/feed/EmptyConnectTwitter/fragments/index';

export default gql`
  query EmptyFeedConnectTwitterQuery {
    me {
      ...EmptyFeedCheck
    }
  }
  ${EmptyFeedCheckFragment}
`;
