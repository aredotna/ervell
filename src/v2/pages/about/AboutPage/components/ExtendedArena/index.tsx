import React from 'react'
import styled from 'styled-components'
import sharify from 'sharify'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'

const {
  data: { ITUNES_LINK, ANDROID_LINK },
} = sharify

const Screenshots = styled(Box).attrs({
  display: 'flex',
  flexDirection: 'row',
  mx: 'auto',
  my: 7,
  textAlign: 'center',
  alignItems: 'center',
  justifyContent: 'space-around',
})``

const Screenshot = styled.img`
  width: 250px;
`

const AppStoreLinks = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: flex-start;
`

const AppLink = styled.a.attrs({
  target: '_blank',
})`
  margin-right: ${({ theme }) => theme.space[6]};
`

const AppLinkImage = styled.img``

export const ExtendedArena: React.FC = () => {
  return (
    <Box>
      <Text f={5}>Mobile Apps</Text>
      <Screenshots>
        <Screenshot src="https://d2w9rnfcy7mm78.cloudfront.net/12759271/original_b13ce5fd6da98c7a47b27564e8d80bd7.png?1628198116?bc=0" />
        <Screenshot src="https://d2w9rnfcy7mm78.cloudfront.net/12759260/original_6053cafdbe96c250a57e37238f153a7a.png?1628198024?bc=0" />
      </Screenshots>
      <AppStoreLinks>
        <AppLink href={ITUNES_LINK}>
          <AppLinkImage src="https://d2w9rnfcy7mm78.cloudfront.net/12759322/original_525c5301c9d9594e11602fc123e24ec4.png?1628198364?bc=0" />
        </AppLink>
        <AppLink href={ANDROID_LINK}>
          <AppLinkImage src="https://d2w9rnfcy7mm78.cloudfront.net/12759321/original_b283f41430b521e8d3edeeb8ed81b9a1.png?1628198364?bc=0" />
        </AppLink>
      </AppStoreLinks>
    </Box>
  )
}
