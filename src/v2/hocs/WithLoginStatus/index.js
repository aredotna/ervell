import React, { Component } from 'react'
import { withApollo } from 'react-apollo'

import isLoggedInQuery from 'v2/hocs/WithLoginStatus/queries/isLoggedIn'

const withLoginStatus = WrappedComponent => {
  class WithLoginStatus extends Component {
    render() {
      const { client, ...rest } = this.props
      const { loginStatus } = client.readQuery({
        query: isLoggedInQuery,
      })

      const isLoggedIn = loginStatus && loginStatus.isLoggedIn

      return <WrappedComponent isLoggedIn={isLoggedIn} {...rest} />
    }
  }

  return withApollo(WithLoginStatus)
}

export default withLoginStatus
