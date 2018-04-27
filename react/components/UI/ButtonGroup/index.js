import styled from 'styled-components';

import { buttonBorderWidth, buttonBorderRadius } from 'react/components/UI/GenericButton';

export default styled.div`
  > span,
  > div,
  > button,
  > a {
    &:hover {
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
