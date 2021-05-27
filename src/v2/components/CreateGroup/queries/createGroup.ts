import { gql } from '@apollo/client'

import createGroupFragment from 'v2/components/CreateGroup/fragments/createGroup'

export default gql`
  query CreateGroup {
    me {
      ...CreateGroup
    }
  }
  ${createGroupFragment}
`
