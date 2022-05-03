import React from 'react'
import PropTypes from 'prop-types'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'

const Header = ({ children: title, action = null, ...rest }) => (
  <Box
    mt={6}
    mb={3}
    pb={3}
    borderBottom="1px solid"
    borderColor="gray.light"
    display="flex"
    justifyContent="space-between"
    alignItems="flex-start"
    {...rest}
  >
    <Text f={2} color="gray.medium">
      {title}
    </Text>
    {action && (
      <Text f={2} color="gray.medium" fontWeight="bold">
        {action}
      </Text>
    )}
  </Box>
)

Header.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Header
