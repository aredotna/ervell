import React, { Component } from 'react'
import { withApollo } from '@apollo/client/react/hoc'

import isSpiderRequestingQuery from 'v2/hocs/WithIsSpiderRequesting/queries/isSpiderRequesting'

const withIsSpiderRequesting = WrappedComponent => {
  class WithIsSpiderRequesting extends Component {
    render() {
      const { client, ...rest } = this.props
      const {
        sharify: { isSpiderRequesting },
      } = client.readQuery({
        query: isSpiderRequestingQuery,
      })

      return (
        <WrappedComponent isSpiderRequesting={isSpiderRequesting} {...rest} />
      )
    }
  }

  return withApollo(WithIsSpiderRequesting)
}

export default withIsSpiderRequesting
