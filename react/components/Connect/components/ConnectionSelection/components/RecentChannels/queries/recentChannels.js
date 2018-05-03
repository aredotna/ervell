import gql from 'graphql-tag';

import selectableChannelFragment from 'react/components/Connect/components/ConnectionSelection/components/SelectableChannel/fragments/selectableChannel';

export default gql`
  query RecentChannelsQuery {
    me {
      __typename
      id
      recent_channels: contents(type: CHANNEL, sort_by: UPDATED_AT, per: 5) {
        kind {
          ... on Channel {
            ...SelectableChannel
          }
        }
      }
    }
  }
  ${selectableChannelFragment}
`;
