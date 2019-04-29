import React from 'react'
import PropTypes from 'prop-types'

import Box from 'v2/components/UI/Box'

const ModalFullscreenDialog = ({ children, ...rest }) => (
  <Box width="100%" height="100%" overflowScrolling {...rest}>
    {children}
  </Box>
)

ModalFullscreenDialog.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ModalFullscreenDialog
