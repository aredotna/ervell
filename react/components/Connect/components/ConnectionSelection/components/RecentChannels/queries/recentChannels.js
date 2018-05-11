import gql from 'graphql-tag';

import selectableChannelFragment from 'react/components/Connect/components/ConnectionSelection/components/SelectableChannel/fragments/selectableChannel';

export default gql`
  query RecentChannelsQuery {
    me {
      __typename
      id
      recent_channels: recent_connections(per: 5) {
        ...SelectableChannel
      }
    }
  }
  ${selectableChannelFragment}
`;
