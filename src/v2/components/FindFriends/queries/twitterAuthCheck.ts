import { gql } from '@apollo/client'

import TwitterAuthCheck from 'v2/components/FindFriends/fragments/twitterAuthCheck'

export default gql`
  query TwitterAuthCheckQuery {
    me {
      ...TwitterAuthCheck
    }
  }
  ${TwitterAuthCheck}
`
