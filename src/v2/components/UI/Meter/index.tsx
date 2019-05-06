import React from 'react'
import styled from 'styled-components'
import { themeGet } from 'styled-system'

import Box from 'v2/components/UI/Box'

const Container = styled(Box).attrs(({ p, borderColor, borderRadius }) => ({
  border: '1px solid',
  borderColor: borderColor || 'gray.regular',
  borderRadius: borderRadius,
  p: p || 4,
}))`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`

const MeterProgress = styled(Box).attrs(({ borderRadius }) => ({
  borderRadius: borderRadius,
}))`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: ${props => `${(props.amount / props.limit) * 100.0}%`};
  ${props => `
    background: linear-gradient(to right, ${themeGet(
      `colors.${props.startColor}`
    )(props)}, ${themeGet(`colors.${props.endColor}`)(props)});
  `}
`

interface MeterProps {
  startColor: string
  endColor: string
  amount: number
  limit: number
  borderRadius?: string
}

export const Meter: React.FC<MeterProps> = ({
  startColor,
  endColor,
  borderRadius,
  amount,
  limit,
  ...rest
}) => {
  return (
    <Container borderRadius={borderRadius} {...rest}>
      <MeterProgress
        startColor={startColor}
        endColor={endColor}
        borderRadius={borderRadius}
        amount={amount}
        limit={limit}
      />
    </Container>
  )
}

Meter.defaultProps = {
  borderRadius: '0.5em',
}

export default Meter
