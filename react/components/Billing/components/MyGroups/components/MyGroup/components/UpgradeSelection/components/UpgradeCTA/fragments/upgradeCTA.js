import gql from 'graphql-tag';

export default gql`
  fragment UpgradeCTA on Group {
    __typename
    id
    user {
      __typename
      id
      is_premium
    }
    users {
      __typename
      id
      is_premium
    }
  }
`;
