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
import Icons from '../Icons'

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
  ${zIndex}

  &:hover {
    svg path {
      fill: ${props => props.theme.colors.gray.bold};
    }
  }
`

// const Glyph = styled.span`
//   position: relative;
//   display: block;
//   box-sizing: border-box;
//   width: ${props => props.theme.space[props.size] || props.size};
//   height: ${props => props.theme.space[props.size] || props.size};

//   &:before,
//   &:after {
//     position: absolute;
//     display: block;
//     content: '';
//     width: 50%;
//     height: ${props => props.thickness};
//     top: 50%;
//     left: 50%;
//     background-color: ${props =>
//       themeGet(
//         `colors.${props.color}`,
//         props.theme.colors.gray.semiBold
//       )(props)};
//   }

//   &:before {
//     transform: translate(-50%, -50%) rotate(45deg);
//   }

//   &:after {
//     transform: translate(-50%, -50%) rotate(135deg);
//   }
// `

const Close = ({ size, color, thickness, ...rest }) => (
  <Container {...rest}>
    <Icons name="Close" size={size} color={color} />
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
  size: '1em',
}

export default Close
