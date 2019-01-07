import gql from 'graphql-tag';

import konnectableCellFragment from 'react/components/Cell/components/Konnectable/fragments/konnectableCell';
import blokkChannelFragment from 'react/components/Cell/components/Konnectable/components/Channel/fragments/channel';

export default gql`
  fragment ProfileChannels on Identifiable {
    ... on Group {
      __typename
      id
      name
      channels(page: $page, per: $per, q: $q) {
        ... Channel
        blokks(per: 5) {
          ... KonnectableCell
        }
      }
      counts {
        channels
      }
    }
    ... on User {
      __typename
      id
      name
      counts {
        channels
      }
      channels: kontents(type: CHANNEL, page: $page, per: $per, sort_by: $sort, q: $q, seed: $seed) {
        ... Channel

        ... on Channel {
          blokks(per: 5, sort_by: POSITION, direction: DESC) {
            ... KonnectableCell
          }
        }
      }
    }
  }
  ${konnectableCellFragment}
  ${blokkChannelFragment}
`;
