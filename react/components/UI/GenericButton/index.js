import styled, { css } from 'styled-components';

import styles from 'react/styles';

import get from 'react/util/get';

export const buttonBorderWidth = '1px';
export const buttonVerticalPadding = '0.75em';
export const buttonHorizontalPadding = '1.25em';
export const buttonPadding = `${buttonVerticalPadding} ${buttonHorizontalPadding}`;
export const buttonBorderRadius = '0.25em';

const activeMixin = css`
  border: ${buttonBorderWidth} solid ${styles.Colors.gray.bold};
  color: ${styles.Colors.gray.bold};
`;

export const mixin = css`
  all: initial;
  display: inline-block;
  padding: ${buttonPadding};
  font-weight: bold;
  border: ${buttonBorderWidth} solid ${styles.Colors.gray.regular};
  border-radius: ${buttonBorderRadius};
  font-size: ${x => styles.Type.size[x.size || 'base']};
  font-family: ${styles.Type.font.sans};
  line-height: 1;
  user-select: none;
  color: ${styles.Colors.gray.bold};
  cursor: pointer;
  text-align: center;

  ${x => x.minWidth && `
    min-width: ${x.minWidth};
  `}

  ${({ color }) => {
    if (color) {
      const value = get(styles.Colors, color);

      return `
        color: ${value};
        border-color: ${value};
      `;
    }

    return '';
  }}

  ${styles.Type.mixins.antialiased}

  &:hover {
    border: ${buttonBorderWidth} solid ${styles.Colors.gray.medium};
    color: ${styles.Colors.gray.bold};
  }

  ${x => x.active && activeMixin}
  &:active { ${activeMixin} }

  ${x => x.disabled && `
    pointer-events: none;
    opacity: 0.5;
    `}
  `;

export const GenericButtonLink = styled.a`
  ${mixin}
  `;

const GenericButton = styled.a`
  ${mixin}
  `;

export default GenericButton;
