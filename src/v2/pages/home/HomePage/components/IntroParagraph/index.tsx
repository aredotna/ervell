import React from 'react'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import Button from 'v2/components/UI/GenericButton'
import { P } from 'v2/pages/home/components/Common'
import { FONT_SIZES } from 'v2/styles/text'
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
          <em>
            Are.na is a platform for connecting ideas and building knowledge.
          </em>
        </P>
        <P>
          Are.na is: <br />
          1. online software for saving and organizing the content that is
          important to you <br />
          2. a toolkit for assembling new worlds from the scraps of the old
        </P>
      </Box>

      <Box flex={1}>
        <P>
          Students, hobbyists and what we call connected knowledge collectors
          have been the core of our community for {years} years and {days} days
          .
        </P>
        <P>
          People describe Are.na as a garden of ideas, or Tumblr meets
          Wikipedia. If this speaks to you, try it now:
        </P>

        <Box display="flex" mt={4} justifyContent="space-between">
          <Box pr={4}>
            <Button
              f={FONT_SIZES.home.lg}
              minWidth="160px"
              borderWidth={'1px'}
              px={9}
              href="/sign_up/premium"
            >
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
            <Button
              color="gray.block"
              f={FONT_SIZES.home.lg}
              minWidth="160px"
              px={9}
              href="/sign_up"
            >
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
