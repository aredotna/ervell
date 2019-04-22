import gql from 'graphql-tag';

import konnectableCellFragment from 'react/components/Cell/components/Konnectable/fragments/konnectableCell';
import blokkChannelFragment from 'react/components/Cell/components/Konnectable/components/Channel/fragments/channel';

export default gql`
  fragment ProfileChannels on Identifiable {
    ... on Group {
      __typename
      id
      name
      channels(page: $page, per: $per) {
        ... Channel
        blokks(per: 5, direction: DESC) {
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
      channels(page: $page, per: $per) {
        ... Channel

        blokks(per: 5, sort_by: POSITION, direction: DESC) {
          ... KonnectableCell
        }
      }
    }
  }
  ${konnectableCellFragment}
  ${blokkChannelFragment}
`;
