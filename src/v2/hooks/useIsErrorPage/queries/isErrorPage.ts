import gql from 'graphql-tag'

export default gql`
  query IsErrorPageQueryHook {
    sharify @client {
      isErrorPage: IS_ERROR
    }
  }
`
