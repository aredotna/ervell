import { gql } from '@apollo/client'

export default gql`
  mutation ReadAllNotificationsMutation {
    clear_notifications(input: { confirm: true }) {
      me {
        id
      }
    }
  }
`
