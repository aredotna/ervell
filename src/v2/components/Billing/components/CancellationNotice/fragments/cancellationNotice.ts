import gql from 'graphql-tag'

export default gql`
  fragment CancellationNotice on Customer {
    is_canceled
    current_period_end_at(format: "%D")
  }
`
