import { gql } from '@apollo/client'

import followableFragment from 'v2/components/FollowButton/fragments/followable'

export default gql`
  mutation FollowMutation($id: ID!, $type: FollowableTypeEnum!) {
    __typename
    follow(input: { id: $id, type: $type }) {
      __typename
      followable {
        ...Followable
      }
    }
  }
  ${followableFragment}
`
