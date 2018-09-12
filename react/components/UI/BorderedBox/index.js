import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { pick, omit } from 'underscore';

import compactObject from 'react/util/compactObject';

import Box from 'react/components/UI/Box';

const Inner = styled(Box)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: white;
  border: 1px solid ${x => x.theme.colors.gray.regular};
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  height: 100%;
`;

const SPACE_PADDING_PROPS_KEYS = ['p', 'pt', 'pr', 'pb', 'pl', 'px', 'py'];

const BorderedBox = ({
  children, ...rest
}) => {
  // Allow the innerbox to have configurable padding
  const innerProps = compactObject(pick(rest, ...SPACE_PADDING_PROPS_KEYS));

  // While the input can still have configurable margins
  const outerProps = omit(rest, ...SPACE_PADDING_PROPS_KEYS);

  return (
    <Box bg="gray.semiLight" p="5px" borderRadius="0.25em" {...outerProps}>
      <Inner {...innerProps}>
        {children}
      </Inner>
    </Box>
  );
};

BorderedBox.propTypes = {
  children: PropTypes.node.isRequired,
  ...SPACE_PADDING_PROPS_KEYS.reduce((memo, key) => (
    { ...memo, [key]: PropTypes.number }
  ), {}),
};

BorderedBox.defaultProps = {
  ...SPACE_PADDING_PROPS_KEYS.reduce((memo, key) => (
    { ...memo, [key]: null }
  ), {}),
};

export default BorderedBox;
