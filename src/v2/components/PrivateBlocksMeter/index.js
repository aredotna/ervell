import React, { Component } from 'react'
import { propType } from 'v2/util/inlinedGraphqlAnywhere'

import privateBlocksMeterFragment from 'v2/components/PrivateBlocksMeter/fragments/privateBlocksMeter'

import Box from 'v2/components/UI/Box'
import Meter from 'v2/components/UI/Meter'

export default class PrivateBlocksMeter extends Component {
  static propTypes = {
    me: propType(privateBlocksMeterFragment).isRequired,
  }

  render() {
    const {
      me: { non_premium_private_connections_limit, counts },
      ...rest
    } = this.props

    const amount = Math.min(
      counts.private_connections,
      non_premium_private_connections_limit
    )

    return (
      <Box {...rest}>
        <Meter
          startColor="gray.light"
          endColor="gray.light"
          bg="background"
          amount={amount}
          limit={non_premium_private_connections_limit}
        >
          <strong>
            {amount} out of {non_premium_private_connections_limit}
          </strong>{' '}
          free private blocks used
        </Meter>
      </Box>
    )
  }
}
