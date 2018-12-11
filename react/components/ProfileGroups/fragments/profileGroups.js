import gql from 'graphql-tag';

import identifiableCellFragment from 'react/components/Cell/components/Identifiable/fragments/identifiableCell';

export default gql`
  fragment ProfileGroups on User {
    __typename
    id
    groups(page: $page, per: $per) {
      ... IdentifiableCell
    }
  }
  ${identifiableCellFragment}
`;
