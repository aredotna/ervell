import React from 'react'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import Button from 'v2/components/UI/GenericButton'
import { P } from 'v2/pages/home/components/Common'
import constants from 'v2/styles/constants'
import { FONT_SIZES } from 'v2/styles/text'
import { calculatedAgePhrase } from 'v2/util/calculateAge'

const Container = styled(Box).attrs({ pb: 7 })`
  display: flex;
  max-width: 1500px;
  flex-direction: row;
  margin: 0 auto;

  ${constants.media.small`
    flex-direction: column;
  `}

  ${constants.media.large`
    margin: 0;
  `}
`

const IntroBox = styled(Box).attrs({
  minWidth: ['auto', '520px'],
  flex: 1,
})``

const ButtonBox = styled(Box).attrs({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
})``

export const IntroParagraph: React.FC = () => {
  return (
    <Container>
      <IntroBox pr={8}>
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
      </IntroBox>

      <IntroBox flex={1} mt={[8, 0]}>
        <P>
          Students, hobbyists and what we call connected knowledge collectors
          have been the core of our community for {calculatedAgePhrase()}.
        </P>
        <P>
          People describe Are.na as a garden of ideas, or Tumblr meets
          Wikipedia. If this speaks to you, try it now:
        </P>

        <Box display="flex" mt={4} justifyContent="space-between">
          <ButtonBox pr={4}>
            <Button
              f={[3, FONT_SIZES.home.lg]}
              borderWidth={'1px'}
              flex={1}
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
          </ButtonBox>

          <ButtonBox pl={4}>
            <Button
              color="gray.block"
              f={[3, FONT_SIZES.home.lg]}
              flex={1}
              href="/sign_up"
            >
              Free
            </Button>
            <P mt={5}>
              <ul>
                <li>limited to 100 total blocks</li>
              </ul>
            </P>
          </ButtonBox>
        </Box>
      </IntroBox>
    </Container>
  )
}
