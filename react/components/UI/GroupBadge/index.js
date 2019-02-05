import React from 'react';
import PropTypes from 'prop-types';

import Badge from 'react/components/UI/Badge';

const GroupBadge = ({ visibility, ...rest }) => (
  <Badge
    f={0}
    ml={4}
    color="gray.medium"
    borderColor="gray.medium"
    icon={{ private: 'Lock' }[visibility]}
    {...rest}
  >
    Group
  </Badge>
);

GroupBadge.propTypes = {
  visibility: PropTypes.oneOf(['public', 'private']).isRequired,
};

export default GroupBadge;
