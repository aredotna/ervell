import React from 'react'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
// import Text from 'v2/components/UI/Text'
import { DesireLine } from './components/DesireLine'
import FeatureCarouselWithSlides from './components/FeatureSlides'
import { IntroParagraph } from './components/IntroParagraph'
import { TopLogin } from './components/TopLogin'

const Container = styled(Box).attrs({
  p: 5,
})``

const HomePage: React.FC = () => {
  return (
    <Container>
      <TopLogin />
      <DesireLine />
      <IntroParagraph />
      <Box mt={7}>
        <FeatureCarouselWithSlides />
      </Box>
    </Container>
  )
}

export default HomePage
