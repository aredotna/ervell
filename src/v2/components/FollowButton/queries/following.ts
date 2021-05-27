import { gql } from '@apollo/client'

import followableFragment from 'v2/components/FollowButton/fragments/followable'

export default gql`
  query FollowQuery($id: ID!, $type: FollowableTypeEnum) {
    followable(id: $id, type: $type) {
      ...Followable
    }
  }
  ${followableFragment}
`
