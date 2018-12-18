import gql from 'graphql-tag';


export default gql`
  fragment GroupsCount on Me {
    __typename
    id
    counts {
      groups
    }
  }
`;
