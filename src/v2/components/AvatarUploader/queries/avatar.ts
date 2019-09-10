import gql from 'graphql-tag'

import avatarFragment from 'v2/components/AvatarUploader/fragments/avatar'

export default gql`
  query AvatarCheck {
    me {
      ...Avatar
    }
  }
  ${avatarFragment}
`
