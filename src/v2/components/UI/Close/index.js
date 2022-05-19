import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  display,
  top,
  right,
  bottom,
  left,
  position,
  space,
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
