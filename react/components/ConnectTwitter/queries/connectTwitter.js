import gql from 'graphql-tag';

import connectTwitterFragment from 'react/components/ConnectTwitter/fragments/connectTwitter';

export default gql`
  query ConnectTwitterQuery($per: Int, $page: Int) {
    me {
      __typename
      ...ConnectTwitter
    }
  }
  ${connectTwitterFragment}
`;
