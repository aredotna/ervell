import React from 'react'
import styled from 'styled-components'

import BlankLayout from 'v2/components/UI/Layouts/BlankLayout'

const BlankTopBar = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: ${props => props.theme.constantValues.topBarHeight};
  background-color: ${props => props.theme.colors.background};
  z-index: 1;
`

export const BlankTopBarLayout = ({
  children,
  ...rest
}: {
  children: React.ReactNode
}) => {
  return (
    <BlankLayout {...rest}>
      <BlankTopBar />

      {children}
    </BlankLayout>
  )
}
