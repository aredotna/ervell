import React from 'react';
import PropTypes from 'prop-types';

import Text from 'react/components/UI/Text';

const FeedObjectLink = ({
  __typename, label, href, visibility, ...rest
}) => (
  <Text
    display="inline"
    f={5}
    fontWeight="bold"
    color={__typename === 'Channel' ? `channel.${visibility}` : 'gray.base'}
    {...rest}
  >
    <a href={href}>
      {label}
    </a>
  </Text>
);

FeedObjectLink.propTypes = {
  __typename: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  visibility: PropTypes.string,
  body: PropTypes.string,
};

FeedObjectLink.defaultProps = {
  visibility: null,
  body: null,
};

export default FeedObjectLink;
