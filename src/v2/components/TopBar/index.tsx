import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import PrimarySearch from 'v2/components/TopBar/components/PrimarySearch'
import AuthenticationLinks from 'v2/components/TopBar/components/AuthenticationLinks'
import NewChannelButton from 'v2/components/TopBar/components/NewChannelButton'
import NotificationCount from 'v2/components/TopBar/components/NotificationCount'
import MyRepresentation from 'v2/components/TopBar/components/MyRepresentation'

import { GlobalNavElements_me as Me } from '__generated__/GlobalNavElements'
import useSerializedMe from 'v2/hooks/useSerializedMe'
import IS_CONFIRMED_QUERY from './queries/isConfirmed'
import { IsConfirmed } from '__generated__/IsConfirmed'
import useIsAdmin from 'v2/hooks/useIsAdmin'
import AdvancedPrimarySearchContainer from './components/AdvancedPrimarySearch'

const Container = styled(Box)`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
  background-color: ${props => props.theme.colors.background};

  ${props =>
    props.scheme === 'GROUP' &&
    `
    background-color: ${props.theme.colors.gray.hint};

    &:after {
      position: absolute;
      display: block;
      content: '';
      pointer-events: none;
      width: 100%;
      height: 0.8125em;
      right: 0;
      bottom: 0;
      left: 0;
      background: linear-gradient(to bottom,
        ${props.theme.colors.utility.transparent} 0%,
        rgba(0, 0, 0, 0.02) 100%);
    }
  `}
`

const DotContainer = styled(Box)`
  position: absolute;
  bottom: -${({ theme }) => theme.space[6]};
  width: 100%;
  text-align: center;
`

const Dot = styled(Box)`
  &:before {
    content: '•';
    color: ${({ theme }) => theme.colors.brand.deepBlue};
    font-size: ${({ theme }) => theme.fontSizesIndexed.h2};
    line-height: 0.5;
  }
`
interface TopBarProps {
  scheme: 'DEFAULT' | 'GROUP'
  me?: Me
}

export const TopBar: React.FC<TopBarProps> = ({ scheme, me, ...rest }) => {
  const serializedMe = useSerializedMe()
  const { data } = useQuery<IsConfirmed>(IS_CONFIRMED_QUERY, { ssr: false })
  const [userMode, setUserMode] = useState<'resting' | 'open'>('resting')
  const isAdmin = useIsAdmin()
  const isSupporter = useSerializedMe()?.is_supporter
  const showNewSearch = isAdmin || isSupporter

  const needsDot = data && !data.me?.is_confirmed

  return (
    <Container scheme={scheme} {...rest}>
      {showNewSearch ? (
        <AdvancedPrimarySearchContainer flex={1} scheme={scheme} />
      ) : (
        <PrimarySearch flex={1} scheme={scheme} />
      )}

      {me && me.id ? (
        <React.Fragment>
          <NewChannelButton px={5} />

          {serializedMe && !serializedMe.hide_notification_count && (
            <NotificationCount
              px={5}
              count={me.counts && me.counts.notifications}
            />
          )}

          <Box display="flex" position="relative">
            <MyRepresentation
              px={5}
              me={serializedMe}
              onOpen={() => setUserMode('open')}
              onClose={() => setUserMode('resting')}
            />
            {needsDot && userMode == 'resting' && (
              <DotContainer>
                <Dot />
              </DotContainer>
            )}
          </Box>
        </React.Fragment>
      ) : (
        <AuthenticationLinks px={6} />
      )}
    </Container>
  )
}
