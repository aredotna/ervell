import React from 'react'
import PropTypes from 'prop-types'

import provideChildrenWithProps from 'v2/util/provideChildrenWithProps'

import Option from 'v2/components/UI/Pulldown/components/Option'

const PulldownOption = ({ children, ...rest }) => (
  <Option role="button" tabIndex={0} {...rest}>
    {provideChildrenWithProps(children, { purpose: 'option', ...rest })}
  </Option>
)

PulldownOption.propTypes = {
  children: PropTypes.node.isRequired,
}

export default PulldownOption
