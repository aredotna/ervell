import gql from 'graphql-tag';

import konnectableCellFragment from 'react/components/Cell/components/Konnectable/fragments/konnectableCell';
import blokkChannelFragment from 'react/components/Cell/components/Konnectable/components/Channel/fragments/channel';
import profileEmptyMessageFragment from 'react/components/ProfileEmptyMessage/fragments/profileEmptyMessage';

export default gql`
  fragment ProfileChannels on Identifiable {
    ... ProfileEmptyMessage
    ... on Group {
      __typename
      id: slug
      channels(page: $page, per: $per) {
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
      id: slug
      name
      counts {
        channels
      }
      channels: kontents(type: CHANNEL, page: $page, per: $per, sort_by: $sort, q: $q) {
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
  ${profileEmptyMessageFragment}
`;
