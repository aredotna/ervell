import React from 'react'
import styled from 'styled-components'

import constants from 'v2/styles/constants'
import Box from 'v2/components/UI/Box'
import BlankLayout from 'v2/components/UI/Layouts/BlankLayout'
// import { DesireLine } from './components/DesireLine'
import Icons from 'v2/components/UI/Icons'

import FeatureCarouselWithSlides from 'v2/components/FeatureSlides'
import { IntroParagraph } from './components/IntroParagraph'
import { TopLogin } from 'v2/components/TopLogin'
import { LoggedOutFooter } from 'v2/components/LoggedOutFooter'
import { TheSecret } from './components/TheSecret'
import { LongTermVision } from 'v2/pages/home/components/LongTermVision'
import { P } from '../components/Common'

const Container = styled(Box)`
  padding: 50px;

  ${constants.media.large`
    padding: 3vw;
  `}
`

const TopContainer = styled(Container).attrs({
  pt: 10,
})``

const IconContainer = styled(Box)`
  padding: 50px;

  ${constants.media.large`
    padding: 3vw;
  `}
`

const TeamAndSecretContainer = styled(Container).attrs({
  maxWidth: '700px',
})``

const HomePage: React.FC = () => {
  return (
    <BlankLayout>
      <IconContainer>
        <Icons name="ArenaMark" size="1.5em" color="gray.block" />
      </IconContainer>

      <TopContainer>
        <TopLogin />
        {/* <DesireLine /> */}
        <Box mt={3} mb={6}>
          <IntroParagraph />
        </Box>
      </TopContainer>

      <Box my={7}>
        <P f={4} pl={7}>
          How it works
        </P>
        <FeatureCarouselWithSlides />
      </Box>

      <TeamAndSecretContainer>
        <Box py={10} mb={10}>
          <LongTermVision />
        </Box>

        <Box my={7} pb={9}>
          <TheSecret />
        </Box>
      </TeamAndSecretContainer>

      <Container>
        <P boldLinks>
          <a href="/sign_up">Try Are.na</a>...or learn more in the links below.
        </P>
      </Container>
      <LoggedOutFooter isHomepage />
    </BlankLayout>
  )
}

export default HomePage
