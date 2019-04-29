import gql from 'graphql-tag'

export default gql`
  mutation ReadAllNotificationsMutation {
    clear_notifications(input: { confirm: true }) {
      me {
        id
      }
    }
  }
`
