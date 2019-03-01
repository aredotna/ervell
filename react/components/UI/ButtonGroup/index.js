import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import provideChildrenWithProps from 'react/util/provideChildrenWithProps';

import { buttonBorderWidth, BUTTON_BORDER_RADIUS } from 'react/components/UI/GenericButton';

const ButtonGroupContainer = styled.div`
  display: flex;

  ${x => x.stretch && `
    > span,
    > div,
    > button,
    > a {
      flex: 1;
      text-align: center;
    }
  `}

  > span,
  > div,
  > button,
  > a {
    position: relative;

    &:hover,
    &:active {
      z-index: 1;
    }

    &:first-child {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    &:not(:first-child):not(:last-child) {
      border-radius: 0;
      margin-left: -${buttonBorderWidth};
    }

    &:last-child {
      margin-left: -${buttonBorderWidth};
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    &:first-child:last-child {
      border-radius: ${BUTTON_BORDER_RADIUS};
    }
  }
`;

const ButtonGroup = ({ children, stretch, ...rest }) => (
  <ButtonGroupContainer stretch={stretch} {...rest}>
    {provideChildrenWithProps(children, rest)}
  </ButtonGroupContainer>
);

ButtonGroup.propTypes = {
  children: PropTypes.node.isRequired,
  stretch: PropTypes.bool,
};

ButtonGroup.defaultProps = {
  stretch: false,
};

export default ButtonGroup;
