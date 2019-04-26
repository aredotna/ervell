import React from 'react'
import PropTypes from 'prop-types'

import { lighten } from 'v2/styles/functions'

import Alert from 'v2/components/UI/Alert'

const LIGHT_PREMIUM_COLOR = lighten('state.premium', 0.1)

const PremiumAlert = ({ children, ...rest }) => (
  <Alert
    py={6}
    textAlign="center"
    bg={LIGHT_PREMIUM_COLOR}
    color="state.premium"
    borderColor="state.premium"
    isCloseable={false}
    {...rest}
  >
    {children}
  </Alert>
)

PremiumAlert.propTypes = {
  children: PropTypes.node.isRequired,
}

export default PremiumAlert
