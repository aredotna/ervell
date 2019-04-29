import React, { Component } from 'react'
import styled from 'styled-components'
import { propType } from 'graphql-anywhere'

import privateBlocksMeterFragment from 'v2/components/PrivateBlocksMeter/fragments/privateBlocksMeter'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'

const Link = styled.a`
  &:hover {
    color: black;
  }
`

const Meter = styled(Box).attrs({
  border: '1px solid',
  borderColor: 'gray.regular',
  borderRadius: '0.5em',
  p: 6,
})`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`

const MeterProgress = styled(Box).attrs({
  bg: 'gray.light',
})`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: ${props => `${(props.amount / props.limit) * 100.0}%`};
`

const Label = styled(Text)`
  position: relative;
  text-align: center;
`

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
        <Meter>
          <MeterProgress
            amount={amount}
            limit={non_premium_private_connections_limit}
          />

          <Label>
            <strong>
              {amount} out of {non_premium_private_connections_limit}
            </strong>{' '}
            free private blocks used
          </Label>
        </Meter>

        <Text mt={5} f={3} color="state.premium">
          Premium members can upload unlimited private blocks, hide from search
          engines, and get early access to new products and features.
        </Text>

        <Text mt={5} f={2} color="state.premium" fontWeight="bold">
          <Link href="/pricing">Learn more about Premium</Link>
        </Text>
      </Box>
    )
  }
}
