import React from 'react';
import PropTypes from 'prop-types';

import Box from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';

const Header = ({ children: title, ...rest }) => (
  <Box mt={6} mb={3} pb={3} borderBottom="1px solid" borderColor="gray.light" {...rest}>
    <Text f={3} color="gray.medium">
      {title}
    </Text>
  </Box>
);

Header.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Header;
