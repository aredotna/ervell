import React from 'react'
import styled from 'styled-components'
import sharify from 'sharify'

import Box from 'v2/components/UI/Box'
import Icons from 'v2/components/UI/Icons'
import Text from 'v2/components/UI/Text'
import Link from 'v2/components/UI/Link'
import HorizontalRule from 'v2/components/UI/HorizontalRule'

import constants from 'v2/styles/constants'
import useSerializedMe from 'v2/hooks/useSerializedMe'

const {
  data: { ITUNES_LINK, ANDROID_LINK },
} = sharify

const Container = styled(Box).attrs({ pt: 8, px: 8, pb: 10, mt: 8 })`
  display: flex;
  background-color: ${({ theme }) => theme.colors.brand.deepBlue};
  flex-direction: column;
  vertical-align: top;

  ${constants.media.mobile`
    flex-direction: column;
  `}
`

const TopSection = styled(Box).attrs({ mr: 8, mb: 8 })`
  flex: 1;

  ${constants.media.mobile`
    margin-bottom: ${({ theme }) => theme.space[8]};
  `}
`

const MapSection = styled(Box).attrs({})`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
`

const Column = styled(Box).attrs({ m: 6, mr: 9 })``

const ColumnHeader = styled(Text).attrs({ f: 3, color: 'gray.light' })``
const ColumnContents = styled(Text).attrs({ f: 3, color: 'gray.light', mt: 4 })`
  ul {
    margin-left: 0;
    padding-left: ${({ theme }) => theme.space[7]};
  }
  li {
    margin-left: 0;
    padding-left: 0;
  }
`

const A = styled(Link)`
  display: block;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.gray.light} !important;
`

const HR = styled(HorizontalRule).attrs({ color: 'gray.semiLight', mb: 10 })`
  height: 1px;
  width: 100%;
`

interface LoggedOutFooterProps {
  isHomepage?: boolean
}

export const LoggedOutFooter: React.FC<LoggedOutFooterProps> = ({
  isHomepage,
}) => {
  const { slug, id } = useSerializedMe()

  return (
    <Container>
      {isHomepage && (
        <Box display="flex" flexDirection="column" flex={1} mr={6}>
          <TopSection>
            <Icons name="ArenaMark" mb={6} size="1.5em" color="gray.light" />
            <Text mb={6}>
              <A href="/about">About &amp; Features</A>
              <A
                href={`/about/${encodeURIComponent('Pricing &amp; Features')}`}
              >
                Pricing &amp; Education Plans
              </A>
              <A href={`/about/Roadmap`}>Roadmap</A>
              <A href={`/about/Editorial`}>Editorial &amp; Events</A>
              <A href={`/about/Team`}>Team</A>
              <A href={`/about/${encodeURIComponent('Contact &amp; Support')}`}>
                Help
              </A>
            </Text>
            <Text mb={6}>
              <A href={ITUNES_LINK}>Download iOS App</A>
              <A href={ANDROID_LINK}>Download Android App</A>
            </Text>
          </TopSection>
          <HR />
        </Box>
      )}
      <MapSection>
        <Column>
          <ColumnHeader>About Are.na</ColumnHeader>
          <ColumnContents>
            <ul>
              <li>
                <A href="">How it works</A>
              </li>
              <li>
                <A href="">Pricing</A>
              </li>
              <li>
                <A href="">Education</A>
              </li>
              <li>
                <A href="">Team</A>
              </li>
              <li>
                <A href="">Business model</A>
              </li>
              <li>
                <A href="">Roadmap</A>
              </li>
              <li>
                <A href="">Changelog</A>
              </li>
            </ul>
          </ColumnContents>
        </Column>
        <Column>
          <ColumnHeader>Extended Are.na</ColumnHeader>
          <ColumnContents>
            <ul>
              <li>
                <A href={ITUNES_LINK}>iOS App</A>
              </li>
              <li>
                <A href={ANDROID_LINK}>Android App</A>
              </li>
              <li>
                <A href="">Browser extensions</A>
              </li>
              <li>
                <A href="">API</A>
              </li>
              <li>
                <A href="">Experiments</A>
              </li>
              <li>
                <A href="">Community tools</A>
              </li>
            </ul>
          </ColumnContents>
        </Column>
        <Column>
          <ColumnHeader>Essays &amp; Events</ColumnHeader>
          <ColumnContents>
            <ul>
              <li>
                <A href="/blog">Blog</A>
              </li>
              <li>
                <A href="">Channel walkthroughs</A>
              </li>
              <li>
                <A href="">Annual books</A>
              </li>
            </ul>
          </ColumnContents>
        </Column>
        <Column>
          <ColumnHeader>Info</ColumnHeader>
          <ColumnContents>
            <ul>
              <li>
                <A href="">Contact &amp; Help</A>
              </li>
              <li>
                <A href="/community-guidelines">Community Guidelines</A>
              </li>
              <li>
                <A href="/terms">Terms</A>
              </li>
              <li>
                <A href="/privacy">Privacy</A>
              </li>
              <li>
                <A href="https://www.are.na/are-na-team/are-na-press">Press</A>
              </li>
              <li>
                <A href="https://store.are.na">Store</A>
              </li>
            </ul>
          </ColumnContents>
        </Column>
        {id && (
          <Column>
            <ColumnHeader>Your Are.na</ColumnHeader>
            <ColumnContents>
              <ul>
                <li>
                  <A href={`/${slug}`}>Profile</A>
                </li>
                <li>
                  <A href="">Feed</A>
                </li>
                <li>
                  <A href="">Settings</A>
                </li>
                <li>
                  <A href="">Billing</A>
                </li>
                <li>
                  <A href="">Tools</A>
                </li>
              </ul>
            </ColumnContents>
          </Column>
        )}
      </MapSection>
    </Container>
  )
}
