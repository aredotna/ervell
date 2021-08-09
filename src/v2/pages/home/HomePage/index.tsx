import React from 'react'
import styled from 'styled-components'

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

const Container = styled(Box).attrs({
  p: 7,
  px: 7,
})``

const TopContainer = styled(Container).attrs({
  pt: 4,
})``

const IconContainer = styled(Box).attrs({ py: 6, px: 6 })``

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

        <Box my={7}>
          <TheSecret />
        </Box>
      </TeamAndSecretContainer>
      <LoggedOutFooter isHomepage />
    </BlankLayout>
  )
}

export default HomePage
