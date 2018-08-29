import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import provideChildrenWithProps from 'react/util/provideChildrenWithProps';

import Option from 'react/components/UI/Pulldown/components/Option';

const Value = styled(Option)`
  &:hover {
    background-color: inherit;
  }

  // Downward-facing Caret
  &:after {
    display: block;
    content: '';
    position: absolute;
    top: 50%;
    right: 1em;
    width: 0;
    height: 0;
    transform: translateY(-50%);
    border-top: 0.66em solid ${x => x.theme.colors.gray.semiBold};
    border-right: 0.33em solid transparent;
    border-left: 0.33em solid transparent;
    pointer-events: none;
  }

  ${x => x.mode === 'expanded' && `
    // Upward-facing Caret
    &:after {
      border-top: 0;
      border-bottom: 0.66em solid ${x.theme.colors.gray.semiBold};
    }
  `}
`;

const PulldownValue = ({ children, ...rest }) => (
  <Value role="button" tabIndex={0} {...rest}>
    {provideChildrenWithProps(children, { purpose: 'value', ...rest })}
  </Value>
);

PulldownValue.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PulldownValue;
