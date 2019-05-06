import React from 'react'
import styled from 'styled-components'
import { themeGet } from 'styled-system'

import Box from 'v2/components/UI/Box'

const Container = styled(Box).attrs(({ p, borderColor, borderRadius }) => ({
  border: '1px solid',
  borderColor: borderColor,
  borderRadius: borderRadius,
  p: p,
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
  bg?: string
  borderColor?: string
  p?: number
  mb?: number
}

export const Meter: React.FC<MeterProps> = ({
  startColor,
  endColor,
  amount,
  limit,
  borderRadius = '0.5em',
  bg = 'gray.light',
  borderColor = 'gray.regular',
  p = 4,
  mb = 0,
  ...rest
}) => {
  return (
    <Container
      borderRadius={borderRadius}
      bg={bg}
      borderColor={borderColor}
      p={p}
      mb={mb}
      {...rest}
    >
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

export default Meter
