import styled from 'styled-components';

import Styles from 'react/styles';

export const optionLinkHorizontalPadding = '0.5em';
export const optionLinkVerticalPadding = '0.33em';
export const optionLinkPadding = `${optionLinkVerticalPadding} ${optionLinkHorizontalPadding}`;

export default styled.a`
  display: block;
  padding: ${optionLinkPadding};
  font-size: ${x => Styles.Type.size[x.size || 'base']};
  font-weight: bold;
`;
