import styled from 'styled-components';

import { inputPadding } from 'react/components/UI/GenericInput';

export default styled.a.attrs({
  role: 'button',
  tabIndex: 0,
})`
  position: relative;
  display: block;
  margin-top: -1px;
  padding: ${inputPadding};
  text-align: center;
  font-weight: normal !important;
  border: 1px solid ${x => x.theme.colors.gray.regular};
  background-color: ${x => x.theme.colors.gray.hint};
  line-height: 1;

  ${x => x.disabled && `
    &:hover {
      color: inherit;
      cursor: auto;
    }
  `}

  ${x => !x.disabled && `
    &:hover {
      z-index: 1;
      border: 1px solid ${x => x.theme.colors.gray.semiBold};
    }
  `}
`;
