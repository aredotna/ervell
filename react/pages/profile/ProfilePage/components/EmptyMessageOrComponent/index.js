import React from 'react';
import PropTypes from 'prop-types';

import ProfileEmptyMessage from 'react/components/ProfileEmptyMessage';

const EmptyMessageOrComponent = ({ count, children }) => {
  if (count === 0) {
    return <ProfileEmptyMessage />;
  }

  return children;
};

EmptyMessageOrComponent.propTypes = {
  count: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

export default EmptyMessageOrComponent;
