import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  themeGet,
  display,
  top,
  right,
  bottom,
  left,
  position,
  space,
  bgColor,
  alignSelf,
  zIndex,
} from 'styled-system'

import { preset } from 'v2/styles/functions'

const Container = styled.a`
  cursor: pointer;
  ${preset(display, { display: 'block' })}
  ${position}
  ${alignSelf}
  ${space}
  ${top}
  ${right}
  ${bottom}
  ${left}
  ${bgColor}
  ${zIndex}
  ${props => props.transform && `transform: ${props.transform};`}

  &:hover > span {
    &:after,
    &:before {
      background-color: ${props => props.theme.colors.bold};
    }
  }
`

const Glyph = styled.span`
  position: relative;
  display: block;
  box-sizing: border-box;
  width: ${props => props.theme.space[props.size] || props.size};
  height: ${props => props.theme.space[props.size] || props.size};

  &:before,
  &:after {
    position: absolute;
    display: block;
    content: '';
    width: 50%;
    height: ${props => props.thickness};
    top: 50%;
    left: 50%;
    background-color: ${props =>
      themeGet(
        `colors.${props.color}`,
        props.theme.colors.gray.semiBold
      )(props)};
  }

  &:before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &:after {
    transform: translate(-50%, -50%) rotate(135deg);
  }
`

const Close = ({ size, color, thickness, ...rest }) => (
  <Container {...rest}>
    <Glyph size={size} color={color} thickness={thickness} />
  </Container>
)

Close.propTypes = {
  color: PropTypes.string,
  thickness: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

Close.defaultProps = {
  color: 'gray.semiBold',
  thickness: '1px',
  size: 6,
}

export default Close
