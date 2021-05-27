import React, { Component } from 'react'
import { propType } from 'v2/util/inlinedGraphqlAnywhere'

import totalBlocksMeterFragment from 'v2/components/TotalBlocksMeter/fragments/totalBlocksMeter'

import Meter from 'v2/components/UI/Meter'
import Box from 'v2/components/UI/Box'

export default class TotalBlocksMeter extends Component {
  static propTypes = {
    me: propType(totalBlocksMeterFragment).isRequired,
  }

  render() {
    const {
      me: { non_premium_connections_limit, counts },
      ...rest
    } = this.props

    const amount = Math.min(counts.connections, non_premium_connections_limit)

    return (
      <Box {...rest}>
        <Meter
          startColor="gray.light"
          endColor="gray.light"
          bg="background"
          amount={amount}
          limit={non_premium_connections_limit}
        >
          <strong>
            {amount} out of {non_premium_connections_limit}
          </strong>{' '}
          total blocks used
        </Meter>
      </Box>
    )
  }
}
