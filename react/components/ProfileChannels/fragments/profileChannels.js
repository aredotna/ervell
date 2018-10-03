import gql from 'graphql-tag';

import blokkFragment from 'react/components/Blokk/fragments/blokk';
import blokkChannelFragment from 'react/components/Blokk/components/Channel/fragments/channel';

export default gql`
  fragment ProfileChannels on Identifiable {
    ... on Group {
      __typename
      id: slug
      channels(page: $page, per: $per) {
        ... Channel
        blokks(per: 5) {
          ... Blokk
        }
      }
    }
    ... on User {
      __typename
      id: slug
      channels: kontents(type: CHANNEL, page: $page, per: $per) {
        ... Channel

        ... on Channel {
          blokks(per: 5, sort_by: POSITION, direction: DESC) {
            ... Blokk
          }
        }
      }
    }
  }
  ${blokkFragment}
  ${blokkChannelFragment}
`;
