import React from 'react';
import PropTypes from 'prop-types';

import Alert from 'react/components/UI/Alert';
import Box from 'react/components/UI/Box';

const ErrorAlert = ({ children, isReloadable, ...rest }) => (
  <Alert mb={6} bg="state.alert" color="white" isCloseable={false} {...rest}>
    <Box display="flex" justifyContent="space-between">
      {children}

      {isReloadable &&
        <Box ml={4}>
          <a onClick={() => window.location.reload()} role="button" tabIndex={0}>
            Reload
          </a>
        </Box>
      }
    </Box>
  </Alert>
);

ErrorAlert.propTypes = {
  children: PropTypes.node.isRequired,
  isReloadable: PropTypes.bool,
};

ErrorAlert.defaultProps = {
  isReloadable: true,
};

export default ErrorAlert;
