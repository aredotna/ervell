import React from 'react'
import styled from 'styled-components'
import { themeGet } from 'styled-system'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'

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

const MeterProgress = styled(Box)`
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

const Label = styled(Text)`
  position: relative;
  text-align: center;
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
  children,
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
        amount={amount}
        limit={limit}
      />
      <Label>{children}</Label>
    </Container>
  )
}

export default Meter
