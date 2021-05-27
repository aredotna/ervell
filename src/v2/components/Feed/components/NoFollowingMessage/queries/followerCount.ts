import { gql } from '@apollo/client'

import FollowerCountCheck from 'v2/components/Feed/components/NoFollowingMessage/fragments/followerCount'

export default gql`
  query FollowerCountCheckQuery {
    me {
      ...FollowerCountCheck
    }
  }
  ${FollowerCountCheck}
`
