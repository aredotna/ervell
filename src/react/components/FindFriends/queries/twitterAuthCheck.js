import gql from 'graphql-tag';

import TwitterAuthCheck from 'react/components/FindFriends/fragments/twitterAuthCheck';

export default gql`
  query TwitterAuthCheckQuery {
    me {
      ...TwitterAuthCheck
    }
  }
  ${TwitterAuthCheck}
`;
