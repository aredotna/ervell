import gql from 'graphql-tag';

import konnectableCellFragment from 'react/components/Cell/components/Konnectable/fragments/konnectableCell';
import blokkChannelFragment from 'react/components/Cell/components/Konnectable/components/Channel/fragments/channel';

export default gql`
  fragment ProfileChannels on Identifiable {
    ... on Group {
      __typename
      id: slug
      channels(page: $page, per: $per) {
        ... Channel
        blokks(per: 5) {
          ... KonnectableCell
        }
      }
    }
    ... on User {
      __typename
      id: slug
      channels: kontents(type: CHANNEL, page: $page, per: $per, sort_by: $sort) {
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
