import styled from 'styled-components';

import styles from 'react/styles';

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
  border: 1px solid ${styles.Colors.gray.regular};
  background-color: ${styles.Colors.gray.hint};
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
      border: 1px solid ${styles.Colors.gray.semiBold};
    }
  `}
`;
