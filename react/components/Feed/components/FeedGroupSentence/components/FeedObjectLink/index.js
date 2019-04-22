import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Text from 'react/components/UI/Text';

const Link = styled.a``;
const Span = styled.span``;

const Word = styled(Text)`
  &:hover {
    color: ${x => x.theme.colors.gray.bold}
  }
`;

const FeedObjectLink = ({
  __typename, label, href, visibility, ...rest
}) => {
  const Tag = href ? Link : Span;
  const fontWeight = href ? 'bold' : 'normal';

  return (
    <Word
      display="inline"
      f={6}
      fontWeight={fontWeight}
      color={__typename === 'Channel' ? `channel.${visibility}` : 'gray.base'}
      {...rest}
    >
      <Tag
        href={href}
        dangerouslySetInnerHTML={{ __html: label }}
      />
    </Word>
  );
};

FeedObjectLink.propTypes = {
  __typename: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  visibility: PropTypes.string,
};

FeedObjectLink.defaultProps = {
  visibility: null,
};

export default FeedObjectLink;
