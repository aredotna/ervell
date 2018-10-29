import React from 'react';
import PropTypes from 'prop-types';

import ProfileEmptyMessage from 'react/components/ProfileEmptyMessage';

const EmptyMessageOrComponent = ({ count, children, ...rest }) => {
  if (count === 0) {
    return <ProfileEmptyMessage {...rest} />;
  }

  return children;
};

EmptyMessageOrComponent.propTypes = {
  count: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

export default EmptyMessageOrComponent;
