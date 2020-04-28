import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import constants from 'v2/styles/constants'
import useLoginStatus from 'v2/hooks/useLoginStatus'

const A = styled.a``

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  margin: 0 0 2em 0;
  font-size: ${x => x.theme.fontSizesIndexed.h3};
  line-height: ${x => x.theme.lineHeightsIndexed.compact};
  font-family: ${x => x.theme.fonts.sans};

  ${constants.media.mobile`
    font-size: ${x => x.theme.fontSizesIndexed.h4};
    margin: 0 0 1em 0;
    margin-right: ${constants.blockGutter}; // TODO: Remove
    margin-left: ${constants.blockGutter}; // TODO: Remove
  `}
`

export const Crumb = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: ${x => x.theme.colors.gray.medium};

  a {
    text-decoration: none;
    color: inherit;

    &:hover {
      color: black;
    }
  }

  &:after {
    content: '/';
    margin: 0 0.33em;
    font-weight: normal;
  }

  &:last-child {
    color: ${x => x.theme.colors.gray.semiBold};

    // Hides trailing slash
    &:after {
      display: none;
    }
  }
`

export const BreadcrumbPath: React.FC = ({ children, ...rest }) => {
  const { isLoggedIn } = useLoginStatus()
  const Component = isLoggedIn ? Link : A
  const props = isLoggedIn ? { to: '/' } : { href: '/' }

  return (
    <Container {...rest}>
      <Crumb>
        <Component {...props}>Are.na</Component>
      </Crumb>

      {children}
    </Container>
  )
}
