import gql from 'graphql-tag';

import FollowerCountCheck from 'react/components/Feed/components/NoFollowingMessage/fragments/followerCount';

export default gql`
  query FollowerCountCheckQuery {
    me {
      ...FollowerCountCheck
    }
  }
  ${FollowerCountCheck}
`;
