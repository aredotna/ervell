import gql from 'graphql-tag';

import myGroupLinksFragment from 'react/components/UserDropdown/components/MyGroupLinks/fragments/myGroupLinks';

export default gql`
  query UserDropdown {
    me {
      id
      name
      href
      is_premium
      is_confirmed
      created_at(format: "%Y-%m-%dT%H:%M:%S.%L%z")
      ...MyGroupLinks
    }
  }
  ${myGroupLinksFragment}
`;
