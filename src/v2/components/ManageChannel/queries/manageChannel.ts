import { gql } from '@apollo/client'

import manageChannelFragment from 'v2/components/ManageChannel/fragments/manageChannel'
import groupsCountFragment from 'v2/components/ManageChannel/fragments/groupsCount'

export default gql`
  query ManageChannelQuery($id: ID!) {
    channel(id: $id) {
      ...ManageChannel
    }
    me {
      ...GroupsCount
    }
  }
  ${manageChannelFragment}
  ${groupsCountFragment}
`
