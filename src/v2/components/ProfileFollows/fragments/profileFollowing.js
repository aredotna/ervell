import gql from 'graphql-tag';

import identifiableCellFragment from 'v2/components/Cell/components/Identifiable/fragments/identifiableCell';
import konnectableCellFragment from 'v2/components/Cell/components/Konnectable/fragments/konnectableCell';

export default gql`
  fragment ProfileFollowing on User {
    __typename
    id
    following(page: $page, per: $per) {
      __typename
      ... IdentifiableCell
      ... KonnectableCell
    }
  }
  ${identifiableCellFragment}
  ${konnectableCellFragment}
`;
