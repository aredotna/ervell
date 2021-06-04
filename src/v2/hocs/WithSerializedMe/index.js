import React, { Component } from 'react'
import { withApollo } from '@apollo/client/react/hoc'

import serializedMeQuery from 'v2/hocs/WithSerializedMe/queries/serializedMe'

const withSerializedMe = WrappedComponent => {
  class WithSerializedMe extends Component {
    render() {
      const { client, ...rest } = this.props
      const { serializedMe } = client.readQuery({
        query: serializedMeQuery,
      })

      return <WrappedComponent serializedMe={serializedMe} {...rest} />
    }
  }

  return withApollo(WithSerializedMe)
}

export default withSerializedMe
