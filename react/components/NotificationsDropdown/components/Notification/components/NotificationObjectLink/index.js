import React from 'react';
import PropTypes from 'prop-types';

import Text from 'react/components/UI/Text';
import Truncate from 'react/components/UI/Truncate';

const NotificationObjectLink = ({
  __typename, label, href, visibility, is_me, ...rest
}) => {
  if (is_me) {
    return (
      <Text display="inline" f={1}>
        you
      </Text>
    );
  }

  return (
    <Text
      display="inline"
      f={1}
      fontWeight="bold"
      color={__typename === 'Channel' ? `channel.${visibility}` : 'gray.base'}
      {...rest}
    >
      <a href={href}>
        <Truncate length={40}>
          {label}
        </Truncate>
      </a>
    </Text>
  );
};

NotificationObjectLink.propTypes = {
  __typename: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  visibility: PropTypes.string,
  body: PropTypes.string,
  is_me: PropTypes.bool,
};

NotificationObjectLink.defaultProps = {
  visibility: null,
  body: null,
  is_me: false,
};

export default NotificationObjectLink;
