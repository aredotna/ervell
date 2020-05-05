import gql from 'graphql-tag'

export default gql`
  query SerializeMeQueryHook {
    serializedMe @client {
      __typename
      id
      name
      initials
      avatar
      authentication_token
      slug
      is_premium
      hide_notification_count
    }
  }
`
