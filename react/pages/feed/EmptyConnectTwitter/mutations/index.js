import gql from 'graphql-tag';

export default gql`
  mutation updateFlagMutation($name: MeFlagsEnum!, $value: Boolean!) {
    update_flag(input: { name: $name, value: $value }) {
      flags {
        has_seen_feed_connect_twitter
      }
    }
  }
`;
