import React from 'react'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import BlankLayout from 'v2/components/UI/Layouts/BlankLayout'
// import { DesireLine } from './components/DesireLine'
import FeatureCarouselWithSlides from './components/FeatureSlides'
import { IntroParagraph } from './components/IntroParagraph'
import { TopLogin } from './components/TopLogin'
import { LoggedOutFooter } from 'v2/components/LoggedOutFooter'
import { TheSecret } from './components/TheSecret'
import { LongTermVision } from 'v2/pages/home/components/LongTermVision'

const Container = styled(Box).attrs({
  p: 7,
  px: 7,
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
        <FeatureCarouselWithSlides />
      </Box>

      <Container>
        <LongTermVision />
        <Box my={7}>
          <TheSecret />
        </Box>
      </Container>
      <LoggedOutFooter isHomepage />
    </BlankLayout>
  )
}

export default HomePage
