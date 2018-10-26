import React from 'react';
import PropTypes from 'prop-types';

const DEFAULT_LENGTH = 50;
const DEFAULT_SUFFIX = '…';

export const truncate = (text, length = DEFAULT_LENGTH, suffix = DEFAULT_SUFFIX) =>
  text && text.substr(0, length - 1) + (text.length > length ? suffix : '');

const Truncate = ({
  children, length, suffix, ...rest
}) => (
  <span {...rest}>
    {truncate(children, length, suffix)}
  </span>
);

Truncate.propTypes = {
  children: PropTypes.node.isRequired,
  length: PropTypes.number,
  suffix: PropTypes.string,
};

Truncate.defaultProps = {
  length: DEFAULT_LENGTH,
  suffix: DEFAULT_SUFFIX,
};

export default Truncate;
