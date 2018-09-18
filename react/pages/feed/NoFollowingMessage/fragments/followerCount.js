import gql from 'graphql-tag';

export default gql`
  fragment FollowerCountCheck on Me {
    id
    counts {
      following
    }
  }
`;
