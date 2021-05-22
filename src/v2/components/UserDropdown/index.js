import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { Query } from '@apollo/client/react/components'

import userDropdownQuery from 'v2/components/UserDropdown/queries/userDropdown'

import BorderedBox from 'v2/components/UI/BorderedBox'
import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import Link from 'v2/components/UserDropdown/components/Link'
import Label from 'v2/components/UserDropdown/components/Label'
import SecondaryLinks from 'v2/components/UserDropdown/components/SecondaryLinks'
import MyGroupLinks from 'v2/components/UserDropdown/components/MyGroupLinks'
import LoadingIndicator from 'v2/components/UI/LoadingIndicator'
import SignOutLink from 'v2/components/UserDropdown/components/SecondaryLinks/components/SignOutLink'

const Container = styled(BorderedBox).attrs({
  width: '20em',
})`
  height: 100%;
`

const Inner = styled(Box)`
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`

const Section = styled(Box).attrs({
  py: 4,
  borderBottom: '1px solid',
  borderColor: 'gray.semiLight',
})`
  &:last-child {
    border-bottom: 0;
  }
`

export default class UserDropdown extends PureComponent {
  render() {
    return (
      <Query query={userDropdownQuery}>
        {({ loading, error, data }) => {
          if (loading) {
            return (
              <Container>
                <LoadingIndicator p={6} />
              </Container>
            )
          }

          if (error) {
            return (
              <Container>
                <Inner>
                  <Section>
                    <Text color="state.alert" f={2} p={6}>
                      {error.message}
                    </Text>
                  </Section>

                  <Section>
                    <SignOutLink />
                  </Section>
                </Inner>
              </Container>
            )
          }

          const { me } = data
          const dateDifference = new Date() - new Date(me.created_at)
          const differenceInDays = Math.ceil(
            dateDifference / 1000 / 60 / 60 / 24
          )
          const hasRecentlyJoined = differenceInDays < 7

          return (
            <Container>
              <Inner>
                <Section>
                  <Link py={3} href={me.href}>
                    {me.name}

                    <Label>Profile</Label>
                  </Link>
                </Section>

                {me.is_confirmed && (
                  <Section>
                    <MyGroupLinks me={me} />
                  </Section>
                )}

                <Section>
                  <Link pt={3} pb={4} href="/feed">
                    Feed
                  </Link>

                  <Link pt={4} pb={3} href="/explore">
                    Explore
                  </Link>
                </Section>

                <Section>
                  <SecondaryLinks
                    isPremium={me.is_premium}
                    hasRecentlyJoined={hasRecentlyJoined}
                  />
                </Section>
              </Inner>
            </Container>
          )
        }}
      </Query>
    )
  }
}
