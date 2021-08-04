import React from 'react'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import Button from 'v2/components/UI/GenericButton'
import { P } from 'v2/pages/home/components/Common'
import { calculateAge } from 'v2/util/calculateAge'

const Container = styled(Box).attrs({ pb: 7 })`
  display: flex;
  flex-direction: row;
`

export const IntroParagraph: React.FC = () => {
  const { years, days } = calculateAge()

  return (
    <Container>
      <Box flex={1} pr={8}>
        <P>
          <strong>
            Are.na is a platform for connecting ideas and building knowledge.
          </strong>
        </P>
        <P>
          Are.na is: <br />
          1. online software for saving and organizing the content that is
          important to you <br />
          2. a toolkit for assembling new worlds from the scraps of the old
        </P>
        <P>
          Students, hobbyists and what we call connected knowledge collectors
          have been the core of our community for{' '}
          <strong>
            {years} years and {days} days
          </strong>
          .
        </P>
      </Box>

      <Box flex={1}>
        <P>
          People describe Are.na as a garden of ideas, or Tumblr meets
          Wikipedia. If this speaks to you, try it now:
        </P>

        <Box display="flex" mt={4}>
          <Box pr={4}>
            <Button color="state.premium" f={3} minWidth="160px">
              Premium
            </Button>
            <P mt={5}>
              <ul>
                <li>$5/month or $45/year</li>
                <li>reader mode + table view</li>
                <li>increased pivacy settings</li>
                <li>unlimited blocks</li>
              </ul>
            </P>
          </Box>

          <Box pl={4}>
            <Button color="gray.block" f={3} minWidth="160px">
              Free
            </Button>
            <P mt={5}>
              <ul>
                <li>limited to 100 total blocks</li>
              </ul>
            </P>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}
