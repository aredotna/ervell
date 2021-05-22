import React, { Component } from 'react'
import { withApollo } from '@apollo/client/react/hoc'

import currentRouteQuery from 'v2/hocs/WithCurrentRoute/queries/currentRoute'

const withCurrentRoute = WrappedComponent => {
  class WithCurrentRoute extends Component {
    render() {
      const { client, ...rest } = this.props
      const { currentRoute } = client.readQuery({
        query: currentRouteQuery,
      })

      return <WrappedComponent currentRoute={currentRoute} {...rest} />
    }
  }

  return withApollo(WithCurrentRoute)
}

export default withCurrentRoute
