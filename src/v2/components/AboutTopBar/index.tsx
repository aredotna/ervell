import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'

import FixedWrapper from 'v2/components/UI/FixedWrapper'
import Box from 'v2/components/UI/Box'
import Link from 'v2/components/UI/Link'

import AboutHomeLink from 'v2/components/AboutTopBar/components/AboutHomeLink'
import useLoginStatus from 'v2/hooks/useLoginStatus'

import constants from 'v2/styles/constants'

const Container = styled(Box)`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;
  background-color: ${props => props.theme.colors.background};
  flex-grow: 1;
  flex-shrink: 1;
  padding: 1em;
`

const Home = styled(AboutHomeLink)`
  ${constants.media.mobile`
    display: none;
  `}
`

const Toggle = styled.div<{ active: boolean }>`
  display: none;

  position: relative;
  cursor: pointer;
  width: 1.5em;
  height: 1.5em;

  // Patties
  > span {
    width: 1.5em;
    height: 2px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  > span,
  > span:before,
  > span:after {
    display: block;
    position: absolute;
    background-color: ${({ theme, active }) =>
      active ? theme.colors.gray.regular : theme.colors.gray.base};
  }

  > span:before,
  > span:after {
    content: '';
    width: 100%;
    height: 100%;
  }

  > span:before {
    top: 300%;
  }

  > span:after {
    bottom: 300%;
  }

  ${constants.media.mobile`
    display: block;
  `}
`

const MobileMenu = styled(Box)`
  position: sticky;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  padding: ${({ theme }) => `${theme.space[2]} 0 ${theme.space[8]} 0`};
  background-color: ${props => props.theme.colors.background};
  transform: translateZ(0);

  > a {
    padding: ${({ theme }) => `${theme.space[2]} ${theme.space[6]}`};
  }

  > a:hover {
    color: ${({ theme }) => theme.colors.gray.bold};
  }
`

const Links = styled(Box)`
  display: flex;
  flex-direction: row;

  ${constants.media.mobile`
    display: none;
  `}
`

const A = styled(Link)`
  display: block;
  font-weight: bold;
  padding: 0 ${({ theme }) => theme.space[6]};
  color: ${({ theme }) => theme.colors.gray.base};
`

const MobileLogInOut = styled(A)`
  display: none;
  ${constants.media.mobile`
    display: block;
  `}
`

export const AboutTopBar: React.FC = () => {
  const { isLoggedIn } = useLoginStatus()
  const [menuActive, setMenuActive] = useState<boolean>(false)

  const signOut = useCallback(() => {
    axios({ method: 'POST', url: '/me/sign_out' }).then(() =>
      window.location.reload()
    )
  }, [])

  return (
    <FixedWrapper key="AboutTopBar" top>
      <Container>
        <Home />

        <Toggle onClick={() => setMenuActive(!menuActive)} active={menuActive}>
          <span />
        </Toggle>

        <Links>
          <A href="/pricing">Pricing</A>
          <A href="/examples">Examples</A>
          <A href="/blog">Blog</A>
          {isLoggedIn ? (
            <A href="#" onClick={signOut}>
              Log out
            </A>
          ) : (
            <A href="/log_in">Log in</A>
          )}
        </Links>

        {isLoggedIn ? (
          <MobileLogInOut href="#" onClick={signOut}>
            Log out
          </MobileLogInOut>
        ) : (
          <MobileLogInOut href="/log_in">Log in</MobileLogInOut>
        )}
      </Container>
      {menuActive && (
        <MobileMenu>
          <A href="/">Home</A>
          <A href="/about">About</A>
          <A href="/pricing">Pricing</A>
          <A href="/examples">Examples</A>
          <A href="/blog">Blog</A>
          <A href="http://help.are.na/help_center">Help / FAQs</A>
        </MobileMenu>
      )}
    </FixedWrapper>
  )
}
