import gql from 'graphql-tag';

export default gql`
  query UserDropdown {
    me {
      id
      name
      href
      is_premium
    }
  }
`;
