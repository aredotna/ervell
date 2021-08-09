import React from 'react'
import styled from 'styled-components'
import sharify from 'sharify'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import Button from 'v2/components/UI/GenericButton'
import Icons from 'v2/components/UI/Icons'

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
  width: 200px;
`

const AppStoreLinks = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: flex-start;
`

export const ExtendedArena: React.FC = () => {
  return (
    <Box>
      <Text f={5}>Mobile Apps</Text>
      <Screenshots>
        <Screenshot src="https://d2w9rnfcy7mm78.cloudfront.net/12759271/original_b13ce5fd6da98c7a47b27564e8d80bd7.png?1628198116?bc=0" />
        <Screenshot src="https://d2w9rnfcy7mm78.cloudfront.net/12759260/original_6053cafdbe96c250a57e37238f153a7a.png?1628198024?bc=0" />
      </Screenshots>
      <AppStoreLinks>
        <Button
          f={3}
          color="gray.block"
          href={ITUNES_LINK}
          style={{ width: '120px' }}
          mr={6}
          px={0}
        >
          <Icons name="Ios" size="1em" color="gray.block" mr={3} />
          iOS
        </Button>
        <Button
          f={3}
          color="gray.block"
          href={ANDROID_LINK}
          style={{ width: '120px' }}
          px={0}
        >
          <Icons name="Android" size="1em" color="gray.block" mr={3} />
          Android
        </Button>
      </AppStoreLinks>

      <Text f={5} mt={8} mb={6}>
        Browser Extensions
      </Text>
      <Box textAlign="center" display="flex" justifyContent="space-between">
        <Button
          f={3}
          mr={6}
          px={9}
          color="gray.block"
          href="https://chrome.google.com/webstore/detail/arena/lkihjlcipnbgeokmfnpogjfflofbfhga?hl=en-US"
        >
          Chrome
        </Button>

        <Button
          f={3}
          mr={6}
          px={9}
          color="gray.block"
          href="https://apps.apple.com/us/app/are-na-for-safari/id1497800947?mt=12"
        >
          Safari
        </Button>

        <Button
          f={3}
          mr={6}
          px={9}
          color="gray.block"
          href="https://addons.mozilla.org/en-US/firefox/addon/are-na/"
        >
          Firefox
        </Button>
      </Box>
    </Box>
  )
}
