import gql from 'graphql-tag'

export default gql`
  query IsOutsideMainRouterQueryHook {
    sharify @client {
      isOutsideMainRouter: IS_OUTSIDE_MAIN_ROUTER
    }
  }
`
