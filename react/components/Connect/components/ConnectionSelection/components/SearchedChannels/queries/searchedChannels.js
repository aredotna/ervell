import gql from 'graphql-tag';

import selectableChannelFragment from 'react/components/Connect/components/ConnectionSelection/components/SelectableChannel/fragments/selectableChannel';

export default gql`
  query RecentChannelsQuery($query: String!) {
    me {
      __typename
      id
      searched_channels: connection_search(q: $query, per: 5) {
        ...SelectableChannel
      }
    }
  }
  ${selectableChannelFragment}
`;
