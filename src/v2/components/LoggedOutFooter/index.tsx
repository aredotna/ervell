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

const Title = styled(Text).attrs({ f: 4, mb: 6, color: 'gray.light' })``

const A = styled(Link)`
  display: block;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.gray.light} !important;
`

export const LoggedOutFooter: React.FC = () => {
  return (
    <Container>
      <Section>
        <Icons name="ArenaMark" mb={6} size="1.5em" color="gray.light" />
        <Text>
          <A href="/about">About</A>
          <A href="https://www.are.na/share/bEAsbbB">Press Kit</A>
          <A href="http://store.are.na">Store</A>
          <A href="/privacy">Privacy policy</A>
          <A href="/terms">Terms of use</A>
          <A href="/community-guidelines">Guidelines</A>
          <A href="http://help.are.na/help_center">Help / FAQs</A>

          <A href="/blog">Blog</A>
          <A href="/education">Education</A>
          <A href="/experiments">Experiments</A>
          <A href="/roadmap">Roadmap</A>

          <A href={ITUNES_LINK}>Download iOS App</A>
          <A href={ANDROID_LINK}>Download Android App</A>

          <A href="mailto:info@are.na">Email</A>
          <A href="https://twitter.com/aredotna">Twitter</A>
          <A href="https://instagram.com/aredotna">Instagram</A>
        </Text>
      </Section>
    </Container>
  )
}
