import gql from 'graphql-tag';

export default gql`
  mutation createConnectionMutation($channel_ids: [ID]!, $connectable_id: ID!, $connectable_type: BaseConnectableTypeEnum!) {
    __typename
    create_connection(input: { channel_ids: $channel_ids, connectable_type: $connectable_type, connectable_id: $connectable_id }) {
      __typename
      connectable {
        __typename
        id
        title
      }
    }
  }
`;
