import { gql } from '@apollo/client'

import profileAvatarFragment from 'v2/components/ProfileMetadata/components/ProfileAvatar/fragments/profileAvatar'

export default gql`
  query ProfileAvatar($id: ID!) {
    group(id: $id) {
      ...ProfileAvatar
    }
  }
  ${profileAvatarFragment}
`
