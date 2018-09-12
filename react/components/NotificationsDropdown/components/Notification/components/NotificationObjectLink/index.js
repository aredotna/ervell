import React from 'react';
import PropTypes from 'prop-types';

import Text from 'react/components/UI/Text';

const NotificationObjectLink = ({
  __typename, label, href, visibility, ...rest
}) => (
  <Text
    display="inline"
    f={1}
    fontWeight="bold"
    color={__typename === 'Channel' ? `channel.${visibility}` : 'gray.base'}
    {...rest}
  >
    <a href={href}>
      {label}
    </a>
  </Text>
);

NotificationObjectLink.propTypes = {
  __typename: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  visibility: PropTypes.string,
  body: PropTypes.string,
};

NotificationObjectLink.defaultProps = {
  visibility: null,
  body: null,
};

export default NotificationObjectLink;
