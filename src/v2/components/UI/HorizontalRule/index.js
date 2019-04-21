import styled from 'styled-components';
import { themeGet, space, height } from 'styled-system';

import { preset } from 'v2/styles/functions';

export default styled.hr`
  ${preset(space, { my: 6 })}
  ${preset(height, { height: '1px' })}
  border: none;
  background-color: ${props => {
    if (props.invisible) return 'transparent';
    return themeGet(`colors.${props.color}`, props.theme.colors.gray.regular)(
      props
    );
  }};
`;
