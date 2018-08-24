import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { fontSize, width, color, space } from 'styled-system';

import { preset } from 'react/styles/functions';

import provideChildrenWithProps from 'react/util/provideChildrenWithProps';

const Option = styled.div`
  box-sizing: border-box;
  outline: none;
  background-color: white;
  cursor: pointer;
  font-family: ${x => x.theme.fonts.sans};
  ${preset(width, { width: '100%' })}
  ${preset(color, { color: 'black' })}
  ${preset(fontSize, { f: 4 })}
  ${preset(space, { px: 5, py: 4 })}
  ${fontSize}

  ${x => x.mode === 'expanded' && `
    &:hover {
      background-color: ${x.theme.colors.gray.light};
    }
  `}
`;

const PulldownOption = ({ children, ...rest }) => (
  <Option role="button" tabIndex={0} {...rest}>
    {provideChildrenWithProps(children, rest)}
  </Option>
);

PulldownOption.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PulldownOption;
