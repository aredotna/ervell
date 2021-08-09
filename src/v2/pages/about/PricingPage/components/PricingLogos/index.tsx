import React from 'react'
import styled from 'styled-components'

import constants from 'v2/styles/constants'
import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'

const LogoContainer = styled(Box)`
  max-width: auto;

  ${constants.media.mobile`
    display: none;
  `}
`

const Logos = styled.img`
  width: 100%;
  margin: 3em auto 0;
  display: block;
`

export const PricingLogos: React.FC = () => {
  return (
    <LogoContainer mt={9} mb={6} pb={9} maxWidth="100%">
      <Text color="gray.bold" f={4} mb={3}>
        Are.na is used by people and teams at:
      </Text>
      <Logos
        src="https://d2w9rnfcy7mm78.cloudfront.net/9910791/original_29b8e431accf9b5996dbeaf8d6f85721.png"
        alt="brand logos"
      />
    </LogoContainer>
  )
}
