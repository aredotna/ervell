import PropTypes from 'prop-types';
import styled from 'styled-components';

import { buttonBorderWidth, buttonBorderRadius } from 'react/components/UI/GenericButton';

const ButtonGroup = styled.div`
  ${x => x.stretch && `
    display: flex;

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
      border-radius: ${buttonBorderRadius};
    }
  }
`;

ButtonGroup.propTypes = {
  stretch: PropTypes.bool,
};

ButtonGroup.defaultProps = {
  stretch: false,
};

export default ButtonGroup;
