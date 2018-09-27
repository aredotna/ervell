import styled, { css } from 'styled-components';

import { mixin as buttonMixin } from 'react/components/UI/GenericButton';

export const activeMixin = css`
  border: none;
  color: ${x => x.theme.colors.gray.bold};
  background-color: white;
`;

export const hoverMixin = css`
  border: none;
  color: black;
  background-color: white;
`;

const mixin = css`
  ${buttonMixin}
  border: none;
  color: ${x => x.theme.colors.gray.base};
  background-color: ${x => x.theme.colors.utility.translucent};

  ${x => x.hover && hoverMixin}
  &:hover { ${hoverMixin} }

  ${x => x.active && activeMixin}
  &:active { ${activeMixin} }
`;

export const FilledButton = styled.button`
  ${mixin}
`;

export const FilledButtonLink = styled.a`
  ${mixin}
`;

export default FilledButton;
