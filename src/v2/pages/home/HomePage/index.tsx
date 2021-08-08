import React from 'react'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import BlankLayout from 'v2/components/UI/Layouts/BlankLayout'
// import { DesireLine } from './components/DesireLine'
import FeatureCarouselWithSlides from 'v2/components/FeatureSlides'
import { IntroParagraph } from './components/IntroParagraph'
import { TopLogin } from 'v2/components/TopLogin'
import { LoggedOutFooter } from 'v2/components/LoggedOutFooter'
import { TheSecret } from './components/TheSecret'
import { LongTermVision } from 'v2/pages/home/components/LongTermVision'
import { P } from '../components/Common'

const Container = styled(Box).attrs({
  p: 7,
  px: 7,
})``

const TeamAndSecretContainer = styled(Container).attrs({
  maxWidth: '700px',
})``

const HomePage: React.FC = () => {
  return (
    <BlankLayout>
      <Container>
        <TopLogin />
        {/* <DesireLine /> */}
        <Box my={6} pt={9}>
          <IntroParagraph />
        </Box>
      </Container>

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

        <Box my={7}>
          <TheSecret />
        </Box>
      </TeamAndSecretContainer>
      <LoggedOutFooter isHomepage />
    </BlankLayout>
  )
}

export default HomePage
