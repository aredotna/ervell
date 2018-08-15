import gql from 'graphql-tag';

import contactFragment from 'react/components/ConnectTwitter/components/Contact/fragments/index';

export default gql`
  fragment ConnectTwitter on Me {
    authenticated_service {
      contacts(per: $per, page: $page) {
        ...Contact
      }
    }
  }
  ${contactFragment}
`;
