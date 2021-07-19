import React from 'react'
import styled from 'styled-components'
import sharify from 'sharify'

import Box from 'v2/components/UI/Box'
import Icons from 'v2/components/UI/Icons'
import Text from 'v2/components/UI/Text'
import Link from 'v2/components/UI/Link'

import constants from 'v2/styles/constants'

const {
  data: { ITUNES_LINK, ANDROID_LINK },
} = sharify

const Container = styled(Box).attrs({ pt: 8, px: 8, pb: 10, mt: 8 })`
  display: flex;
  background-color: ${({ theme }) => theme.colors.brand.deepBlue};

  ${constants.media.mobile`
    flex-direction: column;
  `}
`

const Section = styled(Box).attrs({ mr: 8 })`
  flex: 1;

  ${constants.media.mobile`
    margin-bottom: ${({ theme }) => theme.space[8]};
  `}
`

const A = styled(Link)`
  display: block;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.gray.light} !important;
`

interface LoggedOutFooterProps {
  isHomepage?: boolean
}

export const LoggedOutFooter: React.FC<LoggedOutFooterProps> = ({
  isHomepage,
}) => {
  return (
    <Container>
      {isHomepage && (
        <Section>
          <Icons name="ArenaMark" mb={6} size="1.5em" color="gray.light" />
          <Text mb={6}>
            <A href="/about">About &amp; Features</A>
            <A href="/pricing">Pricing &amp; Education Plans</A>
            <A href="/roadmap">Roadmap</A>
            <A href="/about">Writing &amp; Events</A>
            <A href="/about">Team</A>
            <A href="/about">Contact &amp; help</A>
          </Text>
          <Text mb={6}>
            <A href={ITUNES_LINK}>Download iOS App</A>
            <A href={ANDROID_LINK}>Download Android App</A>
          </Text>
        </Section>
      )}
    </Container>
  )
}
