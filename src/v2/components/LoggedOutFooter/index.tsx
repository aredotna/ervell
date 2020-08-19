import React from 'react'
import styled from 'styled-components'
import sharify from 'sharify'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import Link from 'v2/components/UI/Link'

const {
  data: { ITUNES_LINK, ANDROID_LINK },
} = sharify

const Container = styled(Box).attrs({ py: 8, px: 8, my: 8 })`
  border-top: 1px solid ${({ theme }) => theme.colors.gray.light};
  display: flex;
`

const Section = styled(Box).attrs({ mr: 8 })`
  flex: 1;
`

const Title = styled(Text).attrs({ f: 4, mb: 6 })``

const A = styled(Link)`
  font-weight: bold;
  display: block;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.gray.base} !important;
`

export const LoggedOutFooter: React.FC = () => {
  return (
    <Container>
      <Section>
        <Title>Contact</Title>
        <A href="mailto:info@are.na">Email</A>
        <A href="https://twitter.com/aredotna">Twitter</A>
        <A href="https://instagram.com/aredotna">Instagram</A>
      </Section>
      <Section>
        <Title>Company</Title>
        <A href="/about">About</A>
        <A href="https://www.are.na/share/bEAsbbB">Press Kit</A>
        <A href="http://store.are.na">Store</A>
        <A href="/privacy">Privacy policy</A>
        <A href="/terms">Terms of use</A>
        <A href="/community-guidelines">Guidelines</A>
        <A href="http://help.are.na/help_center">Help / FAQs</A>
      </Section>
      <Section>
        <Title>Community</Title>
        <A href="/blog">Blog</A>
        <A href="/education">Education</A>
        <A href="/experiments">Experiments</A>
        <A href="/roadmap">Roadmap</A>
      </Section>
      <Section>
        <Title>Mobile</Title>
        <A href={ITUNES_LINK}>Download iOS App</A>
        <A href={ANDROID_LINK}>Download Android App</A>
      </Section>
    </Container>
  )
}
