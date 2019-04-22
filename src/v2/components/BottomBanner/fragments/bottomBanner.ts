import gql from 'graphql-tag';

export default gql`
  fragment BottomBanner on Me {
    __typename
    id
    banner
  }
`;
