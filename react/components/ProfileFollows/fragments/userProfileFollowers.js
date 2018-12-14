import gql from 'graphql-tag';

import identifiableCellFragment from 'react/components/Cell/components/Identifiable/fragments/identifiableCell';
import konnectableCellFragment from 'react/components/Cell/components/Konnectable/fragments/konnectableCell';

export default gql`
  fragment UserProfileFollowers on User {
    __typename
    id
    followers(page: $page, per: $per) {
      ... IdentifiableCell
      ... KonnectableCell
    }
  }
  ${identifiableCellFragment}
  ${konnectableCellFragment}
`;
