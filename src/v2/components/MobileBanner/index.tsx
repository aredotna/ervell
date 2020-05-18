import React, { useState } from 'react'
import styled from 'styled-components'

import FixedWrapper from 'v2/components/UI/FixedWrapper'
import Banner from 'v2/components/UI/Banner'
import { GenericButtonLink } from 'v2/components/UI/GenericButton'

import { isMobile as checkIfMobile } from 'v2/util/isMobile'

const ButtonLink = styled(GenericButtonLink).attrs({
  f: [1, 2, 3],
  ml: 8,
  flex: [1],
})``

interface MobileBannerProps {
  route: 'explore' | 'feed' | 'channel' | 'profile' | 'groupProfile'
  id?: string | number
}

export const MobileBanner: React.FC<MobileBannerProps> = ({ route, id }) => {
  const urlParts = [route, id]
  const url = encodeURIComponent(`arena://${urlParts.join('/')}`)

  return (
    <FixedWrapper bottom>
      <Banner
        bg="background"
        borderTop="3px solid"
        borderColor="gray.light"
        isCloseable
      >
        <ButtonLink href={`/deeplink?url=${url}`}>Switch to the App</ButtonLink>
      </Banner>
    </FixedWrapper>
  )
}

interface MobileOrChildrenProps extends MobileBannerProps {
  children: any
}

export const MobileOrChildren: React.FC<MobileOrChildrenProps> = ({
  children,
  ...rest
}) => {
  const [isMobile] = useState(checkIfMobile())

  if (isMobile) {
    return <MobileBanner {...rest} />
  }

  return children
}
