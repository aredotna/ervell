import { css } from 'styled-components';

import Colors from 'react/styles/Colors';

const outlineBorder = (size = '5px', color = Colors.gray.light, radius = '0.25em') =>
  css`
    display: block;
    content: '';
    position: absolute;
    pointer-events: none;
    top: -${size};
    right: -${size};
    bottom: -${size};
    left: -${size};
    border: ${size} solid ${color};
    border-radius: ${radius};
  `;

export default {
  outlineBorder,
};
