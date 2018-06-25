import styled, { css } from 'styled-components';

import get from 'react/util/get';

import styles from 'react/styles';

export const mixin = css`
  all: initial;
  display: block;

  color: ${x => `${get(styles.Colors, x.color || 'gray.base')}`};
  font-size: ${x => styles.Type.size[x.size || 'base']};
  font-family: ${x => styles.Type.font[x.font || 'sans']};
  line-height: ${x => styles.Type.lineHeight[x.lineHeight || 'base']};

  ${styles.Mixins.antialiased}

  margin: 1rem 0;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export default styled.div`
  ${mixin}
`;
