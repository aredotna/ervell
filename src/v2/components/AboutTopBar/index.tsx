import React, { useCallback } from 'react'
import styled from 'styled-components'
import axios from 'axios'

import FixedWrapper from 'v2/components/UI/FixedWrapper'
import Box from 'v2/components/UI/Box'
import Link from 'v2/components/UI/Link'

import AboutHomeLink from 'v2/components/AboutTopBar/components/AboutHomeLink'
import useLoginStatus from 'v2/hooks/useLoginStatus'

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

const Links = styled(Box)`
  display: flex;
  flex-direction: row;
`

const A = styled(Link)`
  display: block;
  font-weight: bold;
  padding: 0 ${({ theme }) => theme.space[6]};
  color: ${({ theme }) => theme.colors.gray.base};
`

export const AboutTopBar: React.FC = () => {
  const { isLoggedIn } = useLoginStatus()

  const signOut = useCallback(() => {
    axios({ method: 'POST', url: '/me/sign_out' }).then(() =>
      window.location.reload()
    )
  }, [])

  return (
    <FixedWrapper key="AboutTopBar" top>
      <Container>
        <AboutHomeLink />

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
      </Container>
    </FixedWrapper>
  )
}
