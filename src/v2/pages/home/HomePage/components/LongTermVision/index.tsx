import React from 'react'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import constants from 'v2/styles/constants'
import { P } from '../Common'

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
  mb: 8,
})`
  display: flex;
  justify-content: space-between;
`

const Team = styled(Box)`
  transform-origin: bottom right;
  transform: rotate(-90deg) translateY(1.25em) translateX(5.5em);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const Member = styled(Text).attrs({
  f: 4,
  color: 'gray.block',
  lineHeight: 1.5,
})`
  &:after {
    padding-left: 0.25em;
    content: '●';
  }
`

export const LongTermVision: React.FC = () => {
  return (
    <Box width="50%" py={10} mb={10}>
      <P mb={6}>Long-term vision</P>

      <P>
        Are.na has many co-founders. Currently, a small team is building the
        platform:
      </P>

      <Chart>
        <Top>
          <TopLabel>Full-time</TopLabel>
          <TopLabel>Part-time</TopLabel>
          <TopLabel>Advisors</TopLabel>
        </Top>
        <TeamContainer>
          <Team>
            <Member>Engineer</Member>
            <Member>Product</Member>
          </Team>

          <Team ml={5}>
            <Member>Community</Member>
            <Member>Engineer</Member>
            <Member>Engineer</Member>
          </Team>

          <Team mr={7}>
            <Member>Community</Member>
            <Member>Community</Member>
            <Member>Product</Member>
            <Member>Engineer</Member>
          </Team>
        </TeamContainer>

        <P>
          The company that builds Are.na is independent and sustained entirely
          by our members.
        </P>
        <P>
          Our business is to make Are.na a good enough experience that you are
          willing to pay for it. Currently <strong>7,050 people</strong> support
          Are.na through their Premium subscriptions.
        </P>
      </Chart>
    </Box>
  )
}
