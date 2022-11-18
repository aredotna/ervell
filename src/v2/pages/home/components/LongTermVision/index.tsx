import React from 'react'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import constants from 'v2/styles/constants'
import { P } from 'v2/pages/home/components/Common'
import { CustomerCount } from 'v2/components/CustomerCount'

const Chart = styled(Box)`
  border: 1px solid ${props => props.theme.colors.gray.light};
  border-radius: ${constants.radii.subtle};
  width: 100%;
  height: 150px;
`

const Top = styled(Box).attrs({
  p: 3,
  px: 4,
})`
  border-bottom: 1px dashed ${props => props.theme.colors.gray.bold};
  display: flex;
  justify-content: space-between;
`

const TopLabel = styled(Text).attrs({
  f: 3,
  color: 'gray.bold',
})``

const TeamContainer = styled(Box).attrs({
  mb: 9,
  mr: 5,
})`
  display: flex;
  justify-content: space-between;
`

const Team = styled(Box)`
  transform-origin: bottom right;
  transform: rotate(-90deg) translateY(2.25em) translateX(6em);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const Member = styled(Text).attrs({
  f: 3,
  color: 'gray.block',
  lineHeight: 1.5,
})`
  &:after {
    padding-left: 0.25em;
    content: '●';
  }
`

export const TeamChart: React.FC = () => {
  return (
    <Chart>
      <Top>
        <TopLabel>Full-time</TopLabel>
        <TopLabel>Part-time</TopLabel>
        <TopLabel>Advisors</TopLabel>
      </Top>
      <TeamContainer>
        <Team ml={3}>
          <Member>Engineer</Member>
          <Member>Product</Member>
        </Team>

        <Team ml={8}>
          <Member>Community</Member>
          <Member>Strategy</Member>
          <Member>Engineer</Member>
        </Team>

        <Team mr={7}>
          <Member>Community</Member>
          <Member>Strategy</Member>
          <Member>Product</Member>
          <Member>Product</Member>
          <Member>Engineer</Member>
        </Team>
      </TeamContainer>
    </Chart>
  )
}

export const LongTermVision: React.FC = () => {
  return (
    <Box>
      <P mb={6}>Long-term vision</P>

      <P>
        Are.na has many co-founders. Currently, a small team is building the
        platform:
      </P>

      <Box mb={8}>
        <TeamChart />
      </Box>

      <P>
        The company that builds Are.na is independent and sustained entirely by
        our members.
      </P>
      <P>
        Our business is to make Are.na a good enough experience that you are
        willing to pay for it. Currently{' '}
        <strong>
          <CustomerCount />
        </strong>{' '}
        people support Are.na through their Premium subscriptions.
      </P>
    </Box>
  )
}
