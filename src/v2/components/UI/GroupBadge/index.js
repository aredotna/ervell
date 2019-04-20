import React from 'react';
import PropTypes from 'prop-types';

import Badge from 'v2/components/UI/Badge';

const GroupBadge = ({ visibility, color, ...rest }) => (
  <Badge
    f={0}
    ml={4}
    color={color}
    borderColor={color}
    icon={{ private: 'Lock' }[visibility]}
    {...rest}
  >
    Group
  </Badge>
);

GroupBadge.propTypes = {
  visibility: PropTypes.oneOf(['public', 'private']).isRequired,
  color: PropTypes.string,
};

GroupBadge.defaultProps = {
  color: 'gray.medium',
};

export default GroupBadge;
