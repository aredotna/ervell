import React from 'react';
import PropTypes from 'prop-types';

import Text from 'react/components/UI/Text';

const FeedObjectLink = ({
  __typename, label, item_phrase, href, visibility, ...rest
}) => (
  <Text
    display="inline"
    f={6}
    fontWeight="bold"
    color={__typename === 'Channel' ? `channel.${visibility}` : 'gray.base'}
    {...rest}
  >
    <a href={href}>
      {item_phrase || label}
    </a>
  </Text>
);

FeedObjectLink.propTypes = {
  __typename: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  visibility: PropTypes.string,
  item_phrase: PropTypes.string,
  body: PropTypes.string,
};

FeedObjectLink.defaultProps = {
  visibility: null,
  body: null,
  item_phrase: '',
};

export default FeedObjectLink;
