import React from 'react'
import styled from 'styled-components'

import constants from 'v2/styles/constants'

const A = styled.a`
  display: block;
`

const Outer = styled.div`
  margin: 0 0 2em 0;
`

export const CrumbContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
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
  align-items: flex-start;
  justify-content: center;
  font-weight: bold;

  color: ${x => x.theme.colors.gray.medium};

  a {
    text-decoration: none;
    color: inherit;

    &:hover {
      color: ${x => x.theme.colors.gray.bold};
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

const RelativeCrumb = styled.div`
  position: relative;
`

const InvisibleCrumb = styled.div`
  visibility: hidden;
`

const AbsoluteCrumb = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

export const FirstCrumb: React.FC = ({ children }) => {
  return (
    <Crumb>
      <RelativeCrumb>
        <InvisibleCrumb>Are.na</InvisibleCrumb>
        <AbsoluteCrumb>{children}</AbsoluteCrumb>
      </RelativeCrumb>
    </Crumb>
  )
}

interface BreadCrumbProps {
  children: React.ReactNode
  secondary?: React.ReactNode
}

export const BreadcrumbPath: React.FC<BreadCrumbProps> = ({
  children,
  secondary,
  ...rest
}) => {
  return (
    <Outer>
      <CrumbContainer {...rest}>
        <Crumb>
          <A href="/">Are.na</A>
        </Crumb>

        {children}
      </CrumbContainer>
      {secondary}
      {/* <CrumbContainer>
        <FirstCrumb>
          +
        </FirstCrumb>
        <Crumb>
          <A href="/">Denis</A>
        </Crumb>
      </CrumbContainer> */}
    </Outer>
  )
}
