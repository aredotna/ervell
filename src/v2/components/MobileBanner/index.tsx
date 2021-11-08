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

export const MobileBanner: React.FC = () => {
  if (!window) return null

  const url = encodeURIComponent(window.location.href)

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

interface MobileOrChildrenProps {
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
