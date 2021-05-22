import { gql } from '@apollo/client'

import newChannelGroupsFragment from 'v2/components/NewChannelForm/components/NewChannelGroups/fragments/newChannelGroups'

export default gql`
  query NewChannelQuery {
    me {
      ...NewChannelGroups
    }
  }
  ${newChannelGroupsFragment}
`
