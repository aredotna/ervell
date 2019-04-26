import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import mixin from 'v2/components/UI/Inputs/mixin'

const SelectWrapper = styled.div`
  position: relative;

  &:after {
    display: inline-block;
    content '';
    width: 0;
    height: 0;
    position: absolute;
    top: 50%;
    right: 1em;
    transform: translate(0.25em, -50%);
    border-top: 0.5em solid ${x => x.theme.colors.gray.semiBold};
    border-right: 0.25em solid transparent;
    border-left: 0.25em solid transparent;
    pointer-events: none;
  }
`

const SelectTag = styled.select`
  ${mixin}
  padding-right: 1.5em;
`

const Select = ({ children, ...rest }) => (
  <SelectWrapper>
    <SelectTag {...rest}>{children}</SelectTag>
  </SelectWrapper>
)

Select.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Select
