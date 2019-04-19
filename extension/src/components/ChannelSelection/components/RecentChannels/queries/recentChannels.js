import gql from 'graphql-tag';

import selectedChannelFragment from 'extension/src/components/Blocks/components/SelectedChannel/fragments/selectedChannel';

export default gql`
  query RecentChannelsQuery {
    me {
      __typename
      id
      recent_channels: recent_connections(per: 10) {
        ...SelectedChannel
      }
    }
  }
  ${selectedChannelFragment}
`;
