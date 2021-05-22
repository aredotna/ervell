import React, { Component } from 'react'
import { withApollo } from '@apollo/client/react/hoc'

import isLoggedInQuery from 'v2/hocs/WithLoginStatus/queries/isLoggedIn'

const withLoginStatus = WrappedComponent => {
  class WithLoginStatus extends Component {
    render() {
      const { client, ...rest } = this.props

      let cache

      try {
        cache = client.readQuery({
          query: isLoggedInQuery,
        })
      } catch {
        return false
      }

      if (!cache) {
        return false
      }

      const { loginStatus } = cache
      const isLoggedIn = loginStatus && loginStatus.isLoggedIn

      return <WrappedComponent isLoggedIn={isLoggedIn} {...rest} />
    }
  }

  return withApollo(WithLoginStatus)
}

export default withLoginStatus
