import gql from 'graphql-tag';

import selectedChannelFragment from 'extension/src/components/SelectableChannel/fragments/selectableChannel';

export default gql`
  query AllChannelsQuery($page: Int) {
    me {
      __typename
      id
      all_channels: channels(per: 100, page: $page, sort_by: TITLE, direction: ASC) {
        ...SelectableChannel
      }
    }
  }
  ${selectedChannelFragment}
`;
