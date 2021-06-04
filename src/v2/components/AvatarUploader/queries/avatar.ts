import { gql } from '@apollo/client'

import avatarFragment from 'v2/components/AvatarUploader/fragments/avatar'

export default gql`
  query AvatarCheck {
    me {
      ...Avatar
    }
  }
  ${avatarFragment}
`
