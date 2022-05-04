import React from 'react'
import styled from 'styled-components'

import provideChildrenWithProps from 'v2/util/provideChildrenWithProps'

import {
  buttonBorderWidth,
  BUTTON_BORDER_RADIUS,
} from 'v2/components/UI/GenericButton'

const VerticalButtonGroupContainer = styled.div`
  display: flex;
  flex-direction: column;

  ${props =>
    props.stretch &&
    `
    > span,
    > div,
    > button,
    > a {
      flex: 1;
      text-align: center;
    }
  `}

  > span,
  > div,
  > button,
  > a {
    position: relative;

    &:hover,
    &:active {
      z-index: 1;
    }

    &:first-child {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }

    &:not(:first-child):not(:last-child) {
      border-radius: 0;
      margin-top: -${buttonBorderWidth};
    }

    &:last-child:not(:first-child) {
      margin-top: -${buttonBorderWidth};
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }

    &:first-child:last-child {
      border-radius: ${BUTTON_BORDER_RADIUS};
    }
  }
`

interface VerticalButtonGroupProps {
  stretch?: boolean
}

export const VerticalButtonGroup: React.FC<VerticalButtonGroupProps> = ({
  children,
  stretch = false,
  ...rest
}) => (
  <VerticalButtonGroupContainer stretch={stretch} {...rest}>
    {provideChildrenWithProps(children, rest)}
  </VerticalButtonGroupContainer>
)

export default VerticalButtonGroup
