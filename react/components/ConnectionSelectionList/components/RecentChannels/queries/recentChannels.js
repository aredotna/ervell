import gql from 'graphql-tag';

import selectableChannelFragment from 'react/components/ConnectionSelectionList/components/SelectableChannel/fragments/selectableChannel';

export default gql`
  query RecentChannelsQuery {
    me {
      __typename
      id: slug
      recent_channels: recent_connections(per: 5) {
        ...SelectableChannel
      }
    }
  }
  ${selectableChannelFragment}
`;
