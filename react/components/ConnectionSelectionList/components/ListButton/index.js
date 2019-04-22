import styled from 'styled-components';

import { inputPadding } from 'react/components/UI/Inputs';
import { baseMixin as baseTextMixin } from 'react/components/UI/Text';

export default styled.div.attrs({
  role: 'button',
  tabIndex: 0,
  f: 1,
})`
  ${baseTextMixin}
  position: relative;
  display: block;
  margin-top: -1px;
  padding: ${inputPadding}; // TODO
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
      border: 1px solid ${x.theme.colors.gray.semiBold};
    }
  `}
`;
